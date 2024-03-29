// const { chromium } = require('playwright')
// const fs = require('fs')

async function loadSession() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Load cookies from a file or storage
  const cookies = JSON.parse(
    fs.readFileSync('../userData/cookies.json', 'utf8'),
  );
  await context.addCookies(cookies);

  // Now navigate, as the login state is preserved
  //   await page.goto('https://hours.justworks.com/dashboard/shifts')
  await page.goto('https://login.justworks.com/s');
  // await test.setTimeout(12000000)
  await page.pause();
  await page.getByText('Add shift for completed work').click({ force: true });

  await browser.close();
}

loadSession();
