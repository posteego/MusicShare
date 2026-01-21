//
//  MessagesExtensionService.swift
//  MessagesExtension
//
//  Service for Messages-specific functionality
//

import Foundation
import UIKit
import Combine

class MessagesExtensionService: ObservableObject {
    static let shared = MessagesExtensionService()
    
    @Published var conversionHistory: [ConversionRecord] = []
    @Published var isLoading = false
    @Published var errorMessage: String?
    @Published var currentPreview: SongPreview?
    
    /// URL pending to be shared (set when coming from main app)
    var pendingShareURL: String?
    
    private let songLinkService = SongLinkService.shared
    private let userDefaults = UserDefaults(suiteName: "group.com.vibewrks.MusicShare")
    
    private init() {
        loadConversionHistory()
    }
    
    // MARK: - Clipboard Management
    
    func getClipboardContent() -> String? {
        return UIPasteboard.general.string
    }
    
    func hasValidClipboardContent() -> Bool {
        guard let content = getClipboardContent() else { return false }
        return songLinkService.detectPlatform(from: content) != nil
    }
    
    // MARK: - URL Conversion
    
    func convertURL(_ urlString: String) async {
        await MainActor.run {
            isLoading = true
            errorMessage = nil
        }
        
        do {
            let songLink = try await songLinkService.convertSongLink(urlString)
            let preview = songLinkService.createSongPreview(from: songLink, originalURL: urlString)
            
            await MainActor.run {
                self.currentPreview = preview
                self.isLoading = false
            }
            
            // Add to history
            let record = ConversionRecord(
                id: UUID().uuidString,
                originalURL: urlString,
                title: preview.title,
                artist: preview.artist,
                targetPlatforms: preview.availablePlatforms.map { $0.rawValue },
                timestamp: Date()
            )
            
            await addToHistory(record)
            
        } catch {
            await MainActor.run {
                self.errorMessage = error.localizedDescription
                self.isLoading = false
            }
        }
    }
    
    func autoPasteAndConvert() async {
        guard let clipboardContent = getClipboardContent() else {
            await MainActor.run {
                errorMessage = "No content in clipboard"
            }
            return
        }
        
        guard hasValidClipboardContent() else {
            await MainActor.run {
                errorMessage = "Clipboard does not contain a valid music URL"
            }
            return
        }
        
        await convertURL(clipboardContent)
    }
    
    // MARK: - Conversion History
    
    private func addToHistory(_ record: ConversionRecord) async {
        await MainActor.run {
            conversionHistory.insert(record, at: 0)
            // Keep only last 20 records
            if conversionHistory.count > 20 {
                conversionHistory = Array(conversionHistory.prefix(20))
            }
            saveConversionHistory()
        }
    }
    
    private func loadConversionHistory() {
        guard let data = userDefaults?.data(forKey: "MessagesExtensionHistory"),
              let history = try? JSONDecoder().decode([ConversionRecord].self, from: data) else {
            conversionHistory = []
            return
        }
        conversionHistory = history
    }
    
    private func saveConversionHistory() {
        guard let data = try? JSONEncoder().encode(conversionHistory) else { return }
        userDefaults?.set(data, forKey: "MessagesExtensionHistory")
    }
    
    // MARK: - Deep Link Handling
    
    @discardableResult
    func openStreamingApp(for platform: MusicPlatform, songLink: SongLink) -> Bool {
        guard let platformURL = songLink.urlByPlatform[platform.rawValue] else {
            return false
        }
        
        guard let url = URL(string: platformURL.url) else {
            return false
        }
        
        // In Messages extension, we need to create a message instead of opening apps directly
        errorMessage = "Opening \(platform.displayName) link in Messages"
        return true
    }
    
    // MARK: - URL Generation
    
    func getURL(for platform: MusicPlatform, from songLink: SongLink) -> URL? {
        guard let platformURL = songLink.urlByPlatform[platform.rawValue] else {
            return nil
        }
        return URL(string: platformURL.url)
    }
    
    func getSongLinkPageURL(from songLink: SongLink) -> URL? {
        return URL(string: songLink.pageUrl)
    }
    
    // MARK: - Helper Methods
    
    func clearError() {
        errorMessage = nil
    }
    
    func resetCurrentState() {
        currentPreview = nil
        errorMessage = nil
    }
}

// MARK: - Conversion History Model

struct ConversionRecord: Codable, Identifiable {
    let id: String
    let originalURL: String
    let title: String
    let artist: String
    let targetPlatforms: [String]
    let timestamp: Date
    
    var formattedDate: String {
        let formatter = DateFormatter()
        formatter.dateStyle = .short
        formatter.timeStyle = .short
        return formatter.string(from: timestamp)
    }
}