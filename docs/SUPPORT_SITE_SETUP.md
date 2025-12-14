# Remin Support 사이트(GitHub Pages) 구성

목표: App Store Connect에 넣을 **Support URL** / **Privacy Policy URL**을 GitHub Pages로 제공.

## 권장 구조 (ViewLingo 방식)

- 별도 공개 리포지토리: `remin-support`
- Pages 소스: `main` 브랜치의 `/docs` 폴더

예상 URL:
- Support URL(메인): `https://puritysb.github.io/remin-support/`
- Privacy Policy URL: `https://puritysb.github.io/remin-support/privacy.html`
- Support Page: `https://puritysb.github.io/remin-support/support.html`

## 이 리포의 템플릿 파일

- `docs/index.html`
- `docs/privacy.html`
- `docs/support.html`
- `docs/style.css`
- `docs/app-icon.png`

## 배포 절차

1. `remin-support` 리포지토리를 로컬에 clone
   - 예: `../remin-support` 경로에 clone (이 리포와 같은 상위 폴더)
2. 이 리포에서 사이트 파일을 `remin-support/docs/`로 동기화
   - `bash scripts/sync-remin-support.sh ../remin-support`
3. `remin-support` 리포에서 커밋/푸시
   - `git add docs`
   - `git commit -m "Add support site pages"`
   - `git push`
4. GitHub 리포지토리 설정 → Pages
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/docs`
5. 페이지가 뜬 뒤 `index.html`의 App Store 링크/OG 이미지 경로를 실제 값으로 교체
   - `docs/index.html`의 `og:image`는 절대경로 권장
   - `docs/index.html`의 다운로드 링크는 출시 후 App Store URL로 교체

## “일부 코드를 별도 GitHub 저장소에 올리는” 방식도 가능한가?

가능합니다. 다만 Support 사이트 목적이라면 **앱 코드와 분리된 정적 페이지만 공개**하는 방식이 가장 단순합니다.

코드 재사용/공개가 목적이라면:
- 공통 로직을 **Swift Package**로 분리 → 앱 리포에서 SPM 의존성으로 추가(공개/비공개 모두 가능)
- 또는 git submodule/subtree로 일부 디렉터리만 분리(운영 난이도는 SPM보다 높음)
