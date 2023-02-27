const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APIUtils');
const loginPayload = {
  userEmail: 'anshika@gmail.com',
  userPassword: 'Iamking@000',
};
const orderPayload = {
  orders: [{ country: 'Brazil', productOrderedId: '6262e95ae26b7e1a10e89bf0' }],
};

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);

  // const loginResponse = await apiContext.post(
  //   'https://rahulshettyacademy.com/api/ecom/auth/login',
  //   {
  //     data: loginPayload,
  //   }
  // );
  // expect(loginResponse.ok()).toBeTruthy();
  // const loginResponseJson = await loginResponse.json();
  // token = loginResponseJson.token;
  // console.log(token);

  // const orderResponse = await apiContext.post(
  //   'https://rahulshettyacademy.com/api/ecom/order/create-order',
  //   {
  //     data: orderPayload,
  //     headers: {
  //       Authorization: token,
  //       'Content-Type': 'application/json',
  //     },
  //   }
  // );
  // const orderReponseJson = await orderResponse.json();
  // console.log(orderReponseJson);
  // orderId = orderReponseJson.orders[0];
  // console.log(orderId);
});

test('Place order and grab order ID', async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, response.token);
  await page.goto('https://rahulshettyacademy.com/client/');
  const titles = await page.locator('.card-body b').allTextContents();
  console.log(titles);
});
