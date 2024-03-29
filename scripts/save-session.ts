const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function saveSession() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://login.justworks.com/');
  await page.pause();
  // Assume the logic to perform login is here
  // ...
  // After successful login, save the cookies
  const cookies = await page.context().cookies();
  fs.writeFileSync(
    path.join(__dirname, 'cookies.json'),
    JSON.stringify(cookies),
  );
  await browser.close();
  console.log('Session saved.');
}

saveSession();
