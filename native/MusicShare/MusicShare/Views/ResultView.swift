import SwiftUI
import UIKit

struct ResultView: View {
    let songLink: SongLink
    @Binding var isPresented: Bool
    
    @StateObject private var clipboardService = ClipboardService.shared
    @State private var showingShareSheet = false
    @State private var showCopyToast = false
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 20) {
                    successAnimation
                    
                    songInfoSection
                    
                    conversionInfoSection
                    
                    actionButtons
                    
                    Spacer()
                }
                .padding()
            }
            .navigationTitle("Conversion Complete")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Close") {
                        isPresented = false
                    }
                }
            }
        }
        .sheet(isPresented: $showingShareSheet) {
            if let url = URL(string: songLink.convertedURL) {
                ShareSheet(activityItems: [url])
            }
        }
        .showCopyToast(message: "Link copied to clipboard!", isShowing: $showCopyToast)
    }
    
    private var successAnimation: some View {
        VStack {
            Image(systemName: "checkmark.circle.fill")
                .font(.system(size: 80))
                .foregroundColor(.green)
                .scaleEffect(1.0)
                .animation(.easeInOut(duration: 0.5), value: true)
            
            Text("Successfully Converted!")
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(.green)
        }
    }
    
    private var songInfoSection: some View {
        VStack(spacing: 12) {
            if songLink.hasMetadata {
                if !songLink.displayTitle.isEmpty {
                    Text(songLink.displayTitle)
                        .font(.title3)
                        .fontWeight(.semibold)
                        .multilineTextAlignment(.center)
                }
                
                HStack(spacing: 16) {
                    HStack {
                        Image(systemName: songLink.sourcePlatform.iconName)
                            .foregroundColor(.blue)
                        Text(songLink.sourcePlatform.displayName)
                            .font(.caption)
                    }
                    
                    Image(systemName: "arrow.right")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    
                    HStack {
                        Image(systemName: songLink.targetPlatform.iconName)
                            .foregroundColor(.blue)
                        Text(songLink.targetPlatform.displayName)
                            .font(.caption)
                    }
                }
                .foregroundColor(.secondary)
            }
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }
    
    private var conversionInfoSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Converted URL")
                .font(.headline)
            
            Text(songLink.convertedURL)
                .font(.caption)
                .foregroundColor(.secondary)
                .textSelection(.enabled)
                .padding()
                .background(Color(.systemGray6))
                .cornerRadius(8)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }
    
    private var actionButtons: some View {
        VStack(spacing: 12) {
            // Primary action: Share to Messages
            Button(action: shareToMessages) {
                HStack {
                    Image(systemName: "message.fill")
                    Text("Share to Messages")
                }
                .foregroundColor(.white)
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color.green)
                .cornerRadius(10)
            }
            
            Button(action: copyLink) {
                HStack {
                    Image(systemName: "doc.on.doc")
                    Text("Copy Link")
                }
                .foregroundColor(.white)
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color.blue)
                .cornerRadius(10)
            }
            
            Button(action: {
                showingShareSheet = true
            }) {
                HStack {
                    Image(systemName: "square.and.arrow.up")
                    Text("Share Link")
                }
                .foregroundColor(.blue)
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color(.systemGray6))
                .cornerRadius(10)
            }
        }
    }
    
    private func copyLink() {
        clipboardService.copyToClipboard(songLink.convertedURL)
        showCopyToast = true
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            showCopyToast = false
        }
    }
    
    private func shareToMessages() {
        // Save the link to shared App Group storage for the iMessage extension
        let metadata = ShareLinkMetadata(
            title: songLink.songName,
            artist: songLink.artist,
            thumbnailUrl: songLink.thumbnail,
            platformName: songLink.targetPlatform.displayName
        )
        SharedDataService.shared.savePendingShareLink(songLink.convertedURL, metadata: metadata)
        
        // Open Messages app - the iMessage extension will read from shared storage
        if let messagesURL = URL(string: "sms:") {
            UIApplication.shared.open(messagesURL)
        }
    }
}

struct ShareSheet: UIViewControllerRepresentable {
    let activityItems: [Any]
    
    func makeUIViewController(context: Context) -> UIActivityViewController {
        UIActivityViewController(activityItems: activityItems, applicationActivities: nil)
    }
    
    func updateUIViewController(_ uiViewController: UIActivityViewController, context: Context) {}
}

#Preview {
    ResultView(
        songLink: SongLink(
            originalURL: "https://open.spotify.com/track/example",
            convertedURL: "https://music.apple.com/example",
            sourcePlatformRaw: "spotify",
            targetPlatformRaw: "appleMusic",
            songName: "Test Song",
            artist: "Test Artist"
        ),
        isPresented: .constant(true)
    )
}