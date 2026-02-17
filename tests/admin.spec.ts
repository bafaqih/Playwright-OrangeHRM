import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AdminPage } from '../pages/AdminPage';
import { PimPage } from '../pages/PimPage';

test.describe('Admin Module', () => {
    let loginPage: LoginPage;
    let adminPage: AdminPage;
    let pimPage: PimPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        adminPage = new AdminPage(page);
        pimPage = new PimPage(page);

        await loginPage.goto();
        await loginPage.login('Admin', 'admin123');
        await expect(page).toHaveURL(/.*dashboard/);

        await adminPage.navigateToAdmin();
    });

    test('TC-ADM-001: Add User for Existing Employee', async ({ page }) => {
        const username = `admin${Math.floor(Math.random() * 10000)}`;

        // 1. Precondition: Ensure Employee Exists
        await pimPage.navigateToAddEmployee();
        await pimPage.fillEmployeeDetails('Fadil', 'Bafagih', undefined, 'Hasan');
        await pimPage.save();
        await expect(pimPage.successMessage).toBeVisible();

        // 2. Navigate to Admin to create User
        await adminPage.navigateToAdmin();
        await adminPage.navigateToAddUser();

        await adminPage.fillUserDetails('ESS', 'Fadil Hasan Bafagih', 'Enabled', username, 'Password123!', 'Password123!');
        await adminPage.save();

        await expect(adminPage.successMessage).toBeVisible();
    });

    test('TC-ADM-002: Add User for Unregistered Employee (Negative)', async ({ page }) => {
        await adminPage.navigateToAddUser();

        await adminPage.userRoleDropdown.click();
        await page.getByRole('option', { name: 'ESS' }).click();

        await adminPage.statusDropdown.click();
        await page.getByRole('option', { name: 'Enabled' }).click();

        await adminPage.typeEmployeeName('Ghost User 999');
        await page.click('body');

        await expect(adminPage.invalidMessage).toBeVisible();
    });

    test('TC-ADM-003: Duplicate Username (Negative)', async ({ page }) => {
        await adminPage.navigateToAddUser();

        await adminPage.usernameInput.fill('Admin'); // 'Admin' user always exists
        await page.click('body');

        await expect(adminPage.alreadyExistsMessage).toBeVisible();
    });

    test('TC-ADM-004: Weak Password Validation (Negative)', async ({ page }) => {
        await adminPage.navigateToAddUser();

        await adminPage.passwordInput.fill('12345'); // Weak
        await adminPage.passwordInput.fill('12345');

        await expect(adminPage.weakPasswordMessage).toBeVisible();
    });

    test('TC-ADM-005: Search System User', async ({ page }) => {
        await adminPage.searchUser('Admin');

        const rows = adminPage.userListTable.locator('.oxd-table-card');
        await expect(rows).toHaveCount(1);
        await expect(rows.first()).toContainText('Admin');
    });
});
