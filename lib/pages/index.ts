import { test as base } from "@playwright/test";

export * from "./login.page";
export * from "./home.page";
export * from "./links/links.page";
export * from "./links/createLink.page";
export * from "./links/details.page";

export type TestOptions = {
  apiURL: string;
};

// This will allow you to set apiURL in playwright.config.ts
export const test = base.extend<TestOptions>({
  apiURL: ["", { option: true }],
});

export default test;
