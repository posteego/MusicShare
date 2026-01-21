import Foundation
import SwiftData

@Model
final class SongLinkEntity {
    var id: UUID = UUID()
    var originalURL: String = ""
    var convertedURL: String = ""
    var sourcePlatformRaw: String = ""
    var targetPlatformRaw: String = ""
    var timestamp: Date = Date()
    var songName: String?
    var artist: String?
    var thumbnail: String?
    var isFavorite: Bool = false
    
    init(
        originalURL: String,
        convertedURL: String,
        sourcePlatform: String,
        targetPlatform: String,
        songName: String? = nil,
        artist: String? = nil,
        thumbnail: String? = nil,
        isFavorite: Bool = false
    ) {
        self.id = UUID()
        self.originalURL = originalURL
        self.convertedURL = convertedURL
        self.sourcePlatformRaw = sourcePlatform
        self.targetPlatformRaw = targetPlatform
        self.timestamp = Date()
        self.songName = songName
        self.artist = artist
        self.thumbnail = thumbnail
        self.isFavorite = isFavorite
    }
    
    var sourcePlatform: MusicPlatform {
        get { MusicPlatform(rawValue: sourcePlatformRaw) ?? .spotify }
        set { sourcePlatformRaw = newValue.rawValue }
    }
    
    var targetPlatform: MusicPlatform {
        get { MusicPlatform(rawValue: targetPlatformRaw) ?? .spotify }
        set { targetPlatformRaw = newValue.rawValue }
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
