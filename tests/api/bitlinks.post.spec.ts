import { expect } from "@playwright/test";
import { test } from "@fixtures/apiRequest";
import { deleteBitlink } from "@helpers";

let linkId: string = "";

test.describe("Create Bitlink", async () => {
  test.afterEach(async () => {
    if (linkId) {
      await deleteBitlink(linkId);
    }
  });

  test("using valid url", async ({ apiRequest }) => {
    const url = "https://bitly.typeform.com/to/ZhhDheXe/";
    const title = "SDET Technical Challenge";
    const tags = ["API", "Bitly", "SDET"];

    const response = await apiRequest.post("/v4/bitlinks", {
      data: {
        long_url: url,
        title: title,
        tags: tags,
      },
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    linkId = body.id;

    expect(body.link).toContain("https://bit.ly/");
    expect(body.long_url).toBe(url);
    expect(body.title).toBe(title);
    expect(body.archived).toBe(false);
    expect(body.tags).toEqual(tags);
  });

  test("using invalid url", async ({ apiRequest }) => {
    const response = await apiRequest.post("/v4/bitlinks", {
      data: {
        long_url: "INVALID",
      },
    });

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe("INVALID_ARG_LONG_URL");
    expect(body.resource).toBe("bitlinks");
    expect(body.description).toBe("The value provided is invalid.");
  });
});
