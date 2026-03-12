---
title: RBAC 권한 시스템
description: AWS IAM 참고한 역할 기반 접근 제어 설계 및 구현
---

# RBAC 권한 시스템

> **성과 한 줄 요약**: AWS IAM 참고, PrivilegeGate 컴포넌트 + prebuild 스크립트로 권한 동기화

## 상황 (Situation)

비전 시스템에 다양한 역할의 사용자가 접근하면서, 역할별 접근 제어가 필요해졌습니다.

## 과제 (Task)

확장 가능한 권한 시스템을 설계하고, 프론트엔드에서 역할별 UI 분기를 깔끔하게 처리하는 것이 목표였습니다.

## 행동 (Action)

_구체적인 기술적 행동을 추후 작성합니다._

## 결과 (Result)

- AWS IAM을 참고한 RBAC 시스템 설계/구현
- PrivilegeGate 컴포넌트로 역할별 UI 분기 처리
- prebuild 스크립트로 백엔드-프론트엔드 권한 동기화

## 사용 기술

React, TypeScript, Vitest

---

*이 문서는 회고에서 추출한 성과를 기반으로 작성되었습니다. Action 부분은 회고를 다시 읽으며 보강할 예정입니다.*
