import { Page, Locator, expect } from '@playwright/test';

export class PimPage {
    readonly page: Page;
    readonly menuPim: Locator;
    readonly addEmployeeLink: Locator;
    readonly firstNameInput: Locator;
    readonly middleNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly employeeIdInput: Locator;
    readonly createLoginDetailsCheckbox: Locator;
    readonly usernameInput: Locator;
    readonly statusEnabledRadio: Locator;
    readonly statusDisabledRadio: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly saveButton: Locator;
    readonly successMessage: Locator;
    readonly requiredMessage: Locator;
    readonly passwordMismatchMessage: Locator;
    readonly idExistsMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuPim = page.getByRole('link', { name: 'PIM' });
        this.addEmployeeLink = page.getByRole('link', { name: 'Add Employee' });
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.middleNameInput = page.getByPlaceholder('Middle Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');

        // Robust locator for Employee ID: Find the input group containing text "Employee Id" then find the textbox within it
        this.employeeIdInput = page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).getByRole('textbox');

        this.createLoginDetailsCheckbox = page.locator('div.oxd-switch-wrapper');

        // Locators for Login Details
        this.usernameInput = page.locator('div.oxd-input-group', { has: page.getByText('Username') }).getByRole('textbox');
        this.statusEnabledRadio = page.getByText('Enabled');
        this.statusDisabledRadio = page.getByText('Disabled');
        this.passwordInput = page.locator('div.oxd-input-group', { has: page.getByText('Password') }).first().getByRole('textbox');
        this.confirmPasswordInput = page.locator('div.oxd-input-group', { has: page.getByText('Confirm Password') }).getByRole('textbox');

        this.saveButton = page.getByRole('button', { name: 'Save' });

        // Assertions / Messages
        this.successMessage = page.getByText('Successfully Saved');
        this.requiredMessage = page.getByText('Required');
        this.passwordMismatchMessage = page.getByText('Passwords do not match');
        this.idExistsMessage = page.getByText('Employee Id already exists');
    }

    async navigateToAddEmployee() {
        await this.menuPim.click();
        await this.addEmployeeLink.click();
    }

    async fillEmployeeDetails(firstName: string, lastName: string, id?: string, middleName?: string) {
        if (firstName) await this.firstNameInput.fill(firstName);
        if (middleName) await this.middleNameInput.fill(middleName);
        if (lastName) await this.lastNameInput.fill(lastName);

        if (id) {
            await this.employeeIdInput.fill(id);
        }
    }

    async toggleCreateLoginDetails() {
        await this.createLoginDetailsCheckbox.click();
    }

    async fillLoginDetails(username: string, pass: string, confirm: string, status: 'Enabled' | 'Disabled' = 'Enabled') {
        await this.usernameInput.fill(username);

        if (status === 'Enabled') {
            await this.statusEnabledRadio.click();
        } else {
            await this.statusDisabledRadio.click();
        }

        await this.passwordInput.fill(pass);
        await this.confirmPasswordInput.fill(confirm);
    }

    async save() {
        await this.saveButton.click();
    }
}
