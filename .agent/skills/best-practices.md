# QA Engineering Skills & SOP

## Skill 1: Locator Strategy (User-Facing)
When selecting elements, follow this priority order (NO XPath/CSS Classes):
1. `page.getByRole('button', { name: 'Save' })`
2. `page.getByLabel('Username')`
3. `page.getByPlaceholder('Enter password')`
4. `page.getByText('Welcome')`

## Skill 2: Page Object Model (POM) Implementation
- **Separation of Concerns:**
  - `pages/`: Contains Selectors (Locators) and Actions (Methods).
  - `tests/`: Contains ONLY Test Logic and Assertions.
- **Example Flow:**
  - Create `LoginPage.ts` class.
  - Instantiate it in `auth.spec.ts`.
  - Call `await loginPage.login('admin', 'password')`.

## Skill 3: Debugging Mindset
If a test fails:
1. Check if `await` is missing.
2. Check if the locator is dynamic/changing.
3. Use `await page.pause()` suggestion for the user to debug.