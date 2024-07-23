import { APIRequestContext, request } from "@playwright/test";

const API_URL = process.env.API_URL;
const ONE_SECOND = 1000; /* ms */

interface BitlinkOptions {
  long_url: string;
  domain?: string;
  group_guid?: string;
  title?: string;
  tags?: string[];
}

interface ExpectedData {
  [key: string]: string | string[];
}

/*
  I'm not sure how important it is to call dispose() after using the context. It's likely
  there would be memory leaks if you don't do it. A helper function like this below will
  make sure it's always called once we're done with the request.
*/
type RequestContextCallback<T> = (ctx: APIRequestContext) => Promise<T>;
async function withRequestContext<T>(cb: RequestContextCallback<T>): Promise<T> {
  const ctx = await request.newContext();
  try {
    return await cb(ctx);
  } finally {
    await ctx.dispose();
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function createBitlink(options: BitlinkOptions): Promise<string> {
  return withRequestContext(async (ctx) => {
    const response = await ctx.post(API_URL + "/v4/bitlinks", {
      data: {
        ...options,
      },
    });
    const body = await response.json();
    return body.id;
  });
}

export async function deleteBitlink(linkId: string): Promise<void> {
  await withRequestContext((ctx) => ctx.delete(API_URL + `/v4/bitlinks/${linkId}`));
}

export async function waitForBitlinkData(linkId: string, expectedData: ExpectedData): Promise<void> {
  const startTime = Date.now();
  const timeout = 20000;

  while (true) {
    try {
      const data = await fetchLinkData(linkId);

      if (objectsMatch(data, expectedData)) {
        return;
      }
      // Check for timeout
      if (Date.now() - startTime > timeout) {
        throw new Error("Timeout waiting for data to become consistent");
      }

      await delay(ONE_SECOND);
    } catch (error) {
      throw new Error(`Failed to get consistent data: ${error.message}`);
    }
  }
}

async function fetchLinkData(linkId: string): Promise<unknown> {
  return withRequestContext(async (ctx) => {
    const response = await ctx.get(API_URL + `/v4/bitlinks/${linkId}`);
    return await response.json();
  });
}

function objectsMatch(actual: unknown, expected: unknown) {
  if (typeof actual !== "object") return false;
  if (typeof expected !== "object") return false;

  return Object.keys(expected).every((key) => {
    const expectedValue = expected[key];
    const actualValue = actual[key];

    if (Array.isArray(expectedValue)) {
      return Array.isArray(actualValue) && expectedValue.every((val) => actualValue.includes(val));
    } else {
      return actualValue === expectedValue;
    }
  });
}
