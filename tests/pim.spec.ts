import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { PimPage } from '../pages/PimPage';

test.describe('PIM Module', () => {
    let loginPage: LoginPage;
    let pimPage: PimPage;

    test.beforeEach(async ({ page }) => {
        // Strategy A: Isolation Mode - Login before each test
        loginPage = new LoginPage(page);
        pimPage = new PimPage(page);

        await loginPage.goto();
        await loginPage.login('Admin', 'admin123');
        await expect(page).toHaveURL(/.*dashboard/);

        await pimPage.navigateToAddEmployee();
    });

    test('TC-PIM-001: Add Employee (Standard)', async ({ page }) => {
        await pimPage.fillEmployeeDetails('Fadil', 'Bafagih', undefined, 'Hasan');
        await pimPage.save();

        await expect(pimPage.successMessage).toBeVisible();
    });

    test('TC-PIM-002: Add Employee WITH Login Details', async ({ page }) => {
        const username = 'fadilbaf';

        await pimPage.fillEmployeeDetails('Fadil', 'Bafagih', undefined, 'Hasan');
        await pimPage.toggleCreateLoginDetails();

        // Ensure inputs are visible before filling (animation safety) 
        await expect(pimPage.usernameInput).toBeVisible();

        await pimPage.fillLoginDetails(username, 'fdl12345', 'fdl12345', 'Enabled');
        await pimPage.save();

        await expect(pimPage.successMessage).toBeVisible();
    });

    test('TC-PIM-003: Add Employee without Last Name (Negative)', async ({ page }) => {
        await pimPage.fillEmployeeDetails('Fadil', ''); // Empty Last Name
        await pimPage.save();

        await expect(pimPage.requiredMessage).toBeVisible();
    });

    test('TC-PIM-004: Password Mismatch on Creation (Negative)', async ({ page }) => {
        await pimPage.fillEmployeeDetails('Fadil', 'Bafagih');
        await pimPage.toggleCreateLoginDetails();
        await pimPage.fillLoginDetails('fadilbafa', 'fdl12345', 'fdl123456', 'Enabled'); // Mismatch 
        await pimPage.save();

        await expect(pimPage.passwordMismatchMessage).toBeVisible();
    });

    test('TC-PIM-005: Existing Employee ID (Negative)', async ({ page }) => {
        await pimPage.fillEmployeeDetails('PreCondition', 'User', '111');
        await pimPage.save();

        try {
            await expect(pimPage.idExistsMessage).toBeVisible({ timeout: 3000 });
            return; // Passed, ID already existed
        } catch (e) {
            // Error didn't appear
        }

        await pimPage.navigateToAddEmployee();
        await pimPage.fillEmployeeDetails('Fadil', 'Bafagih', '111');
        await pimPage.save();

        await expect(pimPage.idExistsMessage).toBeVisible();
    });
});
