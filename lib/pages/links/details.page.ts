import { Page } from "@playwright/test";

export class LinkDetailsPage {
  readonly destinationUrlElement = this.page.locator('[class$="long-url"]');
  readonly linkIdElement = this.page.locator('[class$="short-url"]');
  readonly linkTitleElement = this.page.locator("h1.new-link-details-layout");
  readonly successMessageElement = this.page.getByText("Successfully created.");

  async destinationUrl() {
    return await this.destinationUrlElement.innerText();
  }

  async linkId(): Promise<string> {
    return await this.linkIdElement.innerText();
  }

  async linkTitle() {
    return await this.linkTitleElement.innerText();
  }

  async successMessage() {
    return await this.successMessageElement.innerText();
  }

  constructor(private readonly page: Page) {}
}
