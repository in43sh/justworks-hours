import { chromium } from '@playwright/test';
// import { expect } from '@playwright/test';
import { test } from '@playwright/test';
import 'dotenv/config';

test.describe('test suite', () => {
  test('test case', async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://login.justworks.com/');
    await page.getByLabel('Username').fill(`${process.env.JUSTWORKS_USERNAME}`);
    await page
      .getByLabel('Password', { exact: true })
      .fill(`${process.env.JUSTWORKS_PASSWORD}`);
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.click('h3:has-text("Google Authenticator")');
    await page.click("[id='credentials.passcode']");
    await page.pause();
    await page.goto('https://hours.justworks.com/dashboard/shifts', {
      timeout: 100000,
    });
    await page.getByText('Add shift for completed work').click();
    await page.pause();
    await page.getByRole('combobox').selectOption('SAS');
    await page.getByRole('textbox').nth(1).click();
    await page.press('input[type="text"]', '8');
    await page.getByText('Add New Shift').click();
    await page.getByText('Add break').click();
    await page.getByRole('textbox').nth(0).click();
    await page.getByRole('textbox').nth(1).fill('12');
    await page.click('.meridian-column >> nth=0');
    await page.pause();
    // await expect(page.locator('.bootstrap-timepicker-widget dropdown-menu open timepicker-orient-left timepicker-orient-top')).toContainText('pm');
    await page.getByRole('textbox').nth(4).click();
    await page.getByRole('textbox').nth(2).fill('1');
    await page.getByRole('textbox').nth(3).fill('00');
    await page.getByText('Add New Shift').click();
    const element = await page.locator('#work-breaks-wrapper');
    await element.getByText('Save').click();
    await page.pause();
    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByText('Summary').click();
    await page.pause();
    await page.getByText('Save').first().click();
    await page.pause();
  });
});
