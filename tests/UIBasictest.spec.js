const { test, expect } = require('@playwright/test');

test('First Playwright test', async ({ browser, page }) => {
  // const context = await browser.newContext();
  // const page = await context.newPage(); rahulshettyacademy
  // await expect(page).toHaveTitle('Google');
  const userName = page.locator('#username');
  const signIn = page.locator('#signInBtn');
  const cardTitles = page.locator('.card-body a');
  await page.goto('https://rahulshettyacademy.com/loginpagePractise');
  await userName.type('rahulshetty');
  await page.locator('[type="password"]').type('learning');
  await signIn.click();
  await expect(page.locator('[style*="block"]')).toContainText('Incorrect ');
  await userName.fill('');
  await userName.fill('rahulshettyacademy');
  // race condicition - that is necessary because when using the allTextContents there's no auto-
  // this could be fixed using waitForLoadState('networkidle') but since this page is non service oriented that's not
  await Promise.all([page.waitForNavigation(), signIn.click()]);

  // console.log(await cardTitles.first().textContent());
  // console.log(await cardTitles.nth(1).textContent());
  console.log(await cardTitles.allTextContents());
});

test('UI Controls', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise');
  const userName = page.locator('#username');
  const signIn = page.locator('#signInBtn');
  const documentLink = page.locator('[href*="documents-request"]');
  const dropdown = page.locator('select');
  await dropdown.selectOption('consult');
  await page.locator('.radiotextsty').last().click();
  await page.locator('#okayBtn').click();
  await expect(page.locator('.radiotextsty').last()).toBeChecked();
  await page.locator('#terms').click();
  await expect(page.locator('#terms')).toBeChecked();
  await page.locator('#terms').uncheck();
  expect(await page.locator('#terms').isChecked()).toBeFalsy();
  await expect(documentLink).toHaveAttribute('class', 'blinkingText');
});

test('Child windows handling', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise');
  const userName = page.locator('#username');
  const documentLink = page.locator('[href*="documents-request"]');
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    documentLink.click(),
  ]);
  const text = await newPage.locator('.red').textContent();
  const arrayText = text.split('@');
  const domain = arrayText[1].split(' ')[0];
  await userName.type(domain);
});
