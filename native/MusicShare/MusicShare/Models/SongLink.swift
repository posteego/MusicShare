import Foundation

struct SongLink: Identifiable, Codable {
    let id: UUID
    let originalURL: String
    let convertedURL: String
    let sourcePlatformRaw: String
    let targetPlatformRaw: String
    let timestamp: Date
    let songName: String?
    let artist: String?
    let thumbnail: String?
    let isFavorite: Bool
    
    init(
        id: UUID = UUID(),
        originalURL: String,
        convertedURL: String,
        sourcePlatformRaw: String,
        targetPlatformRaw: String,
        timestamp: Date = Date(),
        songName: String? = nil,
        artist: String? = nil,
        thumbnail: String? = nil,
        isFavorite: Bool = false
    ) {
        self.id = id
        self.originalURL = originalURL
        self.convertedURL = convertedURL
        self.sourcePlatformRaw = sourcePlatformRaw
        self.targetPlatformRaw = targetPlatformRaw
        self.timestamp = timestamp
        self.songName = songName
        self.artist = artist
        self.thumbnail = thumbnail
        self.isFavorite = isFavorite
    }
    
    var sourcePlatform: MusicPlatform {
        MusicPlatform(rawValue: sourcePlatformRaw) ?? .spotify
    }
    
    var targetPlatform: MusicPlatform {
        MusicPlatform(rawValue: targetPlatformRaw) ?? .spotify
    }
    
    var displayTitle: String {
        if let songName = songName, let artist = artist {
            return "\(songName) - \(artist)"
        } else if let songName = songName {
            return songName
        } else {
            return "Unknown Song"
        }
    }
    
    var hasMetadata: Bool {
        songName != nil || artist != nil || thumbnail != nil
    }
}

struct UserPreferences: Codable {
    var preferredPlatformRaw: String
    var autoCopyToClipboard: Bool = true
    var showHistory: Bool = true
    var maxHistoryItems: Int = 100
    var enableNotifications: Bool = false
    var lastUsedPlatformRaw: String?
    
    var preferredPlatform: MusicPlatform {
        get { MusicPlatform(rawValue: preferredPlatformRaw) ?? .spotify }
        set { preferredPlatformRaw = newValue.rawValue }
    }
    
    var lastUsedPlatform: MusicPlatform? {
        get { 
            guard let raw = lastUsedPlatformRaw else { return nil }
            return MusicPlatform(rawValue: raw) 
        }
        set { lastUsedPlatformRaw = newValue?.rawValue }
    }
    
    static let `default` = UserPreferences(
        preferredPlatformRaw: "spotify",
        lastUsedPlatformRaw: nil
    )
}