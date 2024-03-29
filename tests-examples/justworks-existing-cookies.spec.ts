import { test } from '@playwright/test';
import cookies from '../userData/cookies';

function assertSameSite(
  value: string | null | undefined,
): 'Strict' | 'Lax' | 'None' | undefined {
  if (value === 'Strict' || value === 'Lax' || value === 'None') {
    return value;
  }

  // Handle the null case or log a warning for any unexpected value
  // For null, you might decide to return undefined or a default value like "Lax"
  if (value === null) {
    console.warn(`Received null for sameSite. Setting to undefined.`);
    return undefined; // Or set a default like "Lax", depending on your requirements
  }

  console.warn(`Invalid sameSite value: '${value}'. Setting to undefined.`);
  return undefined;
}

const transformedCookies = cookies.map((cookie) => ({
  name: cookie.name,
  value: cookie.value,
  domain: cookie.domain,
  path: cookie.path,
  expires: cookie.expirationDate,
  httpOnly: cookie.httpOnly,
  secure: cookie.secure,
  sameSite: assertSameSite(cookie.sameSite), // Validate and/or transform sameSite
}));

test.beforeEach(async ({ context }) => {
  await context.addCookies(transformedCookies);
});

test.describe('test suite', () => {
  test('test case', async ({ page }) => {
    // await page.goto('https://login.justworks.com/')
    await page.goto('https://hours.justworks.com/dashboard/shifts');
    await test.setTimeout(12000000);
    await page.pause();
    await page.getByText('Add shift for completed work').click({ force: true });
    await test.setTimeout(12000000);
    await page.pause();
    await page.getByText('Add shift for completed work').click({ force: true });
    await test.setTimeout(12000000);
    await page.pause();
    await page.getByText('Add shift for completed work').click({ force: true });
  });
});
