import { test as setup, expect } from "@playwright/test";
import { LoginPage, HomePage } from "@pages";

const authFile = ".auth/user.json";

setup("authenticate", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.loginWithValidCredentials();

  const homePage = new HomePage(page);
  expect(await homePage.navLink.innerText()).toContain("Links");

  await page.context().storageState({ path: authFile });
});
