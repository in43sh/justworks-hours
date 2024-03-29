import { test } from "@playwright/test";

test.describe("test suite", () => {
  test("test case", async ({ page }) => {
    await page.goto("https://login.justworks.com/");
    await page.getByLabel("Username").fill("");
    await page.getByLabel("Password", { exact: true }).fill("");
    await page.getByRole("button", { name: "Log in" }).click();
    test.setTimeout(1200000);
    await page.pause();
  });
});
