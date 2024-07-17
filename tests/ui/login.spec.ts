import { test, expect } from "@playwright/test";
import { createPageFactory, PageFactory } from "@pages";
import { faker } from "@helpers";

test.describe("User logs in to Bitly", async () => {
  let $p: PageFactory; // TODO: Inject via fixture?

  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
    $p = createPageFactory(page);
  });

  test("using invalid credentials ", async () => {
    const email = faker.internet.email();

    await $p.withLoginPage(async (p) => {
      await p.goto();
      await p.login(email, "INVALID_PASSWORD");

      await expect(p.invalidCredentialsError).toBeVisible();
    });
  });

  test("using valid credentials", async () => {
    const email: string = process.env.USER_EMAIL ?? "";
    const password: string = process.env.USER_PASSWORD ?? "";

    await $p.withLoginPage(async (p) => {
      await p.goto();
      await p.login(email, password);
    });

    await $p.withHomePage(async (p) => {
      expect(await p.navLink.innerText()).toContain("Links");
    });
  });
});
