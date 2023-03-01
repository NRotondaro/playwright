const { test, expect } = require('@playwright/test');
let webContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('#userEmail').fill('anshika@gmail.com');
  await page.locator('#userPassword').type('Iamking@000');
  await page.locator('[value="Login"]').click();
  await page.waitForLoadState('networkidle');
  await context.storageState({ path: 'state.json' });
  webContext = await browser.newContext({ storageState: 'state.json' });
});

test('Browser Context-Validating Error Login', async () => {
  const page = await webContext.newPage();
  await page.goto('https://rahulshettyacademy.com/client');
  const titles = await page.locator('.card-body b').allTextContents();
  expect(titles).toHaveLength(8);
});
