import Foundation

/// Service for sharing data between the main app and iMessage extension via App Groups
final class SharedDataService {
    static let shared = SharedDataService()
    
    private let appGroupIdentifier = "group.vibewrks.musicshare"
    private let pendingLinkKey = "pendingShareLink"
    private let pendingLinkMetadataKey = "pendingShareLinkMetadata"
    
    private var sharedDefaults: UserDefaults? {
        UserDefaults(suiteName: appGroupIdentifier)
    }
    
    private init() {}
    
    // MARK: - Pending Share Link
    
    /// Save a link to be shared via iMessage extension
    /// - Parameters:
    ///   - url: The converted music URL to share
    ///   - metadata: Optional metadata (title, artist, thumbnail URL)
    func savePendingShareLink(_ url: String, metadata: ShareLinkMetadata? = nil) {
        sharedDefaults?.set(url, forKey: pendingLinkKey)
        
        if let metadata = metadata {
            let encoded = try? JSONEncoder().encode(metadata)
            sharedDefaults?.set(encoded, forKey: pendingLinkMetadataKey)
        }
        
        sharedDefaults?.synchronize()
    }
    
    /// Retrieve and clear the pending share link
    /// - Returns: The pending URL if one exists
    func consumePendingShareLink() -> (url: String, metadata: ShareLinkMetadata?)? {
        guard let url = sharedDefaults?.string(forKey: pendingLinkKey) else {
            return nil
        }
        
        var metadata: ShareLinkMetadata?
        if let data = sharedDefaults?.data(forKey: pendingLinkMetadataKey) {
            metadata = try? JSONDecoder().decode(ShareLinkMetadata.self, from: data)
        }
        
        // Clear after reading
        clearPendingShareLink()
        
        return (url, metadata)
    }
    
    /// Check if there's a pending share link without consuming it
    func hasPendingShareLink() -> Bool {
        return sharedDefaults?.string(forKey: pendingLinkKey) != nil
    }
    
    /// Clear the pending share link
    func clearPendingShareLink() {
        sharedDefaults?.removeObject(forKey: pendingLinkKey)
        sharedDefaults?.removeObject(forKey: pendingLinkMetadataKey)
        sharedDefaults?.synchronize()
    }
}

// MARK: - Supporting Types

struct ShareLinkMetadata: Codable {
    let title: String?
    let artist: String?
    let thumbnailUrl: String?
    let platformName: String?
}
