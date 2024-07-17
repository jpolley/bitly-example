import { test, expect } from "@playwright/test";
import { createPageFactory, PageFactory } from "@pages";
import { deleteBitlink } from "@helpers";

let linkId: string = "";

test.describe("User creates new Link", async () => {
  let $p: PageFactory; // TODO: Inject via fixture?

  test.beforeEach(async ({ page }) => {
    $p = createPageFactory(page);
  });

  test.afterEach(async () => {
    if (linkId) {
      await deleteBitlink(linkId);
    }
  });

  test("using url and title", async () => {
    const destinationUrl = "https://wildbit.com";
    const title = "Wildbit: Building a people-first business";

    await $p.withHomePage(async (p) => {
      p.goto();
      p.clickCreateNewLink();
    });

    await $p.withCreateLinkPage(async (p) => {
      p.createNewLink({
        destinationUrl: destinationUrl,
        title: title,
      });
    });

    await $p.withLinkDetailsPage(async (p) => {
      linkId = await p.linkId();
      expect(await p.successMessage()).toContain("Successfully created.");
      expect(await p.destinationUrl()).toContain(destinationUrl);
      expect(await p.linkTitle()).toContain(title);
    });
  });

  test("using autobranded domain", async () => {
    const destinationUrl = "https://apple.com";

    await $p.withHomePage(async (p) => {
      p.goto();
      p.clickCreateNewLink();
    });

    await $p.withCreateLinkPage(async (p) => {
      await p.inputDestinationUrl(destinationUrl);
      await p.destinationUrl.press("Tab");

      expect(await p.autobrandMessage.innerText()).toContain(
        "The destination URL points to an autobranded domain and cannot be customized."
      );
    });
  });

  test("using invalid url", async () => {
    const destinationUrl = "blah";

    await $p.withHomePage(async (p) => {
      p.goto();
      p.clickCreateNewLink();
    });

    await $p.withCreateLinkPage(async (p) => {
      p.createNewLink({
        destinationUrl: destinationUrl,
      });

      expect(await p.errorMessage.innerText()).toContain(`We'll need a valid URL, like "yourbrnd.co/niceurl"`);
    });
  });
});
