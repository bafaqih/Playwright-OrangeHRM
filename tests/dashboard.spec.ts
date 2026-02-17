import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { MyInfoPage } from '../pages/MyInfoPage';
import path from 'path';
import fs from 'fs';

test.describe('Dashboard & My Info Module', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    let myInfoPage: MyInfoPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        myInfoPage = new MyInfoPage(page);

        await loginPage.goto();
        await loginPage.login('Admin', 'admin123');
        await expect(page).toHaveURL(/.*dashboard/);
    });

    test('TC-DASH-001: Verify Quick Launch Widget', async ({ page }) => {
        // Check "Assign Leave"
        const assignLeaveBtn = await dashboardPage.getQuickLaunchItem('Assign Leave');

        await expect(assignLeaveBtn).toBeVisible();
        await assignLeaveBtn.click();

        await expect(page).toHaveURL(/.*assignLeave.*/);
    });

    test('TC-DASH-002: Check My Actions Widget', async ({ page }) => {
        await expect(dashboardPage.myActionsWidget).toBeVisible();

        const reviewItem = await dashboardPage.getMyActionItem('Pending Self Review');

        if (await reviewItem.isVisible()) {
            const text = await reviewItem.innerText();
            // Verify pattern "(Number) Pending Self Review"
            expect(text).toMatch(/\(\d+\)\s+Pending Self Review/);

            await reviewItem.click();
        } else {
            console.log('Pending Self Review item not visible in My Actions');
        }
    });

    test('TC-DASH-003: Check Side Menu Collapse', async ({ page }) => {
        await dashboardPage.collapseSideMenu();
        expect(await dashboardPage.isSideMenuCollapsed()).toBeTruthy();
    });

    test('TC-INFO-001: Update My Info with invalid Email', async ({ page }) => {
        await myInfoPage.navigateToMyInfo();
        await myInfoPage.navigateToContactDetails();

        await myInfoPage.fillWorkEmail('invalid-email'); // No @
        await myInfoPage.saveContact();

        await expect(myInfoPage.invalidEmailMessage).toBeVisible();
    });

    test('TC-INFO-002: Upload Profile Picture > 1MB', async ({ page }) => {
        // Create a dummy large file
        const largeFileName = 'large_image.jpg';
        const largeFilePath = path.join(__dirname, largeFileName);

        const buffer = Buffer.alloc(1.5 * 1024 * 1024, 'a');
        fs.writeFileSync(largeFilePath, buffer);

        try {
            await myInfoPage.navigateToMyInfo();
            await myInfoPage.uploadProfilePicture(largeFilePath);

            await expect(myInfoPage.attachmentSizeMessage).toBeVisible();
        } finally {
            // Cleanup
            if (fs.existsSync(largeFilePath)) {
                fs.unlinkSync(largeFilePath);
            }
        }
    });
});
