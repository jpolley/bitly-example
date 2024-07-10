import { Page } from "@playwright/test";

export class HomePage {
  readonly navLink = this.page.locator('[data-test-id="links"]');
  readonly createNew = this.page.getByRole("button", { name: "Create new" });
  readonly createNewLink = this.page.getByText("Link", { exact: true });

  async goto() {
    const accountId = process.env.ACCOUNT_ID ?? "";
    await this.page.goto(`/${accountId}/home`);
  }

  async clickCreateNewLink() {
    await this.createNew.click();
    await this.createNewLink.click();
  }

  constructor(private readonly page: Page) {}
}
