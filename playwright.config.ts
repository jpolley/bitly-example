import { defineConfig } from "@playwright/test";
import type { APIRequestOptions } from "./lib/fixtures/apiRequest";

import dotenv from "dotenv";
dotenv.config();

export default defineConfig<APIRequestOptions>({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["github"], ["list"], ["html"]] : [["list"], ["html"]],
  use: {
    baseURL: "https://app.bitly.com",
    apiURL: process.env.API_URL + "/v4",
    extraHTTPHeaders: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
    video: "on",
    screenshot: "on",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "api",
      testMatch: /.*(api).*.ts/,
    },
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: "ui",
      testMatch: /.*(ui).*.ts/,
      dependencies: ["setup"],
      use: {
        storageState: ".auth/user.json",
      },
    },
  ],
});
