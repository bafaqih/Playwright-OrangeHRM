# Authentication Strategies & Session Management

This document defines the Standard Operating Procedures (SOP) for handling authentication in our Playwright test suite.

## 1. STRATEGY A: Isolation Mode (CURRENT ACTIVE STANDARD)
**Use Case:** Small test suites (< 50 tests), Debugging, or Learning Phase (Week 3).
**Mechanism:** `test.beforeEach` hook.

### Implementation Rules:
1.  Every test file (`.spec.ts`) must act independently.
2.  Import `LoginPage` class in the spec file.
3.  Use `test.beforeEach` to navigate and login before **EVERY** test case.
4.  **Pros:** Complete isolation. If one test corrupts the session, others remain unaffected.
5.  **Cons:** Slower execution time.

### Code Pattern:
```typescript
// tests/pim.spec.ts
test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('Admin', 'admin123');
    // Ensure dashboard is visible before proceeding
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});

## 2. STRATEGY B: Storage State / Global Setup (FUTURE STANDARD)
**Use Case:** Large regression suites, CI/CD, Efficiency optimization.
**Mechanism:** `storageState` (saving cookies/local storage).

## Implementation Rules
1.  Create a `global-setup.ts` script that runs **once** before all tests.
2.  Login successfully and save the state to `auth.json`.
3.  Configure `playwright.config.ts` to use this state.

## Code Pattern (Global Setup)
```typescript
// global-setup.ts
import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('[https://opensource-demo.orangehrmlive.com/](https://opensource-demo.orangehrmlive.com/)');
  
  // Perform Login
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Wait for login to complete
  await page.waitForURL('**/dashboard/index');
  
  // Save State
  await page.context().storageState({ path: 'auth.json' });
  await browser.close();
}
export default globalSetup;

## 3. File Handling Expired Tokens
**Nama File:** `.agent/skills/auth-session-recovery.md`

```markdown
# Handling Expired Tokens (Session Recovery)
**Context:** When using **Strategy B** (Storage State), the token in `auth.json` might expire during a long test run.

## Recovery Logic (Self-Healing)
If a test fails due to authentication error (e.g., redirected to Login Page unexpectedly), follow this pattern:

1.  **Detection:** Check if the URL is back to `/auth/login` while it should be inside the app.
2.  **Action:** Re-login immediately inside the test execution context.
3.  **Update:** Optionally update the `auth.json` file (advanced).

## Code Pattern (Rescue Snippet)
```typescript
// Example of a helper function to wrap actions
async function performActionWithRetry(page: Page, action: () => Promise<void>) {
    try {
        await action();
    } catch (error) {
        // Detect if error is due to logged out state
        if (page.url().includes('login')) {
            console.log('Session expired. Re-logging in...');
            const loginPage = new LoginPage(page);
            await loginPage.login('Admin', 'admin123');
            
            // Retry the action
            await action();
        } else {
            throw error; // If not auth error, fail the test
        }
    }
}