//
//  SongLinkService.swift
//  MessagesExtension
//
//  Shared service for song link conversion (lightweight version for Messages)
//

import Foundation
import Combine

class SongLinkService: ObservableObject {
    static let shared = SongLinkService()
    
    private let baseURL = "https://api.song.link/v1-alpha.1/links"
    private let session = URLSession.shared
    
    private init() {}
    
    func convertSongLink(_ url: String) async throws -> SongLink {
        guard isValidMusicURL(url) else {
            throw SongLinkError.invalidURL
        }
        
        let encodedURL = url.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? url
        let urlString = "\(baseURL)?url=\(encodedURL)&userCountry=US"
        
        guard let requestURL = URL(string: urlString) else {
            throw SongLinkError.invalidURL
        }
        
        let (data, response) = try await session.data(from: requestURL)
        
        guard let httpResponse = response as? HTTPURLResponse else {
            throw SongLinkError.networkError
        }
        
        guard httpResponse.statusCode == 200 else {
            throw SongLinkError.apiError(statusCode: httpResponse.statusCode)
        }
        
        do {
            let songLink = try JSONDecoder().decode(SongLink.self, from: data)
            return songLink
        } catch {
            throw SongLinkError.decodingError
        }
    }
    
    func detectPlatform(from url: String) -> MusicPlatform? {
        for platform in MusicPlatform.allCases {
            for pattern in platform.domainPatterns {
                if url.lowercased().contains(pattern.lowercased()) {
                    return platform
                }
            }
        }
        return nil
    }
    
    private func isValidMusicURL(_ url: String) -> Bool {
        guard let urlComponents = URLComponents(string: url),
              let scheme = urlComponents.scheme,
              let host = urlComponents.host else {
            return false
        }
        
        return ["http", "https"].contains(scheme) && 
               MusicPlatform.allCases.contains { platform in
                   platform.domainPatterns.contains { pattern in
                       host.lowercased().contains(pattern.lowercased())
                   }
               }
    }
    
    func createSongPreview(from songLink: SongLink, originalURL: String) -> SongPreview {
        let availablePlatforms = songLink.urlByPlatform.compactMap { (key, _) in
            MusicPlatform(rawValue: key)
        }
        
        let entity = songLink.entitiesByUniqueId?.values.first
        
        return SongPreview(
            id: songLink.id,
            title: entity?.title ?? "Unknown Title",
            artist: entity?.artistName ?? "Unknown Artist",
            thumbnailUrl: entity?.thumbnailUrl,
            originalUrl: originalURL,
            availablePlatforms: availablePlatforms,
            songLink: songLink
        )
    }
}

enum SongLinkError: LocalizedError {
    case invalidURL
    case networkError
    case apiError(statusCode: Int)
    case decodingError
    case unsupportedPlatform
    
    var errorDescription: String? {
        switch self {
        case .invalidURL:
            return "Please enter a valid music URL"
        case .networkError:
            return "Network error. Please check your connection and try again."
        case .apiError(let statusCode):
            switch statusCode {
            case 400:
                return "Invalid URL format"
            case 404:
                return "Song not found"
            case 429:
                return "Too many requests. Please try again later."
            default:
                return "Server error. Please try again."
            }
        case .decodingError:
            return "Error processing response. Please try again."
        case .unsupportedPlatform:
            return "This music platform is not supported"
        }
    }
}