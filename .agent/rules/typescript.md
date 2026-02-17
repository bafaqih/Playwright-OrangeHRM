---
trigger: always_on
---

# TypeScript & Playwright Coding Rules

**Strict Compliance Required:**
1. **Language:** TypeScript (Strict Mode).
2. **Variable Declaration:**
   - Use `const` by default for static values (URLs, Locators).
   - Use `let` ONLY for dynamic values (counters, changing status).
   - **FORBIDDEN:** Do NOT use `var`.
   - **FORBIDDEN:** Do NOT use `any` type. Define interfaces instead.
3. **Async/Await:**
   - All browser interactions (`click`, `fill`, `goto`) MUST use `await`.
   - Functions containing `await` MUST be marked as `async`.
4. **Assertions:**
   - Default: Use Hard Assertions `await expect(locator).toBeVisible()`.
   - Exception: Use Soft Assertions `expect.soft` ONLY for visual lists.