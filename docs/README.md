# Remin - Technical Overview

> 여행 사진 큐레이션 앱 for iOS/iPadOS

## Architecture

### 4-Level Smart Clustering

Remin uses a unique 4-level hierarchical clustering system (the only one among competing products):

1. **Temporal Clustering** - Groups photos within 30-minute windows
2. **GPS Clustering** - DBSCAN algorithm for location-based grouping
3. **Visual Similarity** - Vision Framework feature vectors (0.3 threshold)
4. **Quality Scoring** - Automated best shot selection

### On-Device AI Processing

100% privacy-first approach with zero cloud uploads:

- **Vision Framework**: 1,000+ scene classifications (beach, mountain, sunset, food, etc.)
- **CoreML**: Neural Engine optimized for battery efficiency
- **Face Detection**: VNDetectFaceRectanglesRequest for quality scoring

Performance: 2,000 photos analyzed in ~3 minutes, 0.2s/photo inference

### Discovery Engine

Protocol-Oriented Rule Registry pattern for extensible search:

```swift
protocol DiscoveryRule: Sendable {
    func canHandle(_ query: DiscoveryQuery) async -> Bool
    func evaluate(query: DiscoveryQuery, photos: [Photo]) async -> [DiscoveryMatch]
}
```

**Multi-Signal Ranking**:
- Scene classification: 40%
- Temporal relevance: 30%
- Quality score: 20%
- Face detection: 10%

### Video Generation

Native AVFoundation implementation without 3rd party SDKs:

- **Photo/Video/Live Photo mixing**: Unified MediaContext handling
- **Ken Burns effect**: Automated pan & zoom for static images
- **Transitions**: Cross-fade, dissolve, push (configurable)
- **Live Photo extraction**: PHAssetResource paired video support

## Tech Stack

| Category | Technology |
|----------|------------|
| Language | Swift 6.0+ (strict concurrency) |
| UI | SwiftUI |
| Data | SwiftData |
| Photos | PhotoKit |
| AI/ML | Vision Framework, CoreML |
| Maps | MapKit |
| Video | AVFoundation |

## Platform Requirements

- iOS 26+ / iPadOS 26+
- macOS: Designed for iPad (compatibility mode)

## Privacy

All AI processing happens **entirely on-device**:

- No cloud uploads
- No external API calls for photo analysis
- All data stored locally in SwiftData
- GPS interpolation requires explicit user approval

## Key Technical Decisions

### UX Architecture
Phase-Based Modal flow instead of NavigationStack to avoid state loops:
- Processing → Celebration → Activities flow managed by enum state
- FullScreenCover for clear entry/exit points

### Swift 6.0 Concurrency
`@preconcurrency import` for AVFoundation/Photos compatibility with strict sendable checking.

---

**App Store**: [Remin on App Store](https://apps.apple.com/us/app/remin/id6755936363)

**Support**: [support.html](support.html) | **Privacy**: [privacy.html](privacy.html)
