import Foundation

enum MusicPlatform: String, CaseIterable, Identifiable, Codable {
    case spotify = "spotify"
    case appleMusic = "appleMusic"
    case itunes = "itunes"
    case youtube = "youtube"
    case youtubeMusic = "youtubeMusic"
    case amazonMusic = "amazonMusic"
    case amazonStore = "amazonStore"
    case googlePlay = "googlePlay"
    case pandora = "pandora"
    case deezer = "deezer"
    case tidal = "tidal"
    case soundcloud = "soundcloud"
    case napster = "napster"
    case yandex = "yandex"
    case audius = "audius"
    case audiomack = "audiomack"
    case anghami = "anghami"
    case boomplay = "boomplay"
    case bandcamp = "bandcamp"
    
    var id: String { rawValue }
    
    var displayName: String {
        switch self {
        case .spotify: return "Spotify"
        case .appleMusic: return "Apple Music"
        case .itunes: return "iTunes"
        case .youtube: return "YouTube"
        case .youtubeMusic: return "YouTube Music"
        case .amazonMusic: return "Amazon Music"
        case .amazonStore: return "Amazon Store"
        case .googlePlay: return "Google Play"
        case .pandora: return "Pandora"
        case .deezer: return "Deezer"
        case .tidal: return "Tidal"
        case .soundcloud: return "SoundCloud"
        case .napster: return "Napster"
        case .yandex: return "Yandex"
        case .audius: return "Audius"
        case .audiomack: return "Audiomack"
        case .anghami: return "Anghami"
        case .boomplay: return "Boomplay"
        case .bandcamp: return "Bandcamp"
        }
    }
    
    var iconName: String {
        switch self {
        case .spotify: return "music.note"
        case .appleMusic: return "applelogo"
        case .itunes: return "music.note.list"
        case .youtube: return "play.rectangle.fill"
        case .youtubeMusic: return "music.note.tv"
        case .amazonMusic: return "music.quarternote.3"
        case .amazonStore: return "bag.fill"
        case .googlePlay: return "play.circle.fill"
        case .pandora: return "radio.fill"
        case .deezer: return "waveform"
        case .tidal: return "water.waves"
        case .soundcloud: return "cloud.fill"
        case .napster: return "headphones"
        case .yandex: return "globe"
        case .audius: return "waveform.circle.fill"
        case .audiomack: return "speaker.wave.3.fill"
        case .anghami: return "music.mic"
        case .boomplay: return "play.fill"
        case .bandcamp: return "music.note.house.fill"
        }
    }
    
    /// The key used in the Odesli/song.link API response
    var apiKey: String {
        switch self {
        case .spotify: return "spotify"
        case .appleMusic: return "appleMusic"
        case .itunes: return "itunes"
        case .youtube: return "youtube"
        case .youtubeMusic: return "youtubeMusic"
        case .amazonMusic: return "amazonMusic"
        case .amazonStore: return "amazonStore"
        case .googlePlay: return "google"
        case .pandora: return "pandora"
        case .deezer: return "deezer"
        case .tidal: return "tidal"
        case .soundcloud: return "soundcloud"
        case .napster: return "napster"
        case .yandex: return "yandex"
        case .audius: return "audius"
        case .audiomack: return "audiomack"
        case .anghami: return "anghami"
        case .boomplay: return "boomplay"
        case .bandcamp: return "bandcamp"
        }
    }
    
    var domain: String {
        switch self {
        case .spotify: return "spotify.com"
        case .appleMusic: return "music.apple.com"
        case .itunes: return "itunes.apple.com"
        case .youtube: return "youtube.com"
        case .youtubeMusic: return "music.youtube.com"
        case .amazonMusic: return "music.amazon.com"
        case .amazonStore: return "amazon.com"
        case .googlePlay: return "play.google.com"
        case .pandora: return "pandora.com"
        case .deezer: return "deezer.com"
        case .tidal: return "tidal.com"
        case .soundcloud: return "soundcloud.com"
        case .napster: return "napster.com"
        case .yandex: return "music.yandex.ru"
        case .audius: return "audius.co"
        case .audiomack: return "audiomack.com"
        case .anghami: return "anghami.com"
        case .boomplay: return "boomplay.com"
        case .bandcamp: return "bandcamp.com"
        }
    }
    
    static func fromURL(_ url: String) -> MusicPlatform? {
        let lowercaseURL = url.lowercased()
        
        for platform in MusicPlatform.allCases {
            if lowercaseURL.contains(platform.domain.lowercased()) {
                return platform
            }
        }
        
        return nil
    }
}