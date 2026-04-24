# 기획문서 템플릿 — 디자인 시스템 레퍼런스

이 프로젝트의 디자인 초안은 Figma 파일 `기획문서_템플릿` (fileKey: `nEAR7ubgl3pitRhfOqglxz`)을 기준으로 합니다. 화면을 만들 때는 아래 컴포넌트와 토큰을 **반드시 재사용**하고, 새 스타일을 즉흥적으로 만들지 마세요.

## 참조 Figma 노드
- 디자인 시스템 컴포넌트 모음 노드: `5:97`
  - URL: https://www.figma.com/design/nEAR7ubgl3pitRhfOqglxz/기획문서_템플릿?node-id=5-97&m=dev
- 화면 만들 때마다 `mcp__figma__get_design_context` 로 해당 노드를 먼저 조회해 최신 스펙을 확인할 것.

## 컬러 토큰 (CSS 변수 네이밍 그대로 사용)

| 변수 | HEX | 용도 |
| --- | --- | --- |
| `--grey/white` | `#ffffff` | 기본 배경 |
| `--grey/50` | `#f7f7f8` | GNB hover/selected 배경 |
| `--grey/100` | `#f3f4f5` | 테이블 헤더 / Draft 태그 배경 |
| `--grey/200` | `#ecedee` | 스크롤바 트랙 |
| `--grey/300` | `#cfd2d5` | 테이블 보더 |
| `--grey/400` | `#b6bbc0` | 스크롤바 썸 / 페이지네이션 비활성 텍스트 / 페이지 넘버 태그 |
| `--grey/450` | `#9ea5ab` | Tab 비활성 텍스트 / Footer 텍스트 |
| `--grey/500` | `#868e96` | 카드 업데이트 날짜 / 작성자 라벨 / Description 헤더 |
| `--grey/600` | `#6b7278` | 테이블 헤더 / Draft 태그 / GNB unselected / Breadcrumb |
| `--grey/700` | `#50555a` | 페이지 서브텍스트 / 본문 설명 |
| `--grey/900` | `#1b1c1e` | 기본 텍스트 / Tab 활성 언더라인 / 페이지 타이틀 |
| `--secondary/50` | `#eef4ff` | In Review 태그 배경 |
| `--blue/500` | `#5054f1` | In Review 태그 텍스트 |
| `--success/25` | `#f0f9f4` | Confirmed 태그 배경 |
| `--green/500` | `#04ae56` | Confirmed 태그 텍스트 |

## 타이포그래피
- 폰트패밀리: **Pretendard**
- 굵기: `Regular`, `Medium`, `SemiBold`, `Bold`
- 기본: `line-height: 1.3`, `not-italic` / 본문은 `line-height: 1.5`
- 주요 사이즈:
  - `40px Bold` — 페이지 타이틀 (Home, History, Overview, Screen Spec)
  - `32px SemiBold` — 카드 타이틀
  - `22px SemiBold` — 섹션 타이틀 (배경/목표/범위/Login 등)
  - `20px SemiBold` — Breadcrumb (페이지 타이틀 위 제품명)
  - `20px Medium` — 카드 설명
  - `18px Medium` — 페이지 서브텍스트 (타이틀 밑 문구)
  - `18px Medium/SemiBold` — Tab 라벨
  - `15px Medium/SemiBold` — GNB 메뉴, 테이블 텍스트, 페이지네이션, 본문 설명
  - `13px SemiBold` — Description 헤더 (Screen Spec 사이드)
  - `13px Medium` — 상태 태그, 페이지 넘버

## 디자인 시스템 컴포넌트

### 1. `GnbMenu` — 좌측 GNB 메뉴 아이템
- 크기: `w-[150px] h-[36px]`, `rounded-[8px]`, `px-[10px] py-[8px]`
- 텍스트: Pretendard Medium 15px
- 상태 (`state`):
  - `unselected` — 배경 `--grey/white`, 텍스트 `#6b7278`
  - `hovered` — 배경 `--grey/50`, 텍스트 `#6b7278`
  - `selected` — 배경 `--grey/50`, 텍스트 `black`

### 2. `Tap` — 상단 탭
- `px-[10px] py-[10px]`, `flex items-center justify-center`
- 텍스트: Pretendard 18px, `line-height: 1.3`
- 상태 (`state: boolean`):
  - `false` (비활성) — Medium, 색상 `--grey/450`
  - `true` (활성) — SemiBold, 색상 `--grey/900`, 하단 `border-b-2 --grey/900`

### 3. `StateTag` — 상태 뱃지
- `h-[28px]`, `rounded-[999px]`, `px-[12px] py-[8px]`
- 텍스트: Pretendard Medium 13px
- 변형 (`property1`):
  - `draft` — 배경 `--grey/100`, 텍스트 `--grey/600`, 라벨 "Draft"
  - `in_review` — 배경 `--secondary/50`, 텍스트 `--blue/500`, 라벨 "In Review"
  - `confirmed` — 배경 `--success/25`, 텍스트 `--green/500`, 라벨 "Confirmed"

### 4. `Table` — 테이블 셀
- `w-[197px] h-[40px]`, `p-[10px]`, `border-b border-r --grey/300`
- 변형 (`property1`):
  - `title` — 배경 `--grey/100`, 텍스트 Pretendard SemiBold 15px `--grey/600` (헤더)
  - `cell` — 기본 배경, Pretendard Medium 15px `--grey/900`, `showText` 토글로 추가 텍스트 노출
  - `cell_state` — 내부에 `StateTag` 를 렌더(기본 Draft)

### 5. `Pagenation` — 페이지네이션 아이템
- `w-[197px]`, `p-[10px]`, `flex items-center`
- 텍스트: Pretendard Medium 15px
- 상태 (`property1: boolean`):
  - `true` (활성) — 텍스트 `--grey/900`
  - `false` (비활성) — 텍스트 `--grey/400`

### 6. `ScrollBar` — 수평 스크롤 인디케이터
- 트랙: `w-[191px]`, 배경 `--grey/200`, `rounded-[999px]`, `p-[4px]`
- 썸: `w-[80px] h-[4px]`, 배경 `--grey/400`, `rounded-[999px]`

## 레이아웃 (1920×1080 기준)
- GNB(사이드바): `left:0`, `width:200px`, `height:100%`, 우측 `border-r --grey/200`, 내부 `padding:20px`
- 콘텐츠 영역: `left:320px`, `top:50px`, `width:1280px` (= GNB 200 + 120px 여백)
- Footer: `left:200px`, `bottom:0`, `width:1720px`, `padding: 10px 320px 30px 120px`
- GNB 메뉴 순서: Home / History / Overview / Screen Spec / Policy / Open Issue

## 페이지 헤더 패턴
- Home: 타이틀(40px Bold) + 서브타이틀(20px Medium `--grey/700`)
- 나머지(History/Overview/Screen Spec): Breadcrumb(18px SemiBold `--grey/600`) → 타이틀(40px Bold) → 설명(20px Medium `--grey/700`)
- Breadcrumb은 Home에서 선택한 제품명을 보여줌 (예: "RAG Chat Builder")

## 작업 규칙
1. **새 화면 만들기 전에** 위 컴포넌트 목록을 먼저 확인. 동일 역할이면 무조건 재사용.
2. 신규 컴포넌트가 필요해 보이면 만들기 전에 Figma 노드 `5:97` 을 다시 확인하고, 그래도 없으면 사용자에게 디자인 먼저 요청.
3. 컬러/타이포는 위 표의 토큰 이름 그대로 사용. 임의 HEX 하드코딩 금지.
4. Figma 에서 새 화면 노드를 받을 때마다 `get_design_context` 로 가져오고, 반환 코드는 참고용이므로 프로젝트 스택에 맞춰 변환.
