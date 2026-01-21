//
//  SongLink.swift
//  MessagesExtension
//
//  Shared model for song links
//

import Foundation

struct SongLink: Codable, Identifiable {
    let id: String
    let entityId: String?
    let userCountry: String?
    let pageUrl: String
    let urlByPlatform: [String: PlatformURL]
    let entitiesByUniqueId: [String: SongEntity]?
    let providerName: String?
    
    struct PlatformURL: Codable {
        let url: String
        let entityUniqueId: String?
        
        enum CodingKeys: String, CodingKey {
            case url
            case entityUniqueId = "entityUniqueId"
        }
    }
    
    struct SongEntity: Codable {
        let id: String
        let type: String
        let title: String?
        let artistName: String?
        let thumbnailUrl: String?
        let thumbnailWidth: Int?
        let thumbnailHeight: Int?
        let apiProvider: String?
        let platforms: [String: PlatformInfo]
        
        struct PlatformInfo: Codable {
            let entityUniqueId: String?
            let catalog: String?
            let id: String
        }
    }
}

// Simplified version for Messages extension usage
struct SongPreview: Equatable {
    let id: String
    let title: String
    let artist: String
    let thumbnailUrl: String?
    let originalUrl: String
    let availablePlatforms: [MusicPlatform]
    let songLink: SongLink?
    
    static func == (lhs: SongPreview, rhs: SongPreview) -> Bool {
        lhs.id == rhs.id
    }
}