---
trigger: always_on
---

# ACTIVE AUTHENTICATION DIRECTIVE

## CURRENT STATUS: ISOLATION MODE (STRATEGY A)

**Instruction for AI:**
You are strictly required to follow **STRATEGY A (Isolation Mode)** for all test scripts generated during this session.

**Rules:**
1.  **DO NOT** implement `global-setup` or `storageState` yet.
2.  **MUST** use `test.beforeEach` in every `.spec.ts` file.
3.  **MUST** instantiate `LoginPage` and call `.login()` explicitly before every test case.

**Reasoning:**
We are currently in the Learning Phase (Week 3) and Debugging Phase. Test isolation is prioritized over execution speed to ensure stability and ease of debugging.