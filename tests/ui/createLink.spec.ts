import { test, expect } from "@fixtures/base";
import { CreateLinkPage, LinksPage, LinkDetailsPage } from "@pages";
import { deleteBitlink } from "@helpers";

test.describe("User creates new Link", async () => {
  let linkId: string;

  test.beforeEach(async ({ page }) => {
    const linksPage = new LinksPage(page);
    await linksPage.goto();
    await linksPage.clickCreateLink();
  });

  test.afterEach(async () => {
    if (linkId) {
      await deleteBitlink(linkId);
      linkId = null;
    }
  });

  test("using url and title", async ({ page }) => {
    const destinationUrl = "https://wildbit.com";
    const title = "Wildbit: Building a people-first business";

    const createLinkPage = new CreateLinkPage(page);
    await createLinkPage.createNewLink({
      destinationUrl: destinationUrl,
      title: title,
    });

    const linkDetailsPage = new LinkDetailsPage(page);
    linkId = await linkDetailsPage.linkId();

    expect(await linkDetailsPage.destinationUrl()).toContain(destinationUrl);
    expect(await linkDetailsPage.linkTitle()).toContain(title);
  });

  test("using autobranded domain", async ({ page }) => {
    const destinationUrl = "https://apple.com";

    const createLinkPage = new CreateLinkPage(page);
    await createLinkPage.inputDestinationUrl(destinationUrl);
    await createLinkPage.destinationUrl.press("Tab");

    expect(await createLinkPage.autobrandMessage.innerText()).toContain(
      "The destination URL points to an autobranded domain and cannot be customized."
    );
  });

  test("using invalid url", async ({ page }) => {
    const destinationUrl = "blah";

    const createLinkPage = new CreateLinkPage(page);
    await createLinkPage.createNewLink({
      destinationUrl: destinationUrl,
    });

    expect(await createLinkPage.errorMessage.innerText()).toContain(
      `We'll need a valid URL, like "yourbrnd.co/niceurl"`
    );
  });
});
