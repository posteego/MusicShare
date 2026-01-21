import SwiftUI

struct HomeView: View {
    private let songLinkService = SongLinkService.shared
    private let clipboardService = ClipboardService.shared
    @ObservedObject private var storageService = StorageService.shared
    
    @State private var inputURL = ""
    @State private var selectedPlatform: MusicPlatform = .spotify
    @State private var showingPlatformSelector = false
    @State private var showingResult = false
    @State private var convertedSong: SongLink?
    @State private var isLoading = false
    @State private var errorMessage = ""
    @State private var showingError = false
    @State private var showCopyToast = false
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 20) {
                    headerSection
                    
                    urlInputSection
                    
                    platformSelectionSection
                    
                    actionButton
                    
                    HistoryView()
                        .padding(.top, 20)
                    
                    Spacer(minLength: 50)
                }
                .padding()
                
            }
            .navigationTitle("MusicShare")
            .navigationBarTitleDisplayMode(.inline)
//            ZStack {
//                ScrollView {
//                    VStack(spacing: 20) {
//                        ...
//
//                        Spacer(minLength: 50)
//                    }
//                    .padding()
//                }
//                .padding()
//                
//                if isLoading {
//                    Color.black.opacity(0.3)
//                        .ignoresSafeArea()
//                    ProgressView()
//                        .progressViewStyle(CircularProgressViewStyle(tint: .white))
//                        .scaleEffect(1.5)
//                }
//            }
        }
        .sheet(isPresented: $showingPlatformSelector) {
            PlatformSelectorView(selectedPlatform: $selectedPlatform)
        }
        .sheet(isPresented: $showingResult) {
            if let song = convertedSong {
                ResultView(songLink: song, isPresented: $showingResult)
            }
        }
        .alert("Error", isPresented: $showingError) {
            Button("OK", role: .cancel) { }
        } message: {
            Text(errorMessage)
        }
        .showCopyToast(message: "Link copied to clipboard!", isShowing: $showCopyToast)
        .onAppear {
            loadClipboardURL()
        }
    }
    
    private var headerSection: some View {
        VStack(spacing: 8) {
            Text("Music Link Converter")
                .font(.title)
                .fontWeight(.bold)
            
            Text("Convert music links between streaming platforms")
                .font(.caption)
                .foregroundColor(.secondary)
        }
    }
    
    private var urlInputSection: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Music URL")
                .font(.headline)
            
            TextField("Enter music URL...", text: $inputURL)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .keyboardType(.URL)
                .autocapitalization(.none)
                .disableAutocorrection(true)
            
            if !inputURL.isEmpty {
                if let platform = songLinkService.detectPlatform(from: inputURL) {
                    HStack {
                        Image(systemName: platform.iconName)
                            .foregroundColor(.green)
                        Text("Detected: \(platform.displayName)")
                            .font(.caption)
                            .foregroundColor(.green)
                        Spacer()
                    }
                } else {
                    HStack {
                        Image(systemName: "exclamationmark.triangle")
                            .foregroundColor(.orange)
                        Text("Unsupported platform")
                            .font(.caption)
                            .foregroundColor(.orange)
                        Spacer()
                    }
                }
            }
        }
    }
    
    private var platformSelectionSection: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Convert to")
                .font(.headline)
            
            Button(action: {
                showingPlatformSelector = true
            }) {
                HStack {
                    Image(systemName: selectedPlatform.iconName)
                        .foregroundColor(.blue)
                    Text(selectedPlatform.displayName)
                        .foregroundColor(.primary)
                    Spacer()
                    Image(systemName: "chevron.down")
                        .foregroundColor(.secondary)
                }
                .padding()
                .background(Color(.systemGray6))
                .cornerRadius(10)
            }
        }
    }
    
    private var actionButton: some View {
        Button(action: convertURL) {
            HStack {
                if isLoading {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle(tint: .white))
                        .scaleEffect(0.8)
                } else {
                    Image(systemName: "arrow.right.arrow.left")
                }
                Text("Convert Link")
            }
            .foregroundColor(.white)
            .frame(maxWidth: .infinity)
            .padding()
            .background(canConvert ? Color.blue : Color.gray)
            .cornerRadius(10)
        }
        .disabled(!canConvert || isLoading)
    }
    
    private var canConvert: Bool {
        !inputURL.isEmpty && songLinkService.detectPlatform(from: inputURL) != nil
    }
    
    private func loadClipboardURL() {
        if clipboardService.hasURLInClipboard() && inputURL.isEmpty {
            inputURL = clipboardService.getStringFromClipboard() ?? ""
        }
    }
    
    private func convertURL() {
        guard !inputURL.isEmpty else { return }
        
        isLoading = true
        
        Task {
            do {
                let song = try await songLinkService.convertURL(inputURL, to: selectedPlatform)
                
                await MainActor.run {
                    convertedSong = song
                    isLoading = false
                    showingResult = true
                    
                    clipboardService.copyToClipboard(song.convertedURL)
                    showCopyToast = true
                    
                    DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
                        showCopyToast = false
                    }
                    
                    storageService.saveSongLink(song)
                }
                
            } catch {
                await MainActor.run {
                    isLoading = false
                    errorMessage = error.localizedDescription
                    showingError = true
                }
            }
        }
    }
}

#Preview {
    HomeView()
}
