const { test, expect } = require('@playwright/test');

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('#userEmail').fill('anshika@gmail.com');
  await page.locator('#userPassword').type('Iamking@000');
  await page.locator('[value="Login"]').click();
  await page.waitForLoadState('networkidle');
  await context.storageState({ path: 'state.json' });
});

test('Browser Context-Validating Error Login', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('#userEmail').fill('anshika@gmail.com');
  await page.locator('#userPassword').fill('Iamking@000');
  await page.locator('[value="Login"]').click();
  await page.waitForLoadState('networkidle');
  const titles = await page.locator('.card-body b').allTextContents();
  console.log(titles);
});
