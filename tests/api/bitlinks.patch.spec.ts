import { expect } from "@playwright/test";
import { test } from "@fixtures/apiRequest";
import { createBitlink, deleteBitlink, waitForBitlinkData } from "@helpers";

test.describe("Update Bitlink", async () => {
  let linkId: string;

  test.afterEach(async () => {
    if (linkId) {
      await deleteBitlink(linkId);
      linkId = null;
    }
  });

  test("using valid title", async ({ apiRequest }) => {
    const longUrl = "https://playwright.dev/";
    const oldTitle = "API testing";
    const newTitle = "Using Playwright";

    linkId = await createBitlink({ long_url: longUrl, title: oldTitle });

    await waitForBitlinkData(linkId, { title: oldTitle });

    let response = await apiRequest.patch(`/v4/bitlinks/${linkId}`, {
      data: {
        title: newTitle,
      },
    });

    expect(response.status()).toBe(200);

    await waitForBitlinkData(linkId, { title: newTitle });

    response = await apiRequest.get(`/v4/bitlinks/${linkId}`);
    const body = await response.json();
    expect(body.title).toEqual(newTitle);
  });

  test("using valid tags", async ({ apiRequest }) => {
    const longUrl = "https://playwright.dev/docs/intro";
    const oldTags = ["api", "testing"];
    const newTags = ["party", "time"];

    linkId = await createBitlink({ long_url: longUrl, tags: oldTags });

    await waitForBitlinkData(linkId, { tags: oldTags });

    let response = await apiRequest.patch(`/v4/bitlinks/${linkId}`, {
      data: {
        tags: newTags,
      },
    });

    expect(response.status()).toBe(200);

    await waitForBitlinkData(linkId, { tags: newTags });

    response = await apiRequest.get(`/v4/bitlinks/${linkId}`);
    const body = await response.json();
    expect(body.tags).toEqual(newTags);
  });
});
