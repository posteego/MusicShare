import SwiftUI

struct HistoryView: View {
    @StateObject private var storageService = StorageService.shared
    @StateObject private var clipboardService = ClipboardService.shared
    
    @State private var showingDeleteAlert = false
    @State private var itemToDelete: SongLinkEntity?
    @State private var showCopyToast = false
    
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            headerSection
            
            if storageService.songLinks.isEmpty {
                emptyStateView
            } else {
                historyList
            }
        }
        .alert("Delete Item", isPresented: $showingDeleteAlert) {
            Button("Cancel", role: .cancel) { }
            Button("Delete", role: .destructive) {
                if let item = itemToDelete {
                    storageService.deleteSongLink(item)
                }
            }
        } message: {
            Text("Are you sure you want to delete this conversion from history?")
        }
        .showCopyToast(message: "Link copied to clipboard!", isShowing: $showCopyToast)
        .onAppear {
            storageService.fetchSongLinks()
        }
    }
    
    private var headerSection: some View {
        HStack {
            Image(systemName: "clock.arrow.circlepath")
                .font(.title2)
                .foregroundColor(.blue)
            
            Text("Recent Conversions")
                .font(.headline)
                .fontWeight(.semibold)
            
            Spacer()
            
            if !storageService.songLinks.isEmpty {
                Button("Clear All") {
                    // Clear all action would be handled here
                }
                .font(.caption)
                .foregroundColor(.red)
            }
        }
    }
    
    private var emptyStateView: some View {
        VStack(spacing: 12) {
            Image(systemName: "music.note.list")
                .font(.system(size: 50))
                .foregroundColor(.gray.opacity(0.5))
            
            Text("No conversions yet")
                .font(.headline)
                .foregroundColor(.gray)
            
            Text("Convert your first music link to see it here")
                .font(.caption)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 40)
    }
    
    private var historyList: some View {
        LazyVStack(spacing: 12) {
            ForEach(storageService.songLinks.prefix(5)) { songLink in
                HistoryItemRow(
                    songLink: songLink,
                    onCopy: {
                        clipboardService.copyToClipboard(songLink.convertedURL)
                        showCopyToast = true
                        
                        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
                            showCopyToast = false
                        }
                    },
                    onDelete: {
                        itemToDelete = songLink
                        showingDeleteAlert = true
                    }
                )
            }
            
            if storageService.songLinks.count > 5 {
                Button("View All (\(storageService.songLinks.count))") {
                    // Navigate to full history
                }
                .font(.caption)
                .foregroundColor(.blue)
                .padding(.top, 4)
            }
        }
    }
}

struct HistoryItemRow: View {
    let songLink: SongLinkEntity
    let onCopy: () -> Void
    let onDelete: () -> Void
    
    var body: some View {
        HStack(spacing: 12) {
            // Platform icons
            VStack(spacing: 2) {
                Image(systemName: songLink.sourcePlatform.iconName)
                    .font(.caption)
                    .foregroundColor(.blue)
                
                Image(systemName: "arrow.down")
                    .font(.caption2)
                    .foregroundColor(.secondary)
                
                Image(systemName: songLink.targetPlatform.iconName)
                    .font(.caption)
                    .foregroundColor(.blue)
            }
            .frame(width: 30)
            
            // Song info
            VStack(alignment: .leading, spacing: 4) {
                Text(songLink.displayTitle)
                    .font(.subheadline)
                    .fontWeight(.medium)
                    .lineLimit(1)
                
                HStack {
                    Text(songLink.sourcePlatform.displayName)
                        .font(.caption)
                        .foregroundColor(.secondary)
                    
                    Text("→")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    
                    Text(songLink.targetPlatform.displayName)
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                
                Text(formatDate(songLink.timestamp))
                    .font(.caption2)
                    .foregroundColor(.secondary)
            }
            
            Spacer()
            
            // Action buttons
            HStack(spacing: 8) {
                Button(action: onCopy) {
                    Image(systemName: "doc.on.doc")
                        .font(.caption)
                        .foregroundColor(.blue)
                }
                
                Button(action: onDelete) {
                    Image(systemName: "trash")
                        .font(.caption)
                        .foregroundColor(.red)
                }
            }
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(10)
    }
    
    private func formatDate(_ date: Date) -> String {
        let formatter = RelativeDateTimeFormatter()
        formatter.unitsStyle = .abbreviated
        return formatter.localizedString(for: date, relativeTo: Date())
    }
}

#Preview {
    HistoryView()
}