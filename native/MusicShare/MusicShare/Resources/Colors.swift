import SwiftUI

extension Color {
    static let musicShareBlue = Color(red: 0.0, green: 0.48, blue: 1.0)
    static let musicShareGreen = Color(red: 0.11, green: 0.73, blue: 0.33)
    static let musicShareRed = Color(red: 0.98, green: 0.14, blue: 0.24)
    static let musicShareOrange = Color(red: 1.0, green: 0.6, blue: 0.0)
    static let musicSharePurple = Color(red: 0.6, green: 0.0, blue: 1.0)
    
    static let spotifyGreen = Color(hex: "1DB954")
    static let appleRed = Color(hex: "FA243C")
    static let youtubeRed = Color(hex: "FF0000")
    static let amazonBlue = Color(hex: "00A8E1")
    static let googleGreen = Color(hex: "34A853")
    static let pandoraBlue = Color(hex: "005483")
    static let deezerRed = Color(hex: "E51E24")
    static let tidalBlack = Color(hex: "000000")
    static let soundcloudOrange = Color(hex: "FF5500")
    static let napsterRed = Color(hex: "C5362A")
    static let yandexYellow = Color(hex: "FFCC00")
    static let boomplayRed = Color(hex: "FE2721")
    static let bandcampTeal = Color(hex: "1DA0C3")
}

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3:
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6:
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8:
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }
        
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

extension MusicPlatform {
    var color: Color {
        switch self {
        case .spotify: return .spotifyGreen
        case .appleMusic, .itunes: return .appleRed
        case .youtube, .youtubeMusic: return .youtubeRed
        case .amazonMusic: return .amazonBlue
        case .amazonStore: return .musicShareOrange
        case .googlePlay: return .googleGreen
        case .pandora: return .pandoraBlue
        case .deezer: return .deezerRed
        case .tidal: return .tidalBlack
        case .soundcloud: return .soundcloudOrange
        case .napster: return .napsterRed
        case .yandex: return .yandexYellow
        case .audius: return .tidalBlack
        case .audiomack: return .musicShareOrange
        case .anghami: return .yandexYellow
        case .boomplay: return .boomplayRed
        case .bandcamp: return .bandcampTeal
        }
    }
}