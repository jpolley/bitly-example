import { test as base } from "@playwright/test";

export * from "./pages/login.page";
export * from "./pages/home.page";
export * from "./pages/links/links.page";
export * from "./pages/links/createLink.page";
export * from "./pages/links/details.page";

export type TestOptions = {
  apiURL: string;
};

// This will allow you to set apiURL in playwright.config.ts
export const test = base.extend<TestOptions>({
  apiURL: ["", { option: true }],
});

export default test;
