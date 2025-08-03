import { test as base } from "@playwright/test";

export const test = base.extend<{
  exceptionLogger: void;
  timeLogger: void;
}>({
  timeLogger: [
    async ({}, use) => {
      test.info().annotations.push({
        type: "Start",
        description: new Date().toISOString(),
      });

      await use();

      test.info().annotations.push({
        type: "End",
        description: new Date().toISOString(),
      });
    },
    { auto: true },
  ],
});

export { expect } from "@playwright/test";
