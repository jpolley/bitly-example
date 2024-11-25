import { test, expect } from "@fixtures/base";
import { LoginPage, HomePage } from "@pages";

test.describe("User logs in to Bitly", async () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  test("using invalid credentials ", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("invalid@example.com", "INVALID_PASSWORD");

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
