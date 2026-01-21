import SwiftUI

struct SettingsView: View {
    @StateObject private var storageService = StorageService.shared
    
    @State private var showingPlatformSelector = false
    @State private var tempSelectedPlatform: MusicPlatform = .spotify
    @State private var showingClearHistoryAlert = false
    
    var body: some View {
        NavigationView {
            Form {
                section_header
                platform_selection_section
                settings_section
                about_section
                danger_zone_section
            }
            .navigationTitle("Settings")
            .navigationBarTitleDisplayMode(.large)
        }
        .sheet(isPresented: $showingPlatformSelector) {
            PlatformSelectorView(selectedPlatform: $tempSelectedPlatform)
        }
        .alert("Clear History", isPresented: $showingClearHistoryAlert) {
            Button("Cancel", role: .cancel) { }
            Button("Clear", role: .destructive) {
                clearHistory()
            }
        } message: {
            Text("Are you sure you want to clear all conversion history? This action cannot be undone.")
        }
        .onAppear {
            tempSelectedPlatform = storageService.userPreferences.preferredPlatform
        }
    }
    
    private var section_header: some View {
        Section {
            HStack {
                Image(systemName: "music.note.list")
                    .font(.system(size: 40))
                    .foregroundColor(.blue)
                
                VStack(alignment: .leading, spacing: 4) {
                    Text("MusicShare")
                        .font(.title2)
                        .fontWeight(.bold)
                    Text("Convert music links between platforms")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                
                Spacer()
            }
            .padding(.vertical, 8)
        }
    }
    
    private var platform_selection_section: some View {
        Section("Default Platform") {
            Button(action: {
                showingPlatformSelector = true
            }) {
                HStack {
                    Image(systemName: storageService.userPreferences.preferredPlatform.iconName)
                        .foregroundColor(.blue)
                        .frame(width: 25)
                    
                    Text("Preferred Conversion Platform")
                    Spacer()
                    
                    Text(storageService.userPreferences.preferredPlatform.displayName)
                        .foregroundColor(.secondary)
                    Image(systemName: "chevron.right")
                        .foregroundColor(.secondary)
                        .font(.caption)
                }
            }
            .buttonStyle(PlainButtonStyle())
            
            if tempSelectedPlatform != storageService.userPreferences.preferredPlatform {
                Button("Save Changes") {
                    savePlatformSelection()
                }
                .foregroundColor(.blue)
            }
        }
    }
    
    private var settings_section: some View {
        Section("Preferences") {
            Toggle("Auto-copy to clipboard", isOn: Binding(
                get: { storageService.userPreferences.autoCopyToClipboard },
                set: { newValue in
                    storageService.userPreferences.autoCopyToClipboard = newValue
                    storageService.savePreferences()
                }
            ))
            
            Toggle("Show conversion history", isOn: Binding(
                get: { storageService.userPreferences.showHistory },
                set: { newValue in
                    storageService.userPreferences.showHistory = newValue
                    storageService.savePreferences()
                }
            ))
            
            Toggle("Enable notifications", isOn: Binding(
                get: { storageService.userPreferences.enableNotifications },
                set: { newValue in
                    storageService.userPreferences.enableNotifications = newValue
                    storageService.savePreferences()
                }
            ))
            
            Stepper(
                "Max history items: \(storageService.userPreferences.maxHistoryItems)",
                value: Binding(
                    get: { storageService.userPreferences.maxHistoryItems },
                    set: { newValue in
                        storageService.userPreferences.maxHistoryItems = newValue
                        storageService.savePreferences()
                    }
                ),
                in: 10...500,
                step: 10
            )
        }
    }
    
    private var about_section: some View {
        Section("About") {
            HStack {
                Text("Version")
                Spacer()
                Text("1.0.0")
                    .foregroundColor(.secondary)
            }
            
            HStack {
                Text("Powered by")
                Spacer()
                Text("Odesli (song.link)")
                    .foregroundColor(.blue)
            }
            
            Link("Privacy Policy", destination: URL(string: "https://odesli.co/privacy")!)
            Link("Terms of Service", destination: URL(string: "https://odesli.co/terms")!)
        }
    }
    
    private var danger_zone_section: some View {
        Section("Data Management") {
            Button(action: {
                showingClearHistoryAlert = true
            }) {
                HStack {
                    Image(systemName: "trash")
                        .foregroundColor(.red)
                    Text("Clear Conversion History")
                        .foregroundColor(.red)
                }
            }
        }
    }
    
    private func savePlatformSelection() {
        storageService.userPreferences.preferredPlatform = tempSelectedPlatform
        storageService.savePreferences()
    }
    
    private func clearHistory() {
        storageService.clearAllSongLinks()
    }
}

#Preview {
    SettingsView()
}