import { Page } from "@playwright/test";

export class LinksPage {
  readonly createNew = this.page.getByText("Create new");

  async goto() {
    const accountId = process.env.ACCOUNT_ID ?? "";
    await this.page.goto(`/${accountId}/links`);
  }

  async clickCreateServer() {
    await this.createNew.click();
  }

  constructor(private readonly page: Page) {}
}
