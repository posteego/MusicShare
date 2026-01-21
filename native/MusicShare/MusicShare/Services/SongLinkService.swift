import Foundation

enum SongLinkError: Error, LocalizedError {
    case invalidURL
    case unsupportedPlatform
    case networkError(String)
    case apiError(String)
    case noConversionAvailable
    case decodingError
    
    var errorDescription: String? {
        switch self {
        case .invalidURL:
            return "The URL you provided is not valid."
        case .unsupportedPlatform:
            return "This music platform is not supported."
        case .networkError(let message):
            return "Network error: \(message)"
        case .apiError(let message):
            return "API error: \(message)"
        case .noConversionAvailable:
            return "No conversion available for this URL."
        case .decodingError:
            return "Failed to process the response."
        }
    }
}

// MARK: - Odesli API Response Models
struct OdesliResponse: Codable {
    let entityUniqueId: String?
    let userCountry: String?
    let pageUrl: String?
    let linksByPlatform: [String: PlatformLink]?
    let entitiesByUniqueId: [String: EntityInfo]?
}

struct PlatformLink: Codable {
    let country: String?
    let url: String?
    let entityUniqueId: String?
    let nativeAppUriMobile: String?
    let nativeAppUriDesktop: String?
}

struct EntityInfo: Codable {
    let id: String?
    let type: String?
    let title: String?
    let artistName: String?
    let thumbnailUrl: String?
    let thumbnailWidth: Int?
    let thumbnailHeight: Int?
    let apiProvider: String?
    let platforms: [String]?
}

class SongLinkService {
    static let shared = SongLinkService()
    private let baseURL = "https://api.song.link/v1-alpha.1/links"
    
    private init() {}
    
    func detectPlatform(from url: String) -> MusicPlatform? {
        return MusicPlatform.fromURL(url)
    }
    
    func convertURL(_ originalURL: String, to targetPlatform: MusicPlatform) async throws -> SongLink {
        let sourcePlatform = try detectPlatformOrThrow(from: originalURL)
        
        guard let encodedURL = originalURL.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) else {
            throw SongLinkError.invalidURL
        }
        
        let urlString = "\(baseURL)?url=\(encodedURL)"
        
        guard let url = URL(string: urlString) else {
            throw SongLinkError.invalidURL
        }
        
        do {
            var request = URLRequest(url: url)
            request.httpMethod = "GET"
            request.setValue("application/json", forHTTPHeaderField: "Accept")
            
            let (data, response) = try await URLSession.shared.data(for: request)
            
            guard let httpResponse = response as? HTTPURLResponse else {
                throw SongLinkError.networkError("Invalid response")
            }
            
            guard httpResponse.statusCode == 200 else {
                // Try to parse error message from response
                if let errorString = String(data: data, encoding: .utf8) {
                    throw SongLinkError.apiError("HTTP \(httpResponse.statusCode): \(errorString)")
                }
                throw SongLinkError.apiError("HTTP \(httpResponse.statusCode)")
            }
            
            let decoder = JSONDecoder()
            let odesliResponse = try decoder.decode(OdesliResponse.self, from: data)
            
            let convertedURL = try extractConvertedURL(from: odesliResponse, for: targetPlatform)
            let (songName, artist, thumbnail) = extractSongMetadata(from: odesliResponse)
            
            return SongLink(
                originalURL: originalURL,
                convertedURL: convertedURL,
                sourcePlatformRaw: sourcePlatform.rawValue,
                targetPlatformRaw: targetPlatform.rawValue,
                songName: songName,
                artist: artist,
                thumbnail: thumbnail
            )
            
        } catch let error as SongLinkError {
            throw error
        } catch let decodingError as DecodingError {
            print("Decoding error: \(decodingError)")
            throw SongLinkError.networkError("the data couldn't be read because it isn't in the correct format.")
        } catch {
            throw SongLinkError.networkError(error.localizedDescription)
        }
    }
    
    private func detectPlatformOrThrow(from url: String) throws -> MusicPlatform {
        guard !url.isEmpty else { throw SongLinkError.invalidURL }
        
        guard let platform = MusicPlatform.fromURL(url) else {
            throw SongLinkError.unsupportedPlatform
        }
        
        return platform
    }
    
    private func extractConvertedURL(from response: OdesliResponse, for platform: MusicPlatform) throws -> String {
        // First try to get the specific platform URL
        if let linksByPlatform = response.linksByPlatform,
           let platformLink = linksByPlatform[platform.apiKey],
           let url = platformLink.url {
            return url
        }
        
        // Fall back to the generic page URL
        if let pageUrl = response.pageUrl {
            return pageUrl
        }
        
        throw SongLinkError.noConversionAvailable
    }
    
    private func extractSongMetadata(from response: OdesliResponse) -> (String?, String?, String?) {
        // Get metadata from the first entity
        guard let entitiesByUniqueId = response.entitiesByUniqueId,
              let firstEntity = entitiesByUniqueId.values.first else {
            return (nil, nil, nil)
        }
        
        return (firstEntity.title, firstEntity.artistName, firstEntity.thumbnailUrl)
    }
    
    func validateURL(_ url: String) -> Bool {
        guard let urlObject = URL(string: url) else { return false }
        return urlObject.scheme == "http" || urlObject.scheme == "https"
    }
}
