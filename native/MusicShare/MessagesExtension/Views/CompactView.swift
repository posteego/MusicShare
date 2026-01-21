//
//  CompactView.swift
//  MessagesExtension
//
//  SwiftUI view for compact Messages extension mode
//

import SwiftUI
import UIKit

struct CompactView: View {
    let onConvertTapped: () -> Void
    let onAutoPasteTapped: () -> Void
    let pendingShareMetadata: ShareLinkMetadata?
    
    @State private var hasClipboardContent = false
    
    private let musicDomains = ["spotify.com", "music.apple.com", "youtube.com", "music.youtube.com", "tidal.com", "soundcloud.com", "deezer.com"]
    
    var body: some View {
        if pendingShareMetadata != nil {
            pendingShareView
        } else {
            defaultView
        }
    }
    
    // MARK: - Pending Share View (when coming from main app)
    
    private var pendingShareView: some View {
        Button(action: onConvertTapped) {
            HStack(spacing: 12) {
                Image(systemName: "music.note")
                    .font(.system(size: 18))
                    .foregroundColor(.green)
                
                VStack(alignment: .leading, spacing: 2) {
                    Text(pendingShareMetadata?.title ?? "Ready to Share")
                        .font(.caption)
                        .fontWeight(.semibold)
                        .lineLimit(1)
                    
                    if let artist = pendingShareMetadata?.artist {
                        Text(artist)
                            .font(.caption2)
                            .foregroundColor(.secondary)
                            .lineLimit(1)
                    }
                }
                
                Spacer()
                
                HStack(spacing: 4) {
                    Text("Tap to Send")
                        .font(.caption)
                        .fontWeight(.medium)
                    Image(systemName: "chevron.up")
                        .font(.caption)
                }
                .foregroundColor(.white)
                .padding(.horizontal, 12)
                .padding(.vertical, 6)
                .background(Color.green)
                .cornerRadius(16)
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 8)
        }
        .buttonStyle(PlainButtonStyle())
    }
    
    // MARK: - Default View
    
    private var defaultView: some View {
        HStack(spacing: 12) {
            if hasClipboardContent {
                // Show auto-paste button prominently when we detect a music link
                Button(action: onAutoPasteTapped) {
                    HStack {
                        Image(systemName: "wand.and.stars")
                            .font(.system(size: 14))
                        Text("Convert Copied Link")
                            .font(.caption)
                            .fontWeight(.medium)
                    }
                    .padding(.horizontal, 12)
                    .padding(.vertical, 8)
                    .background(Color.green)
                    .foregroundColor(.white)
                    .cornerRadius(20)
                }
                .buttonStyle(PlainButtonStyle())
            } else {
                // Show instruction when no music link is detected
                HStack(spacing: 8) {
                    Image(systemName: "doc.on.clipboard")
                        .font(.system(size: 14))
                        .foregroundColor(.secondary)
                    Text("Copy a music link first")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                .padding(.horizontal, 12)
                .padding(.vertical, 8)
            }
            
            Button(action: onConvertTapped) {
                HStack {
                    Image(systemName: "music.note.list")
                        .font(.system(size: 14))
                    Text("Enter Link")
                        .font(.caption)
                        .fontWeight(.medium)
                }
                .padding(.horizontal, 12)
                .padding(.vertical, 8)
                .background(Color.blue)
                .foregroundColor(.white)
                .cornerRadius(20)
            }
            .buttonStyle(PlainButtonStyle())
        }
        .padding(.horizontal)
        .onAppear {
            checkClipboard()
        }
    }
    
    private func checkClipboard() {
        guard let clipboardContent = UIPasteboard.general.string else {
            hasClipboardContent = false
            return
        }
        
        // Check if clipboard contains a music URL
        hasClipboardContent = musicDomains.contains { domain in
            clipboardContent.lowercased().contains(domain)
        }
    }
}