# Remin 구현 분석 & App Store 업로드 준비

이 문서는 현재 `Remin` 저장소 기준으로:
1) 구현된 기능/아키텍처를 요약하고  
2) App Store(주로 iOS) 업로드/심사에 필요한 준비사항과 레포 기준 갭을 정리합니다.

---

## 1) 앱 개요 (현재 구현 기준)

- **타깃**: SwiftUI 기반 멀티플랫폼(단일 타깃) 구성으로 보이며, Xcode 설정상 `iphoneos/macosx/xros`까지 `SUPPORTED_PLATFORMS`에 포함되어 있습니다.  
  - 설정: `Remin.xcodeproj/project.pbxproj` (`SUPPORTED_PLATFORMS`)
- **핵심 컨셉**: Photos 라이브러리의 여행 사진을 “세션(Session) → 활동(Activity) → 장소(Location) → 비주얼 그룹(VisualGroup)”로 정리하고, 검색(Discovery) 및 콘텐츠 생성(달력/포토북/프레임/비디오)을 제공합니다.
- **온디바이스 처리 중심**: PhotoKit/Vision/CoreML(SemanticEmbedding) 기반 분석과 SwiftData 로컬 저장이 중심입니다.

---

## 2) 사용자 플로우(큰 흐름)

1. **Photos 권한 요청/앨범 로드**
   - `Remin/Core/Services/PhotoLibraryService.swift`
2. **앨범 선택 → 세션 생성**
   - UI: `Remin/Features/AlbumSelection/*`
   - 모델: `Remin/Core/Models/CurationSession.swift`
3. **백그라운드 분석(세션 처리)**
   - 오케스트레이션: `Remin/Core/Services/SessionProcessingService.swift`
   - 파이프라인: `Remin/Core/Clustering/ClusteringPipeline.swift`
   - 캐시: `Remin/Core/Services/AnalysisCacheService.swift`
4. **결과 탐색/리뷰**
   - 활동 뷰: `Remin/Features/Activities/ActivitiesView.swift`
   - 리뷰 뷰: `Remin/Features/Review/ReviewView.swift`
5. **Discovery(자연어 검색)**
   - `Remin/Core/Discovery/*`
6. **콘텐츠 생성**
   - 비디오 생성: `Remin/Features/VideoGeneration/*`, `Remin/Core/Services/VideoGenerationCoordinator.swift`, `Remin/Core/Services/VideoGenerationService.swift`
   - 달력: `Remin/Features/CalendarCreator/*`, `Remin/Core/Services/CalendarExportService.swift`
   - 스토리(HTML 등): `Remin/Core/Services/StoryHTMLExportService.swift`
7. **여정 자동 감지/추천**
   - `Remin/Features/JourneyDiscovery/*`
   - `Remin/Core/Services/LibraryEventDetectionService.swift`
   - `Remin/Core/Services/TravelRecommendationService.swift`

---

## 3) 아키텍처 요약 (디렉터리 관점)

- `Remin/App/`
  - 앱 엔트리 및 루트 UI/오버레이: `Remin/App/ReminApp.swift`
- `Remin/Core/Models/`
  - SwiftData 모델(세션/활동/사진/컬렉션/비디오 상태 등)
- `Remin/Core/Services/`
  - PhotoKit/분석/캐시/생성/검색 등 “도메인 서비스” 모음
- `Remin/Core/Clustering/`
  - 4단계 계층 클러스터링 알고리즘/파이프라인
- `Remin/Core/Discovery/`
  - Query 파싱 → 규칙 평가 → 결과 집계/랭킹
- `Remin/Features/`
  - SwiftUI 화면 단위 기능 모듈
- `Remin/Design/`
  - 테마/컴포넌트/기능 게이팅(Apple Intelligence 등)

---

## 4) 처리 파이프라인(세션 분석) 핵심

`Remin/Core/Services/SessionProcessingService.swift` → `Remin/Core/Clustering/ClusteringPipeline.swift` 흐름으로 동작합니다.

- **메타데이터 추출**: `PHAsset`에서 촬영시각/GPS 등 추출
- **Vision 분석**: 장면/얼굴/FeaturePrint 등(캐시 지원)
- **품질 분석**: Vision Aesthetics API 기반(캐시 지원)
- **시맨틱 임베딩(Optional)**: MobileCLIP(CoreML)로 임베딩 생성 및 유사도 점수 활용
  - 모델 리소스: `Remin/Resources/MobileCLIP_*Encoder.mlpackage`, `Remin/Resources/vocab.json`, `Remin/Resources/merges.txt`
- **클러스터링**:
  - Level 1 시간(Temporal)
  - Level 2 GPS(DBSCAN)
  - Level 3 시각 유사도
  - Level 4 대표 사진 선택

---

## 5) Discovery(자연어 검색) 구조

- 진입점: `Remin/Core/Discovery/DiscoveryEngine/DiscoveryService.swift`
- Query 파싱: `Remin/Core/Discovery/DiscoveryEngine/SemanticQueryParser.swift`
- 규칙 레지스트리/규칙들: `Remin/Core/Discovery/Rules/*`
- 결과는 규칙별 매칭을 집계하고 다양성 필터를 적용한 뒤 상위 N개를 반환합니다.

---

## 6) 권한/프라이버시(레포 기준 현황)

### 권한 문자열(Info.plist)
- Photos 접근: 필요
  - `NSPhotoLibraryUsageDescription`
  - `NSPhotoLibraryAddUsageDescription`
- 백그라운드 처리(BGTaskScheduler): 코드 사용 중
  - 식별자: `com.remin.photo-processing` (`Remin/Core/Services/BackgroundTaskService.swift`)

### Privacy Manifest
- `Remin/PrivacyInfo.xcprivacy` 존재
  - Tracking: `false`
  - CollectedDataTypes: Photos/Videos(앱 기능 목적)
  - Required Reason API: UserDefaults, FileTimestamp

---

## 7) App Store 업로드 준비 체크리스트 (실무용)

### A. App Store Connect/계정
- Apple Developer Program 등록(조직/개인)
- App Store Connect에서 앱 생성(플랫폼 iOS 기준)
- Bundle ID/App ID 생성 및 앱명/서브타이틀/카테고리/연령등급 설정

### B. Xcode 프로젝트/서명/버전
- `PRODUCT_BUNDLE_IDENTIFIER` 확정 및 중복 없는 값 사용
- `MARKETING_VERSION`(예: 1.0.0), `CURRENT_PROJECT_VERSION`(예: 1) 관리
- Release 설정으로 Archive 가능해야 함(코드사인/프로비저닝/팀 설정)

### C. 권한/백그라운드/기기 지원
- Photos 권한 거부/제한(“제한된 사진” 포함) 시 UX가 깨지지 않는지 확인
- BGTaskScheduler 사용 시:
  - Info.plist에 `BGTaskSchedulerPermittedIdentifiers` 포함
  - Info.plist에 `UIBackgroundModes = processing` 포함
  - 실제로 백그라운드에서 실행되는 작업이 사용자 가치/설명 가능해야 함(심사 메모에 설명 권장)

### D. 프라이버시/정책/심사 대응
- App Store Connect의 **App Privacy 설문** 작성(실제 동작과 일치해야 함)
- Privacy Policy URL/Support URL 준비(웹에 호스팅 필요)
  - (권장) GitHub Pages로 `privacy.html`, `support.html` 제공
  - 템플릿(이 레포): `docs/privacy.html`, `docs/support.html`
  - 예시(리포 이름이 `remin-support`인 경우):
    - Support URL: `https://puritysb.github.io/remin-support/`
    - Privacy Policy URL: `https://puritysb.github.io/remin-support/privacy.html`
- (해당 시) “데이터 삭제/세션 삭제” 경로 명확히 제공
- (해당 시) 서드파티 모델/데이터 파일(MobileCLIP, vocab/merges 등) 라이선스/출처 정리 및 고지 문서 준비(권장)

### E. 메타데이터/에셋
- 앱 아이콘, 스크린샷(iPhone/iPad), 앱 미리보기(선택)
- 기능 설명/키워드/프로모션 텍스트/리뷰 노트(특히 Photos 접근, 백그라운드 분석, iCloud 사진 처리 여부)

### F. 배포 플로우
- Xcode: Archive → Validate → Distribute(App Store Connect)
- TestFlight 내부/외부 테스트
- 최종 제출 및 심사 대응(리뷰 노트/테스트 계정 필요 여부 등)

---

## 8) 레포 기준 “업로드 전” 확인/수정이 필요한 지점(중요)

아래는 “지금 상태 그대로 App Store 업로드”를 가로막을 가능성이 높은 항목들입니다.

1. **iOS 전용 배포 설정 정리**
   - iOS 전용 릴리즈 기준:
     - `SUPPORTED_PLATFORMS = "iphoneos iphonesimulator"`
     - `IPHONEOS_DEPLOYMENT_TARGET = 26.0`
     - `TARGETED_DEVICE_FAMILY = "1,2"` (iPhone/iPad)
   - 설정: `Remin.xcodeproj/project.pbxproj`

2. **Info.plist 반영 방식**
   - iOS 전용 릴리즈 기준으로 `INFOPLIST_FILE = Remin/Info.plist`를 사용하도록 정리했습니다.
   - BGTask/BackgroundModes/Photos/Location 문자열은 `Remin/Info.plist`에 선언되어야 합니다.

3. **entitlements 정리**
   - macOS App Sandbox 키를 포함한 `Remin/Remin.entitlements`는 iOS 제출에 필요하지 않으므로 iOS 전용 릴리즈에서는 사용하지 않는 편이 안전합니다.

4. **Foundation Models(Apple Intelligence) 사용 조건(availability/import) 정리 필요**
   - 여러 파일에서 `iOS 26` 기준으로 `@available` / `#available`이 사용됩니다.
   - 실제 목표 OS에 맞춰 조건과 fallback(Tier 1)이 빌드/런타임 모두 안전한지 점검이 필요합니다.

---

## 9) 추천 작업 순서(최소 리스크)

1. iOS 전용 배포 설정 정리
2. Info.plist에 BGTask/권한 키 반영
3. entitlements 제거/정리(iOS용만)
4. App Privacy 설문/Privacy Policy URL/Support URL 준비
5. TestFlight로 권한/백그라운드/대용량 라이브러리 성능 검증
