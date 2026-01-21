//
//  MessagesViewController.swift
//  MessagesExtension
//
//  Messages extension main view controller
//

import Messages
import SwiftUI

class MessagesViewController: MSMessagesAppViewController {
    
    private var messagesService: MessagesExtensionService!
    private var pendingShareMetadata: ShareLinkMetadata?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        messagesService = MessagesExtensionService.shared
        setupCompactView()
    }
    
    override func willBecomeActive(with conversation: MSConversation) {
        super.willBecomeActive(with: conversation)
        
        // Priority 1: Check for pending share link from main app
        if let pendingData = SharedDataService.shared.consumePendingShareLink() {
            handlePendingShareLink(url: pendingData.url, metadata: pendingData.metadata)
            return
        }
        
        // Priority 2: Check if there's a selected message from our extension
        if let selectedMessage = conversation.selectedMessage,
           let url = selectedMessage.url {
            handleSelectedMessage(url: url)
            return
        }
        
        // Priority 3: Auto-check clipboard when extension becomes active
        autoCheckClipboard()
    }
    
    private func handlePendingShareLink(url: String, metadata: ShareLinkMetadata?) {
        // Store metadata for compact view display
        self.pendingShareMetadata = metadata
        
        // If we have metadata, we can skip the API call and create preview directly
        if let metadata = metadata {
            let preview = SongPreview(
                id: UUID().uuidString,
                title: metadata.title ?? "Unknown Title",
                artist: metadata.artist ?? "Unknown Artist",
                thumbnailUrl: metadata.thumbnailUrl,
                originalUrl: url,
                availablePlatforms: [], // Will be populated if user wants to convert
                songLink: nil
            )
            
            messagesService.currentPreview = preview
            messagesService.pendingShareURL = url
            
            // Refresh compact view to show pending share UI
            DispatchQueue.main.async {
                self.setupCompactView()
            }
        } else {
            // No metadata, convert the URL to get info
            Task {
                await messagesService.convertURL(url)
                
                if messagesService.currentPreview != nil {
                    await MainActor.run {
                        self.requestPresentationStyle(.expanded)
                    }
                }
            }
        }
    }
    
    // MARK: - Message Selection Handling
    
    /// Called when user taps on a message created by this extension
    override func didSelect(_ message: MSMessage, conversation: MSConversation) {
        super.didSelect(message, conversation: conversation)
        
        if let url = message.url {
            handleSelectedMessage(url: url)
        }
    }
    
    private func handleSelectedMessage(url: URL) {
        // The URL could be a song.link URL or a platform-specific URL
        // Convert it and show options
        Task {
            await messagesService.convertURL(url.absoluteString)
            
            if messagesService.currentPreview != nil {
                await MainActor.run {
                    self.requestPresentationStyle(.expanded)
                }
            }
        }
    }
    
    private func autoCheckClipboard() {
        // Only auto-convert if we have valid clipboard content and no current preview
        guard messagesService.currentPreview == nil,
              messagesService.hasValidClipboardContent() else {
            return
        }
        
        Task {
            await messagesService.autoPasteAndConvert()
            
            if messagesService.currentPreview != nil {
                await MainActor.run {
                    self.requestPresentationStyle(.expanded)
                }
            }
        }
    }
    
    override func willResignActive(with conversation: MSConversation) {
        super.willResignActive(with: conversation)
    }
    
    override func didTransition(to presentationStyle: MSMessagesAppPresentationStyle) {
        super.didTransition(to: presentationStyle)
        
        switch presentationStyle {
        case .compact:
            setupCompactView()
        case .expanded:
            setupExpandedView()
        case .transcript:
            setupTranscriptView()
        @unknown default:
            break
        }
    }
    
    // MARK: - View Setup
    
    private func setupCompactView() {
        view.subviews.forEach { $0.removeFromSuperview() }
        
        let compactView = CompactView(
            onConvertTapped: { [weak self] in
                self?.requestPresentationStyle(.expanded)
            },
            onAutoPasteTapped: { [weak self] in
                self?.handleAutoPaste()
            },
            pendingShareMetadata: pendingShareMetadata
        )
        
        let hostingController = UIHostingController(rootView: compactView)
        addChild(hostingController)
        view.addSubview(hostingController.view)
        hostingController.view.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            hostingController.view.topAnchor.constraint(equalTo: view.topAnchor),
            hostingController.view.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            hostingController.view.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            hostingController.view.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
        
        hostingController.didMove(toParent: self)
    }
    
    private func setupExpandedView() {
        view.subviews.forEach { $0.removeFromSuperview() }
        
        let expandedView = ExpandedView(
            messagesService: messagesService,
            onCloseTapped: { [weak self] in
                self?.requestPresentationStyle(.compact)
            },
            onShareTapped: { [weak self] preview, platform in
                self?.shareInMessages(preview: preview, platform: platform)
            }
        )
        
        let hostingController = UIHostingController(rootView: expandedView)
        addChild(hostingController)
        view.addSubview(hostingController.view)
        hostingController.view.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            hostingController.view.topAnchor.constraint(equalTo: view.topAnchor),
            hostingController.view.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            hostingController.view.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            hostingController.view.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
        
        hostingController.didMove(toParent: self)
    }
    
    private func setupTranscriptView() {
        view.subviews.forEach { $0.removeFromSuperview() }
    }
    
    // MARK: - Actions
    
    private func handleAutoPaste() {
        Task {
            await messagesService.autoPasteAndConvert()
            
            if messagesService.currentPreview != nil {
                await MainActor.run {
                    self.requestPresentationStyle(.expanded)
                }
            }
        }
    }
    
    private func shareInMessages(preview: SongPreview, platform: MusicPlatform?) {
        guard let conversation = activeConversation else { return }
        
        // Determine which URL to share
        let shareURL: URL?
        
        if let songLink = preview.songLink {
            // We have full song link data from API
            if let platform = platform {
                shareURL = messagesService.getURL(for: platform, from: songLink)
            } else {
                shareURL = messagesService.getSongLinkPageURL(from: songLink)
            }
        } else if let pendingURL = messagesService.pendingShareURL {
            // Fallback to pending URL from main app share
            shareURL = URL(string: pendingURL)
        } else {
            // Last resort: use the original URL from preview
            shareURL = URL(string: preview.originalUrl)
        }
        
        guard let url = shareURL else { return }
        
        // Create the message
        let message = MSMessage(session: conversation.selectedMessage?.session ?? MSSession())
        
        // Create message layout
        let layout = MSMessageTemplateLayout()
        layout.caption = preview.title
        layout.subcaption = preview.artist
        layout.trailingCaption = platform?.displayName ?? "Universal Link"
        
        // Load thumbnail image asynchronously
        if let thumbnailURLString = preview.thumbnailUrl,
           let thumbnailURL = URL(string: thumbnailURLString) {
            Task {
                do {
                    let (data, _) = try await URLSession.shared.data(from: thumbnailURL)
                    if let image = UIImage(data: data) {
                        await MainActor.run {
                            layout.image = image
                            self.sendMessage(message, with: layout, url: url, to: conversation)
                        }
                    } else {
                        await MainActor.run {
                            self.sendMessage(message, with: layout, url: url, to: conversation)
                        }
                    }
                } catch {
                    await MainActor.run {
                        self.sendMessage(message, with: layout, url: url, to: conversation)
                    }
                }
            }
        } else {
            sendMessage(message, with: layout, url: url, to: conversation)
        }
    }
    
    private func sendMessage(_ message: MSMessage, with layout: MSMessageTemplateLayout, url: URL, to conversation: MSConversation) {
        message.layout = layout
        message.url = url
        message.summaryText = "Check out this song!"
        
        conversation.insert(message) { [weak self] error in
            if let error = error {
                print("Error inserting message: \(error.localizedDescription)")
            } else {
                // Clear pending share state
                self?.pendingShareMetadata = nil
                self?.messagesService.pendingShareURL = nil
                // Dismiss to compact mode after sending
                self?.requestPresentationStyle(.compact)
                // Reset the preview state
                self?.messagesService.resetCurrentState()
            }
        }
    }
}