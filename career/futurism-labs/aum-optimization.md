---
title: AUM 그래프 성능 최적화
description: API 변경 + 해시맵 최적화로 LCP 200ms 미만 달성
last_update:
  date: 2026-03-15
---

# AUM 그래프 성능 최적화

> **성과 한 줄 요약**: API 변경(1초↓) + 해시맵 O(1) 탐색(1초↓) + Zustand 최적화 → LCP 200ms 미만

## 상황 (Situation)

AUM(운용자산) 그래프 페이지의 로딩 속도가 느려 사용자 경험이 저하되고 있었습니다.

## 과제 (Task)

LCP를 200ms 미만으로 단축하는 것이 목표였습니다.

## 행동 (Action)

_구체적인 기술적 행동을 추후 작성합니다._

## 결과 (Result)

- API 변경으로 1초 단축
- 해시맵 O(1) 탐색으로 1초 단축
- Zustand 필터링 최적화
- **최종 LCP 200ms 미만 달성**

## 사용 기술

React, Zustand, TanStack Query

---

*이 문서는 회고에서 추출한 성과를 기반으로 작성되었습니다. Action 부분은 회고를 다시 읽으며 보강할 예정입니다.*
