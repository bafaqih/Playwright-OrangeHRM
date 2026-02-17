import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly invalidCredentialMessage: Locator;
    readonly requiredMessages: Locator;
    readonly userDropdown: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.invalidCredentialMessage = page.getByText('Invalid credentials');
        this.requiredMessages = page.getByText('Required');
        this.userDropdown = page.locator('.oxd-userdropdown-tab');
        this.logoutButton = page.getByRole('menuitem', { name: 'Logout' });
    }

    async goto() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', {
            timeout: 60000,
            waitUntil: 'domcontentloaded'
        });
    }

    async login(username: string, password: string) {
        if (username) await this.usernameInput.fill(username);
        if (password) await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async logout() {
        await this.userDropdown.click();
        await expect(this.logoutButton).toBeVisible(); // Ensure dropdown animation completes
        await this.logoutButton.click();
    }
}
