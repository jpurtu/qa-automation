const { test, expect } = require('@playwright/test');

test.describe('Visual Regression — Swag Labs', () => {

  test('página de login mantiene apariencia', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await expect(page).toHaveScreenshot('login.png', {
      maxDiffPixelRatio: 0.02
    });
  });

  test('catálogo de productos mantiene apariencia', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.waitForURL('**/inventory.html');
    await expect(page).toHaveScreenshot('catalog.png', {
      maxDiffPixelRatio: 0.02
    });
  });

});
