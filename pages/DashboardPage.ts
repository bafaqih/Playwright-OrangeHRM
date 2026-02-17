import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly sideMenuToggleButton: Locator;
    readonly sidePanel: Locator; // Renamed from side_menu_class for clarity
    readonly myActionsWidget: Locator;

    constructor(page: Page) {
        this.page = page;
        // The chevron button usually
        this.sideMenuToggleButton = page.locator('.oxd-main-menu-button');
        this.sidePanel = page.locator('.oxd-sidepanel');

        // Quick Launch is a grid of buttons.
        // My Actions is a widget card.
        this.myActionsWidget = page.locator('.orangehrm-dashboard-widget-name', { hasText: 'My Actions' });
    }

    async collapseSideMenu() {
        await this.sideMenuToggleButton.click();
    }

    async isSideMenuCollapsed(): Promise<boolean> {
        return await this.sidePanel.getAttribute('class').then(c => c?.includes('toggled') || false);
    }

    async getQuickLaunchItem(name: string): Promise<Locator> {
        // Updated strategy: Find the Quick Launch widget first, then find the specific button inside.
        // The widget usually has a header "Quick Launch" with class .orangehrm-main-dashboard-card-header or similar structure.
        // We'll filter for the card containing 'Quick Launch' text.
        const quickLaunchCard = this.page.locator('.oxd-grid-item', { hasText: 'Quick Launch' });

        // Inside this card, look for the button or link with the specific name
        return quickLaunchCard.getByRole('button', { name: name }).or(quickLaunchCard.getByRole('link', { name: name }));
    }
    async getMyActionItem(name: string): Promise<Locator> {
        // Find the widget first
        const widget = this.page.locator('.orangehrm-dashboard-widget-name', { hasText: 'My Actions' }).locator('..').locator('..');
        // Find Paragraph or text containing the name (e.g. "Pending Self Review")
        // The text is usually "(1) Pending Self Review"
        return widget.getByText(name, { exact: false });
    }
}
