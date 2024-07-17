import { test as setup, expect } from "@playwright/test";
import { createPageFactory, PageFactory } from "@pages";

const authFile = ".auth/user.json";

let $p: PageFactory; // TODO: Inject via fixture?

setup("authenticate", async ({ page }) => {
  $p = createPageFactory(page);

  await $p.withLoginPage(async (p) => {
    await p.goto();
    await p.loginWithValidCredentials();
  });

  await $p.withHomePage(async (p) => {
    expect(await p.navLink.innerText()).toContain("Links");
  });

  await page.context().storageState({ path: authFile });
});
