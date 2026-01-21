import Foundation
import SwiftData
import SwiftUI
import Combine

@MainActor
class StorageService: ObservableObject {
    static let shared = StorageService()
    
    @Published var songLinks: [SongLinkEntity] = []
    @Published var userPreferences: UserPreferences = .default
    
    private var modelContext: ModelContext?
    
    private let preferencesKey = "UserPreferences"
    
    private init() {
        loadPreferences()
    }
    
    func setModelContext(_ context: ModelContext) {
        self.modelContext = context
        fetchSongLinks()
    }
    
    func saveSongLink(_ songLink: SongLink) {
        guard let context = modelContext else {
            print("Warning: ModelContext not set")
            return
        }
        
        let entity = SongLinkEntity(
            originalURL: songLink.originalURL,
            convertedURL: songLink.convertedURL,
            sourcePlatform: songLink.sourcePlatformRaw,
            targetPlatform: songLink.targetPlatformRaw,
            songName: songLink.songName,
            artist: songLink.artist,
            thumbnail: songLink.thumbnail,
            isFavorite: songLink.isFavorite
        )
        
        context.insert(entity)
        
        do {
            try context.save()
            fetchSongLinks()
        } catch {
            print("Failed to save song link: \(error)")
        }
    }
    
    func fetchSongLinks() {
        guard let context = modelContext else {
            print("Warning: ModelContext not set")
            return
        }
        
        let descriptor = FetchDescriptor<SongLinkEntity>(
            sortBy: [SortDescriptor(\.timestamp, order: .reverse)]
        )
        
        do {
            songLinks = try context.fetch(descriptor)
        } catch {
            print("Failed to fetch song links: \(error)")
            songLinks = []
        }
    }
    
    func deleteSongLink(_ songLink: SongLinkEntity) {
        guard let context = modelContext else { return }
        
        context.delete(songLink)
        
        do {
            try context.save()
            fetchSongLinks()
        } catch {
            print("Failed to delete song link: \(error)")
        }
    }
    
    func clearAllSongLinks() {
        guard let context = modelContext else { return }
        
        for songLink in songLinks {
            context.delete(songLink)
        }
        
        do {
            try context.save()
            fetchSongLinks()
        } catch {
            print("Failed to clear song links: \(error)")
        }
    }
    
    func savePreferences() {
        if let encoded = try? JSONEncoder().encode(userPreferences) {
            UserDefaults.standard.set(encoded, forKey: preferencesKey)
        }
    }
    
    func loadPreferences() {
        if let data = UserDefaults.standard.data(forKey: preferencesKey),
           let preferences = try? JSONDecoder().decode(UserPreferences.self, from: data) {
            userPreferences = preferences
        }
    }
}
