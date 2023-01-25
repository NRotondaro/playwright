const { test, expect } = require('@playwright/test');

test('Place order and grab order ID', async ({ page }) => {
  const email = 'anshika@gmail.com';
  const productName = 'iphone 13 pro';
  const products = page.locator('.card-body');
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('#userEmail').fill(email);
  await page.locator('#userPassword').fill('Iamking@000');
  await page.locator('[value="Login"]').click();
  await page.waitForLoadState('networkidle');
  const titles = await page.locator('.card-body b').allTextContents();
  console.log(titles);
  const count = await products.count();
  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator('b').textContent()) === productName) {
      await products.nth(i).locator('text= Add To Cart').click();
      break;
    }
  }
  await page.locator('[routerlink*="cart"]').click();
  await page.locator('div li').first().waitFor();
  const bool = await page.locator('h3:has-text("iphone 13 pro")').isVisible();
  expect(bool).toBeTruthy();
  await page.locator('text=Checkout').click();
  await page.locator('[placeholder*="Country"]').type('ind', { delay: 100 });
  const dropdown = page.locator('.ta-results');
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator('button').count();
  for (let i = 0; i < optionsCount; i++) {
    let text = await dropdown.locator('button').nth(i).textContent();
    if (text.trim() === 'India') {
      await dropdown.locator('button').nth(i).click();
      break;
    }
  }
  await page.pause();
  await expect(page.locator('.user__name label')).toHaveText(email);
  await page.locator('.action__submit').click();

  await expect(page.locator('.hero-primary')).toHaveText(
    ' Thankyou for the order. '
  );
  const orderId = await page
    .locator('.em-spacer-1 .ng-star-inserted')
    .textContent();
  console.log(orderId);
  await page.locator('button[routerlink*="myorders"]').click();
  await page.locator('tbody').waitFor();
  const rows = await page.locator('tbody tr');
  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator('th').textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator('button').first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator('.col-text').textContent();
  await expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
