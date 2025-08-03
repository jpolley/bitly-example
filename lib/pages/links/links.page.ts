import { Page } from "@playwright/test";

export class LinksPage {
  readonly createLink = this.page.getByRole("button", { name: "Create link" });

  async goto() {
    const accountId = process.env.ACCOUNT_ID ?? "";
    await this.page.goto(`/${accountId}/links`);
  }

  async clickCreateLink() {
    await this.createLink.click();
  }

  constructor(private readonly page: Page) {}
}
