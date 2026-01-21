//
//  ExpandedView.swift
//  MessagesExtension
//
//  SwiftUI view for expanded Messages extension mode
//

import SwiftUI

struct ExpandedView: View {
    @ObservedObject var messagesService: MessagesExtensionService
    let onCloseTapped: () -> Void
    let onShareTapped: (SongPreview, MusicPlatform?) -> Void
    
    @State private var urlInput = ""
    @State private var showingHistory = false
    @FocusState private var urlFieldFocused: Bool
    
    var body: some View {
        NavigationView {
            VStack(spacing: 16) {
                // Header
                HStack {
                    Button("Close") {
                        onCloseTapped()
                    }
                    .foregroundColor(.blue)
                    Spacer()
                    Button("History") {
                        showingHistory.toggle()
                    }
                    .foregroundColor(.blue)
                }
                .padding(.horizontal)
                
                // URL Input Section
                VStack(spacing: 12) {
                    HStack {
                        TextField("Enter music URL...", text: $urlInput)
                            .textFieldStyle(RoundedBorderTextFieldStyle())
                            .focused($urlFieldFocused)
                        
                        Button("Convert") {
                            handleConvert()
                        }
                        .buttonStyle(.borderedProminent)
                        .disabled(urlInput.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty || messagesService.isLoading)
                    }
                    
                    // Auto-paste button
                    if UIPasteboard.general.hasStrings {
                        Button(action: {
                            if let clipboardContent = UIPasteboard.general.string {
                                urlInput = clipboardContent
                                urlFieldFocused = true
                            }
                        }) {
                            HStack {
                                Image(systemName: "doc.on.clipboard")
                                Text("Paste from clipboard")
                            }
                            .font(.caption)
                            .foregroundColor(.blue)
                        }
                    }
                }
                .padding(.horizontal)
                
                // Loading State
                if messagesService.isLoading {
                    ProgressView("Converting...")
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                        .transition(.opacity)
                }
                // Error State
                else if let errorMessage = messagesService.errorMessage {
                    VStack(spacing: 12) {
                        Image(systemName: "exclamationmark.triangle")
                            .font(.title)
                            .foregroundColor(.orange)
                        
                        Text(errorMessage)
                            .foregroundColor(.red)
                            .multilineTextAlignment(.center)
                        
                        Button("Try Again") {
                            messagesService.clearError()
                            if !urlInput.isEmpty {
                                handleConvert()
                            }
                        }
                        .buttonStyle(.borderedProminent)
                    }
                    .padding()
                    .transition(.opacity)
                }
                // Preview State
                else if let preview = messagesService.currentPreview {
                    SongPreviewView(
                        preview: preview,
                        onPlatformSelected: { platform in
                            if let songLink = preview.songLink {
                                messagesService.openStreamingApp(for: platform, songLink: songLink)
                            }
                        },
                        onShareTapped: onShareTapped
                    )
                    .transition(.opacity)
                }
                // Default State
                else {
                    VStack(spacing: 16) {
                        Image(systemName: "music.note.list")
                            .font(.system(size: 48))
                            .foregroundColor(.gray)
                        
                        Text("Convert music links between streaming platforms")
                            .font(.headline)
                            .multilineTextAlignment(.center)
                        
                        Text("Enter a URL from Spotify, Apple Music, YouTube Music, and more")
                            .font(.caption)
                            .foregroundColor(.secondary)
                            .multilineTextAlignment(.center)
                        
                        // Recent conversions
                        if !messagesService.conversionHistory.isEmpty {
                            Divider()
                            
                            VStack(alignment: .leading, spacing: 8) {
                                Text("Recent Conversions")
                                    .font(.caption)
                                    .fontWeight(.semibold)
                                    .foregroundColor(.secondary)
                                
                                ForEach(messagesService.conversionHistory.prefix(3)) { record in
                                    HStack {
                                        VStack(alignment: .leading) {
                                            Text(record.title)
                                                .font(.caption)
                                                .lineLimit(1)
                                            Text(record.artist)
                                                .font(.caption2)
                                                .foregroundColor(.secondary)
                                                .lineLimit(1)
                                        }
                                        
                                        Spacer()
                                        
                                        Button("Use") {
                                            urlInput = record.originalURL
                                        }
                                        .font(.caption)
                                    }
                                    .padding(.vertical, 2)
                                }
                            }
                            .padding(.horizontal)
                        }
                    }
                    .padding()
                    .transition(.opacity)
                }
                
                Spacer()
            }
            .navigationBarHidden(true)
            .sheet(isPresented: $showingHistory) {
                HistoryView(messagesService: messagesService, urlInput: $urlInput)
            }
        }
        .animation(.easeInOut(duration: 0.3), value: messagesService.isLoading)
        .animation(.easeInOut(duration: 0.3), value: messagesService.errorMessage)
        .animation(.easeInOut(duration: 0.3), value: messagesService.currentPreview)
    }
    
    private func handleConvert() {
        Task {
            await messagesService.convertURL(urlInput.trimmingCharacters(in: .whitespacesAndNewlines))
        }
    }
}

struct SongPreviewView: View {
    let preview: SongPreview
    let onPlatformSelected: (MusicPlatform) -> Void
    let onShareTapped: (SongPreview, MusicPlatform?) -> Void
    
    @State private var selectedPlatform: MusicPlatform?
    @State private var image: Image?
    
    var body: some View {
        VStack(spacing: 16) {
            // Song Info Card
            VStack(spacing: 12) {
                // Album Art
                AsyncImage(url: URL(string: preview.thumbnailUrl ?? "")) { image in
                    image
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                } placeholder: {
                    RoundedRectangle(cornerRadius: 12)
                        .fill(Color.gray.opacity(0.3))
                        .overlay(
                            Image(systemName: "music.note")
                                .font(.title)
                                .foregroundColor(.gray)
                        )
                }
                .frame(width: 120, height: 120)
                .clipShape(RoundedRectangle(cornerRadius: 12))
                .shadow(radius: 4)
                
                // Song Details
                VStack(spacing: 4) {
                    Text(preview.title)
                        .font(.headline)
                        .multilineTextAlignment(.center)
                        .lineLimit(2)
                    
                    Text(preview.artist)
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                        .lineLimit(1)
                }
            }
            
            // Platform Selection
            VStack(spacing: 8) {
                Text("Select a platform to share:")
                    .font(.caption)
                    .fontWeight(.medium)
                    .foregroundColor(.secondary)
                
                LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 3), spacing: 8) {
                    ForEach(preview.availablePlatforms, id: \.self) { platform in
                        Button(action: {
                            selectedPlatform = platform
                            onPlatformSelected(platform)
                        }) {
                            VStack(spacing: 4) {
                                Image(systemName: platform.iconName)
                                    .font(.title2)
                                Text(platform.displayName)
                                    .font(.caption)
                            }
                            .padding(8)
                            .background(selectedPlatform == platform ? Color.blue : Color.blue.opacity(0.1))
                            .foregroundColor(selectedPlatform == platform ? .white : .primary)
                            .cornerRadius(8)
                            .overlay(
                                RoundedRectangle(cornerRadius: 8)
                                    .stroke(selectedPlatform == platform ? Color.blue : Color.clear, lineWidth: 2)
                            )
                        }
                        .buttonStyle(PlainButtonStyle())
                    }
                }
            }
            
            // Share options
            VStack(spacing: 8) {
                // Share specific platform link
                Button(action: {
                    onShareTapped(preview, selectedPlatform)
                }) {
                    HStack {
                        Image(systemName: "square.and.arrow.up")
                        Text(selectedPlatform != nil ? "Share \(selectedPlatform!.displayName) Link" : "Share Universal Link")
                    }
                    .font(.caption)
                    .fontWeight(.medium)
                    .frame(maxWidth: .infinity)
                    .padding(.horizontal, 16)
                    .padding(.vertical, 10)
                    .background(Color.green)
                    .foregroundColor(.white)
                    .cornerRadius(20)
                }
                
                // Share universal song.link
                if selectedPlatform != nil {
                    Button(action: {
                        onShareTapped(preview, nil)
                    }) {
                        HStack {
                            Image(systemName: "link")
                            Text("Share Universal Link Instead")
                        }
                        .font(.caption)
                        .foregroundColor(.blue)
                    }
                }
            }
        }
        .padding()
    }
}

struct HistoryView: View {
    @ObservedObject var messagesService: MessagesExtensionService
    @Binding var urlInput: String
    @Environment(\.presentationMode) var presentationMode
    
    var body: some View {
        NavigationView {
            List(messagesService.conversionHistory) { record in
                VStack(alignment: .leading, spacing: 4) {
                    HStack {
                        VStack(alignment: .leading) {
                            Text(record.title)
                                .font(.headline)
                                .lineLimit(2)
                            Text(record.artist)
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                        }
                        
                        Spacer()
                        
                        Button("Use") {
                            urlInput = record.originalURL
                            presentationMode.wrappedValue.dismiss()
                        }
                        .buttonStyle(.bordered)
                    }
                    
                    Text(record.formattedDate)
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                .padding(.vertical, 4)
            }
            .navigationTitle("History")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        presentationMode.wrappedValue.dismiss()
                    }
                }
            }
        }
    }
}