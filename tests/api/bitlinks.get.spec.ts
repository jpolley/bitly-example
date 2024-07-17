import { expect } from "@playwright/test";
import { test } from "@fixtures/apiRequest";
import { createBitlink, deleteBitlink, waitForBitlinkData } from "@helpers";

let linkId: string = "";

test.describe("Get Bitlink", async () => {
  test.afterEach(async () => {
    if (linkId) {
      await deleteBitlink(linkId);
    }
  });

  test("using valid link id", async ({ apiRequest }) => {
    const longUrl =
      "https://playwrightsolutions.com/playwright-ask-me-anything-debrief-will-playwright-replace-cypress/";
    const title = "Playwright Soultions AMA";
    const tags = ["Jeremy", "Playwright"];

    linkId = await createBitlink({
      long_url: longUrl,
      title: title,
      tags: tags,
    });

    await waitForBitlinkData(linkId, { title: title, tags: tags });

    const response = await apiRequest.get(`/v4/bitlinks/${linkId}`);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(linkId);
    expect(body.link).toBe(`https://${linkId}`);
    expect(body.long_url).toBe(longUrl);
    expect(body.title).toBe(title);
    expect(body.archived).toBe(false);
    expect(body.tags).toEqual(tags);
  });

  test("using invalid link id", async ({ apiRequest }) => {
    const response = await apiRequest.get("/v4/bitlinks/INVALID");

    expect(response.status()).toBe(404);
  });
});
