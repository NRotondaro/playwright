const { test, expect } = require('@playwright/test');

test.only('First Playwright test', async ({ browser, page }) => {
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
  //race condicition
  await Promise.all([page.waitForNavigation(), signIn.click()]);

  // console.log(await cardTitles.first().textContent());
  // console.log(await cardTitles.nth(1).textContent());
  console.log(await cardTitles.allTextContents());
});
