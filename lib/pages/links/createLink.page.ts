import { Page } from "@playwright/test";

interface LinkOptions {
  destinationUrl: string;
  title?: string;
}

export class CreateLinkPage {
  readonly destinationUrl = this.page.locator("#destination-url");
  readonly title = this.page.locator("#title");
  readonly createLink = this.page.locator("#create-link-cta");
  readonly autobrandMessage = this.page.locator(".autobrand-message");
  readonly errorMessage = this.page.locator(".orb-error-label");

  async goto() {
    const accountId = process.env.ACCOUNT_ID ?? "";
    await this.page.goto(`/${accountId}/links/create`);
  }

  async inputDestinationUrl(destinationUrl: string) {
    await this.destinationUrl.fill(destinationUrl);
  }

  async inputTitle(title: string) {
    await this.title.fill(title);
  }

  async clickCreateLink() {
    await this.createLink.click();
  }

  async createNewLink(options: LinkOptions) {
    await this.inputDestinationUrl(options.destinationUrl);
    if (options.title) {
      await this.inputTitle(options.title);
    }
    await this.clickCreateLink();
  }

  constructor(private readonly page: Page) {}
}
