import { Page, Locator, expect } from '@playwright/test';

export class AdminPage {
    readonly page: Page;
    readonly menuAdmin: Locator;
    readonly addButton: Locator;
    readonly userRoleDropdown: Locator;
    readonly employeeNameInput: Locator;
    readonly statusDropdown: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly saveButton: Locator;
    readonly searchButton: Locator;
    readonly searchUsernameInput: Locator;
    readonly userListTable: Locator;

    // Messages
    readonly successMessage: Locator;
    readonly requiredMessage: Locator; // Generic required message
    readonly invalidMessage: Locator; // For invalid employee
    readonly alreadyExistsMessage: Locator; // For duplicate username
    readonly weakPasswordMessage: Locator; // For weak password

    constructor(page: Page) {
        this.page = page;
        this.menuAdmin = page.getByRole('link', { name: 'Admin' });
        this.addButton = page.getByRole('button', { name: /Add/i });

        // Input Groups
        this.userRoleDropdown = page.locator('div.oxd-input-group', { hasText: 'User Role' }).locator('.oxd-select-text');
        this.employeeNameInput = page.getByPlaceholder('Type for hints...');
        this.statusDropdown = page.locator('div.oxd-input-group', { hasText: 'Status' }).locator('.oxd-select-text');
        this.usernameInput = page.locator('div.oxd-input-group', { hasText: 'Username' }).getByRole('textbox');

        // Password fields
        this.passwordInput = page.locator('div.oxd-input-group', { hasText: 'Password' }).first().getByRole('textbox');
        this.confirmPasswordInput = page.locator('div.oxd-input-group', { hasText: 'Confirm Password' }).getByRole('textbox');

        this.saveButton = page.getByRole('button', { name: 'Save' });

        // Search Section
        this.searchUsernameInput = page.locator('form').getByRole('textbox').first();
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.userListTable = page.getByRole('table');

        // Messages
        this.successMessage = page.getByText('Successfully Saved');
        this.requiredMessage = page.getByText('Required');
        this.invalidMessage = page.getByText('Invalid');
        this.alreadyExistsMessage = page.getByText('Already exists');
        this.weakPasswordMessage = page.getByText('Very Weak').or(page.getByText('Should have at least 7 characters'));
    }

    async navigateToAdmin() {
        await this.menuAdmin.click();
        // Wait for URL and Add button to ensure page is loaded
        await this.page.waitForURL(/.*admin.*/);
        await this.addButton.waitFor({ state: 'visible' });
    }

    async navigateToAddUser() {
        await this.addButton.click();
    }

    async fillUserDetails(role: string, formattedEmployeeName: string, status: string, username: string, pass: string, confirm: string) {
        // Select Role
        await this.userRoleDropdown.click();
        await this.page.getByRole('option', { name: role }).click();

        // Select Employee (Autosuggest)
        await this.employeeNameInput.fill(formattedEmployeeName);
        // Wait for suggestion and click.
        await this.page.getByRole('option', { name: formattedEmployeeName }).first().click();

        // Select Status
        await this.statusDropdown.click();
        await this.page.getByRole('option', { name: status }).click();

        // Fill Credentials
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(pass);
        await this.confirmPasswordInput.fill(confirm);
    }

    async typeEmployeeName(name: string) {
        await this.employeeNameInput.fill(name);
    }

    async save() {
        await this.saveButton.click();
    }

    async searchUser(username: string) {
        const searchInput = this.page.locator('.oxd-table-filter').getByRole('textbox').first();
        await searchInput.fill(username);
        await this.searchButton.click();
    }
}
