//
//  MusicPlatform.swift
//  MessagesExtension
//
//  Shared model for streaming platforms
//

import Foundation

enum MusicPlatform: String, CaseIterable, Codable {
    case spotify = "spotify"
    case appleMusic = "apple"
    case youtube = "youtube"
    case youtubeMusic = "youtubeMusic"
    case tidal = "tidal"
    case soundcloud = "soundcloud"
    case deezer = "deezer"
    case amazonMusic = "amazon"
    case napster = "napster"
    case pandora = "pandora"
    case bandcamp = "bandcamp"
    case audiomack = "audiomack"
    case beatport = "beatport"
    case mixcloud = "mixcloud"
    case anghami = "anghami"
    case boomplay = "boomplay"
    case jiosaavn = "jiosaavn"
    
    var displayName: String {
        switch self {
        case .spotify: return "Spotify"
        case .appleMusic: return "Apple Music"
        case .youtube: return "YouTube"
        case .youtubeMusic: return "YouTube Music"
        case .tidal: return "Tidal"
        case .soundcloud: return "SoundCloud"
        case .deezer: return "Deezer"
        case .amazonMusic: return "Amazon Music"
        case .napster: return "Napster"
        case .pandora: return "Pandora"
        case .bandcamp: return "Bandcamp"
        case .audiomack: return "Audiomack"
        case .beatport: return "Beatport"
        case .mixcloud: return "Mixcloud"
        case .anghami: return "Anghami"
        case .boomplay: return "Boomplay"
        case .jiosaavn: return "JioSaavn"
        }
    }
    
    var iconName: String {
        switch self {
        case .spotify: return "music.note.list"
        case .appleMusic: return "music.note"
        case .youtubeMusic, .youtube: return "play.rectangle"
        case .tidal: return "waveform"
        case .soundcloud: return "cloud.fill"
        case .deezer: return "speaker.wave.2"
        case .amazonMusic: return "cart"
        case .napster: return "headphones"
        case .pandora: return "radio"
        case .bandcamp: return "guitars.fill"
        case .audiomack: return "headphones.circle"
        case .beatport: return "record.circle"
        case .mixcloud: return "cloud.rain"
        case .anghami: return "music.quarternote.3"
        case .boomplay: return "play.circle"
        case .jiosaavn: return "b.circle"
        }
    }
    
    var domainPatterns: [String] {
        switch self {
        case .spotify:
            return ["open.spotify.com", "spotify.com"]
        case .appleMusic:
            return ["music.apple.com", "itunes.apple.com"]
        case .youtubeMusic:
            return ["youtube.com", "youtu.be"]
        case .youtube:
            return ["music.youtube.com"]
        case .tidal:
            return ["tidal.com", "listen.tidal.com"]
        case .soundcloud:
            return ["soundcloud.com"]
        case .deezer:
            return ["deezer.com"]
        case .amazonMusic:
            return ["music.amazon.com", "amazon.com/music"]
        case .napster:
            return ["napster.com"]
        case .pandora:
            return ["pandora.com"]
        case .bandcamp:
            return ["bandcamp.com"]
        case .audiomack:
            return ["audiomack.com"]
        case .beatport:
            return ["beatport.com"]
        case .mixcloud:
            return ["mixcloud.com"]
        case .anghami:
            return ["anghami.com"]
        case .boomplay:
            return ["boomplay.com"]
        case .jiosaavn:
            return ["jiosaavn.com", "saavn.com"]
        }
    }
}