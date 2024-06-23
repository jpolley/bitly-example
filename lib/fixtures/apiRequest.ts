import { test as base, APIRequestContext, request } from "@playwright/test";

export type APIRequestOptions = {
  apiURL: string;
};

type APIRequestFixture = {
  apiRequest: APIRequestContext;
};

// This fixture will override baseURL with apiBaseURL from playwright.config.ts whenever it is used
export const test = base.extend<APIRequestOptions & APIRequestFixture>({
  apiURL: ["", { option: true }],

  apiRequest: async ({ apiURL }, use) => {
    const apiRequestContext = await request.newContext({
      baseURL: apiURL,
    });

    await use(apiRequestContext);
    await apiRequestContext.dispose();
  },
});
