import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Authentication Module', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('TC-AUTH-001: Verify login with valid Admin credentials', async ({ page }) => {
        await loginPage.login('Admin', 'admin123');
        await expect(page).toHaveURL(/.*dashboard/);
    });

    test('TC-AUTH-002: Verify login with invalid Password', async ({ page }) => {
        await loginPage.login('Admin', 'salah123');
        await expect(loginPage.invalidCredentialMessage).toBeVisible();
    });

    test('TC-AUTH-003: Verify login with invalid Username', async ({ page }) => {
        await loginPage.login('Unknown', 'admin123');
        await expect(loginPage.invalidCredentialMessage).toBeVisible();
    });

    test('TC-AUTH-004: Verify login with empty fields', async ({ page }) => {
        await loginPage.login('', '');
        await expect(loginPage.requiredMessages).toHaveCount(2);
    });

    test('TC-AUTH-005: Verify Logout functionality', async ({ page }) => {
        await loginPage.login('Admin', 'admin123');
        await expect(page).toHaveURL(/.*dashboard/);
        await loginPage.logout();
        await expect(page).toHaveURL(/.*auth\/login/);
        await expect(loginPage.loginButton).toBeVisible();
    });
});
