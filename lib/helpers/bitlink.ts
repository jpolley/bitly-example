import { request } from "@playwright/test";

const url = process.env.API_URL;

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

export async function createBitlink(options: BitlinkOptions) {
  const requestContext = await request.newContext();
  const response = await requestContext.post(url + "/v4/bitlinks", {
    data: {
      ...options,
    },
  });

  const body = await response.json();
  return body.id;
}

export async function deleteBitlink(linkId: string) {
  const requestContext = await request.newContext();
  await requestContext.delete(url + `/v4/bitlinks/${linkId}`);
}

export async function waitForBitlinkData(linkId: string, expectedData: ExpectedData) {
  const startTime = Date.now();
  const timeout = 20000;

  while (true) {
    try {
      const requestContext = await request.newContext();
      const response = await requestContext.get(url + `/v4/bitlinks/${linkId}`);
      const data = await response.json();

      // Check if the response data matches the expected data
      const isDataConsistent = Object.keys(expectedData).every((key) => {
        const expectedValue = expectedData[key];
        const actualValue = data[key];

        if (Array.isArray(expectedValue)) {
          return Array.isArray(actualValue) && expectedValue.every((val) => actualValue.includes(val));
        } else {
          return actualValue === expectedValue;
        }
      });

      if (isDataConsistent) {
        return data; // Return the data if it matches the expected values
      }
      // Check for timeout
      if (Date.now() - startTime > timeout) {
        throw new Error("Timeout waiting for data to become consistent");
      }

      // Wait for 1 second before trying again
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      throw new Error(`Failed to get consistent data: ${error.message}`);
    }
  }
}
