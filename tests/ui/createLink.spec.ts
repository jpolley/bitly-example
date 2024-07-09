import { test, expect } from "@playwright/test";
import { CreateLinkPage, HomePage, LinkDetailsPage } from "@pages";
import { deleteBitlink } from "@helpers";

let linkId: string = "";

test.describe("User creates new Link", async () => {
  test.afterEach(async () => {
    if (linkId) {
      await deleteBitlink(linkId);
    }
  });

  test("using url and title", async ({ page }) => {
    const destinationUrl = "https://wildbit.com";
    const title = "Wildbit: Building a people-first business";

    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.clickCreateNewLink();

    const createLinkPage = new CreateLinkPage(page);
    await createLinkPage.createNewLink({
      destinationUrl: destinationUrl,
      title: title,
    });

    const linkDetailsPage = new LinkDetailsPage(page);
    linkId = await linkDetailsPage.linkId();

    expect(await linkDetailsPage.successMessage()).toContain("Successfully created.");
    expect(await linkDetailsPage.destinationUrl()).toContain(destinationUrl);
    expect(await linkDetailsPage.linkTitle()).toContain(title);
  });

  test("without a title", async ({ page }) => {
    const destinationUrl = "https://pokemongolive.com";

    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.clickCreateNewLink();

    const createLinkPage = new CreateLinkPage(page);
    await createLinkPage.createNewLink({
      destinationUrl: destinationUrl,
    });

    const linkDetailsPage = new LinkDetailsPage(page);
    linkId = await linkDetailsPage.linkId();

    expect(await linkDetailsPage.successMessage()).toContain("Successfully created.");
    expect(await linkDetailsPage.destinationUrl()).toContain(destinationUrl);
    expect(await linkDetailsPage.linkTitle()).toContain("pokemongolive.com – untitled");
  });

  test("press Enter to quick create", async ({ page }) => {
    const destinationUrl = "https://peoplefirstjobs.com";

    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.clickCreateNewLink();

    const createLinkPage = new CreateLinkPage(page);

    await createLinkPage.inputDestinationUrl(destinationUrl);
    await createLinkPage.destinationUrl.press("Enter");

    const linkDetailsPage = new LinkDetailsPage(page);
    linkId = await linkDetailsPage.linkId();

    expect(await linkDetailsPage.successMessage()).toContain("Successfully created.");
    expect(await linkDetailsPage.destinationUrl()).toContain(destinationUrl);
    expect(await linkDetailsPage.linkTitle()).toContain("peoplefirstjobs.com – untitled");
  });
});
