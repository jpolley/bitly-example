import { test, expect } from "@playwright/test";
import { LoginPage, HomePage } from "@pages";
import { faker } from "@helpers";

test.describe("User logs in to Bitly", async () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  test("using invalid credentials ", async ({ page }) => {
    const email = faker.internet.email();

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(email, "INVALID_PASSWORD");

    await expect(loginPage.invalidCredentialsError).toBeVisible();
  });

  test("using valid credentials", async ({ page }) => {
    const email: string = process.env.USER_EMAIL ?? "";
    const password: string = process.env.USER_PASSWORD ?? "";

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(email, password);

    const homePage = new HomePage(page);
    expect(await homePage.navLink.innerText()).toContain("Links");
  });
});
