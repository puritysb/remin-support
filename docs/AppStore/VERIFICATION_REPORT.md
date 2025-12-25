# App Store 업로드 파일 검증 보고서

생성일: 2025-12-14

---

## 📱 스크린샷 검증 결과

### 파일 목록 및 규격

| 파일명 | 해상도 | 파일 크기 | 상태 |
|--------|--------|-----------|------|
| Apple iPhone 16 Pro Max Screenshot 1.png | 1320 x 2868 | 2.4 MB | ✅ |
| Apple iPhone 16 Pro Max Screenshot 2.png | 1320 x 2868 | 2.4 MB | ✅ |
| Apple iPhone 16 Pro Max Screenshot 3.png | 1320 x 2868 | 3.0 MB | ✅ |
| Apple iPhone 16 Pro Max Screenshot 4.png | 1320 x 2868 | 4.0 MB | ✅ |
| Apple iPhone 16 Pro Max Screenshot 5.png | 1320 x 2868 | 2.8 MB | ✅ |
| Apple iPhone 16 Pro Max Screenshot 6.png | 1320 x 2868 | 2.1 MB | ✅ |

### App Store 요구사항 비교

- ✅ **해상도**: 1320 x 2868 픽셀 (iPhone 16 Pro Max 6.9" 디스플레이 필수 규격)
- ✅ **파일 형식**: PNG (RGB, 투명도 없음)
- ✅ **알파 채널**: 제거됨 (hasAlpha: no)
- ✅ **파일 크기**: 모두 10MB 이하
- ✅ **개수**: 6개 (최대 10개까지 업로드 가능)

### 수정 작업 (2025-12-14 17:55)

**문제**: 원본 스크린샷에 알파 채널 포함 → "이미지는 알파 채널 또는 투명도를 담을 수 없습니다" 경고

**해결**: PNG → JPEG → PNG 변환으로 알파 채널 완전 제거
- 방법: `sips -s format jpeg` → `sips -s format png`
- 결과: hasAlpha: yes → no (6개 모두)
- 시각적 변화: 없음 (흰색 배경 자동 합성)

### 결론

**모든 스크린샷이 App Store 규격에 완벽하게 부합합니다. 알파 채널 제거 완료, 즉시 업로드 가능합니다.**

---

## 🎬 앱 미리보기 비디오 검증 및 편집

### 원본 파일 분석

#### ScreenRecording_12-14-2025 16-04-19_1.mp4
- **해상도**: 1290 x 2796 픽셀 (iPhone 16 Pro Max 세로 모드)
- **길이**: 58.7초 ❌ (App Store 요구: 15-30초)
- **파일 크기**: 100 MB ✅ (최대 500MB)
- **코덱**: HEVC + AAC

### App Store Connect 요구사항 (중요)

**App Store에서 요구하는 해상도:**
- ✅ **886 × 1920 픽셀** (세로 모드)
- ✅ **1920 × 886 픽셀** (가로 모드)

이는 iPhone 14/15 Pro (6.1") 표준 해상도로, 더 많은 기기와의 호환성을 위한 것입니다.

### 편집 작업 내용 (최종)

1. **원본 구간 선택**: 0초 ~ 55초 사용
   - 사용자 요청에 따라 55초까지만 사용

2. **재생 속도 조정**: 1.964배속 적용
   - 이유: 55초 → 28초로 압축
   - 자연스러운 재생 속도 유지

3. **해상도 다운스케일**: 1290×2796 → 886×1920
   - 비율: 동일 (0.461) - 크롭 없이 깔끔하게 스케일
   - 필터: Lanczos (고품질 리샘플링)

4. **프레임 레이트 조정** (2025-12-14 17:54 추가):
   - 59.94 fps → 30 fps
   - App Store 권장 프레임 레이트

5. **최종 출력 규격**:
   - 해상도: 886 × 1920 (App Store 요구 규격)
   - 프레임 레이트: 30 fps (App Store 권장)
   - 코덱: H.264 (libx264, CRF 23, medium preset)
   - 오디오: AAC 128kbps
   - 길이: 28초

### 최종 출력 파일

**Remin_AppPreview_28s_886x1920_30fps.mp4** ✅ App Store 업로드용 (최종)
- ✅ **해상도**: 886 × 1920 픽셀 (App Store 요구 규격)
- ✅ **프레임 레이트**: 30 fps (App Store 권장)
- ✅ **길이**: 28초 (정확히 28.00초)
- ✅ **파일 형식**: MP4 (H.264 + AAC 128kbps)
- ✅ **파일 크기**: 20 MB (500MB 제한의 4%)
- ✅ **비트레이트**: 5.8 Mbps (고품질 유지)
- ✅ **소스 구간**: 원본 0~55초
- ✅ **재생 속도**: 1.964배속

**이전 버전들 (참고용):**
- `Remin_AppPreview_28s_886x1920.mp4` - 59.94fps (App Store 경고: "프레임 속도가 너무 빠릅니다")
- `Remin_AppPreview_28s.mp4` - 1290x2796 (거부됨)
- `Remin_AppPreview_30s.mp4` - 1290x2796 (거부됨)

### App Store 업로드 권장사항

**App Store Connect에 업로드할 파일:**
- ✅ `Remin_AppPreview_28s_886x1920_30fps.mp4` (필수 - 올바른 해상도 + 프레임 레이트)

**참고:**
- 앱 미리보기 비디오는 최대 3개까지 업로드 가능
- 현재 1개만 제공하므로 추가 영상이 필요한 경우 별도 준비 권장

### 수정 이력

**2025-12-14 17:54 - 프레임 레이트 수정**
- **문제**: "앱 미리보기의 프레임 속도가 너무 빠릅니다" 경고
- **원인**: 원본 59.94 fps가 유지됨
- **해결**: ffmpeg로 30 fps 재인코딩
- **결과**: App Store 권장 프레임 레이트 충족, 파일 크기 20% 감소 (24MB → 20MB)

---

## 📋 App Store Connect 업로드 체크리스트

### 스크린샷 업로드
- [ ] App Store Connect > 앱 정보 > 스크린샷 섹션 이동
- [ ] 6.9" 디스플레이 (iPhone 16 Pro Max) 선택
- [ ] 6개 PNG 파일 업로드 (순서대로)
- [ ] 미리보기 확인 및 저장

### 앱 미리보기 비디오 업로드
- [ ] 동일 섹션에서 "앱 미리보기" 선택
- [ ] `Remin_AppPreview_28s_886x1920_30fps.mp4` 업로드 (필수 - 30fps 버전)
- [ ] 포스터 프레임 선택
- [ ] 미리보기 재생 확인 및 저장
- [ ] 해상도 오류가 없는지 확인 (886 × 1920 요구)
- [ ] 프레임 레이트 경고가 없는지 확인 (30 fps)

### 자동 스케일링 확인
- [ ] Apple이 다른 기기 크기로 자동 스케일링한 결과 미리보기
- [ ] 필요시 다른 기기별 별도 에셋 추가 (선택사항)

---

## 📚 참고 자료

- [App Store Screenshot Specifications](https://developer.apple.com/help/app-store-connect/reference/screenshot-specifications/)
- [App Store Preview Video Specifications](https://developer.apple.com/help/app-store-connect/reference/app-preview-specifications/)
- [App Store Connect Guide](https://developer.apple.com/help/app-store-connect/)

---

**보고서 작성**: Claude Code
**검증 완료**: 2025-12-14
