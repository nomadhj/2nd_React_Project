# React 2차 프로젝트

## 프로젝트 결과
  - 프로젝트 배포 링크 : https://unrivaled-mousse-8502b6.netlify.app/
## [리팩토링 기록 (click)](REFACTORING.md)
  
  **[변경사항]**
  ```
  - 기존의 백엔드 데이터를 포함한 정식 배포 버전이 아닌 netlify를 통한 클라이언트 코드 배포
  - 구글 소셜 로그인 기능 변경 적용 (기존 프로젝트와 달리 백엔드 없이 클라이언트로만 구성)
  - 데이터 베이스는 Firebase를 활용
  - 실제 프로젝트에서 구현했던 기능에서 일부 삭제
    - 개인 공부 및 기록 목적이므로 직접 구현한 기능 위주로 프로젝트 구성
    - 소셜 로그인/무한스크롤 기능 위주
  ```
  **[추가로 개선해야 될 부분]** 
 - ~~무한스크롤 위치저장 기능 및 로딩 최적화~~ **[완료]**
 - ~~로그인 전역 상태 관리~~ **[완료]** 
 - 구글 소셜 로그인 배포 링크에서 작동 안되는 현상 개선
 - redux 활용한 추가 데이터 전역 관리
 - 아이템 리스트 필터 코드 리팩토링 (현재 가독성이 떨어짐)
 - 스크롤 저장기능은 잘 작동하지만 비교적 간단한 방식으로 구현하다보니 매번 데이터를 로딩해야되는 문제가 있음.
   - 매번 데이터 모든 데이터를 로딩하지 않고 필요한 위치의 데이터만 로딩 될 수 있도록 최적화가 필요 (react-virtualized 등 활용)
 -(추가)검색 기능 및 상세 페이지도 개선
 - 포탈기능을 통한 필터 팝업 재사용
  
  ***
# 기존 프로젝트 설명 (리팩토링 이전)

  **[기존 프로젝트 구현결과 영상 및 github]**
  - 시연 영상: https://www.youtube.com/watch?v=SqFNWewFKKk
  - github(배포 X; 코드만 확인 가능) : https://github.com/wecode-bootcamp-korea/33-2nd-wantUS-frontend

## 개요 

- 내용 : wanted 웹페이지를 모티브로 한 채용서비스 웹페이지 구현 프로젝트
- 기간 : 2022.06.07 ~ 06.17 (2주)
- 인원 : 총 6명 (프론트엔드: 4명, 백엔드: 2명)
- 기술스택 및 협업 tool
```
  - React
  - JavaScript
  - HTML5/CSS3(styled component)
  - 협업 툴 : github, slack, trello
```
- 구현 기능 (담당 기능은 *로 표기)
```
  - Nav, Footer, 메인페이지
  - 소셜 로그인 페이지
  - 마이페이지 / 이력서페이지 / 좋아요페이지
  - 채용 상세 페이지
  - *채용 공고 리스트
  - *검색바 / 검색 결과
```

## 담당 구현 기능

### 채용공고리스트, 검색바/검색결과페이지


![infinite scroll](https://user-images.githubusercontent.com/101119985/174231973-78152b27-9222-4f5f-89b0-f6d7a3bf8e13.gif)

- 채용공고리스트
  - 페이지네이션 기능을 활용, 무한 스크롤 페이지 구현
  - interSection Observserf API를 활용한 성능 최적회
  - Query Parameter를 활용한 다중 필터 기능
  - 서버로부터 데이터 로딩 중 로딩 되는 데이터 수 만큼 skeleton UI를 띄워주도록 함
  - 검색 결과 페이지에서 좋아요 버튼 클릭 시 해당 내용 서버로 전달 (데이터 좋아요 페이지 연동)
  - 각 아이템 클릭 시 채용상세페이지로 이동 
![search](https://user-images.githubusercontent.com/101119985/174230995-46e5ddf6-25a6-420d-9932-f1d881c75244.gif)

- 검색바/검색결과페이지
  - 검색 모달 창 및 검색 결과 페이지 구현
  - useLocation을 활용, 검색 모달창에 입력한 내용을 백엔드 엔드포인트로 전달
  - 검색 결과 페이지에서 좋아요 버튼 클릭 시 해당 내용 서버로 전달 (데이터 좋아요 페이지 연동)
  - 각 아이템 클릭 시 채용상세페이지로 이동
