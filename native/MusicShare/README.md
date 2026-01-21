# MusicShare - Native iOS Migration

## Overview
This is the native iOS version of MusicShare, converted from React Native to SwiftUI for iOS 17+.

## Features
- **Music Link Conversion**: Convert music URLs between 18 different streaming platforms
- **Platform Detection**: Automatically detects the source platform from any music URL
- **Clipboard Integration**: Auto-copy converted URLs to clipboard
- **Conversion History**: Track and manage your conversion history
- **Settings & Preferences**: Customize default platform and app behavior
- **Native Performance**: Fully native iOS app with SwiftUI and SwiftData

## Supported Platforms
- Spotify, Apple Music, iTunes
- YouTube, YouTube Music
- Amazon Music, Amazon Store
- Google Play Store, Pandora
- Deezer, Tidal, SoundCloud
- Napster, Yandex, Audius
- Audiomack, Anghami, Boomplay, Bandcamp

## Technical Architecture

### Framework & Target
- **UI Framework**: SwiftUI (iOS 17+)
- **Architecture**: MVVM (Model-View-ViewModel)
- **Data Persistence**: SwiftData
- **Networking**: URLSession with async/await

### Project Structure
```
MusicShare/
├── Models/
│   ├── MusicPlatform.swift      # Enum with 18 platforms
│   ├── SongLink.swift           # Data models
│   └── SongLinkEntity.swift     # SwiftData model
├── Views/
│   ├── ContentView.swift        # Main TabView
│   ├── HomeView.swift           # Main conversion interface
│   ├── SettingsView.swift       # App settings
│   ├── PlatformSelectorView.swift
│   ├── ResultView.swift
│   └── HistoryView.swift
├── ViewModels/
│   └── AnimationHelper.swift   # Animation utilities
├── Services/
│   ├── SongLinkService.swift    # API integration with song.link
│   ├── ClipboardService.swift   # Clipboard management
│   └── StorageService.swift     # Data persistence
└── Resources/
    └── Colors.swift             # App colors and theming
```

### Key Components

#### MusicPlatform Enum
- 18 supported streaming platforms
- URL detection logic
- Display properties (names, icons, colors)

#### SongLinkService
- Integration with song.link API
- URL validation and conversion
- Error handling and metadata extraction

#### StorageService
- SwiftData integration for persistence
- User preferences management
- Conversion history tracking

## Migration Notes

### From React Native to Native iOS
- **Navigation**: Tab-based navigation replaced React Navigation
- **State Management**: Replaced Zustand + MMKV with SwiftData + UserDefaults
- **UI Components**: Custom SwiftUI views replace React Native components
- **Animations**: Native SwiftUI animations replace Reanimated
- **Clipboard**: UIPasteboard replaces React Native Clipboard

### API Integration
- Uses song.link API for URL conversion
- Handles 18 different streaming platforms
- Automatic platform detection from URLs
- Metadata extraction (song name, artist, thumbnail)

### Performance Improvements
- Native SwiftUI performance vs JavaScript bridge
- SwiftData for efficient local storage
- Native animations and transitions
- Better memory management

## Build & Run

### Requirements
- Xcode 15+
- iOS 17.0+
- Swift 5.9+

### Setup
1. Open `MusicShare.xcodeproj` in Xcode
2. Select your development team
3. Build and run on simulator or device

### Configuration
- Bundle ID: `com.vibewrks.MusicShare`
- Deployment Target: iOS 17.0+
- Supported Devices: Universal (iPhone/iPad)

## Future Enhancements
- Widgets for quick access
- Siri integration for voice commands
- Share Sheet extension for other apps
- Apple Watch companion app

## API Credits
Powered by [Odesli.co (song.link)](https://odesli.co) for music link conversion.