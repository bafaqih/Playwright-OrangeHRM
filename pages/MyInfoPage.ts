import { Page, Locator, expect } from '@playwright/test';

export class MyInfoPage {
    readonly page: Page;
    readonly menuMyInfo: Locator;
    readonly contactDetailsLink: Locator;
    readonly emailInput: Locator; // Work Email usually
    readonly saveContactButton: Locator;
    readonly profileImage: Locator;
    readonly fileInput: Locator;
    readonly saveImageButton: Locator; // Sometimes upload saves auto, sometimes explicit save

    // Messages
    readonly invalidEmailMessage: Locator;
    readonly attachmentSizeMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuMyInfo = page.getByRole('link', { name: 'My Info' });

        // Navigation inside My Info
        this.contactDetailsLink = page.getByRole('link', { name: 'Contact Details' });

        // Contact Details Form
        // There are multiple emails. Usually "Work Email".
        // Struct: Label -> Input.
        this.emailInput = page.locator('div.oxd-input-group', { hasText: 'Work Email' }).getByRole('textbox');
        this.saveContactButton = page.locator('form').filter({ hasText: 'Work Email' }).getByRole('button', { name: 'Save' });
        this.invalidEmailMessage = page.getByText('Expected format: admin@example.com').or(page.getByText('Invalid'));

        // Profile Picture
        this.profileImage = page.locator('.orangehrm-edit-employee-image');
        this.fileInput = page.locator('input[type="file"]');
        this.saveImageButton = page.getByRole('button', { name: 'Save' }); // Initialized here
        // The error often appears near the uploader
        this.attachmentSizeMessage = page.getByText('Attachment Size Exceeded');
    }

    async navigateToMyInfo() {
        await this.menuMyInfo.click();
    }

    async navigateToContactDetails() {
        await this.contactDetailsLink.click();
    }

    async fillWorkEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async saveContact() {
        await this.saveContactButton.click();
    }

    async uploadProfilePicture(filePath: string) {
        // Usually clicking the image opens file dialog, but validation might happen on specific input
        // Playwright handles file input directly
        await this.profileImage.click(); // Go to upload mode (often changes view)
        // Wait for file input to necessarily be present
        await this.fileInput.setInputFiles(filePath);
        // Sometimes there is a generic save button for the form
        // assuming auto-fail or we click save.
        // Let's Assume there IS a save button on the photograph screen
        // page.getByRole('button', { name: 'Save' })
        const saveBtn = this.page.getByRole('button', { name: 'Save' });
        if (await saveBtn.isVisible()) {
            await saveBtn.click();
        }
    }
}
