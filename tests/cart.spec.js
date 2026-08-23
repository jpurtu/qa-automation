const { test, expect } = require('@playwright/test');

test('Flujo completo: login y agregar producto al carrito', async ({ page }) => {
  // Login
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Verificar que entró al catálogo
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  // Agregar primer producto al carrito
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

  // Verificar que el carrito muestra 1 item
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // Ir al carrito
  await page.click('.shopping_cart_link');

  // Verificar que el producto está en el carrito
  await expect(page.locator('.cart_item')).toBeVisible();
});
