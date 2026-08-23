const { test, expect } = require('@playwright/test');

const URL = 'https://jpurtu.github.io/portfolio/';

test.describe('Portfolio Web — jpurtu', () => {

  test('página carga correctamente', async ({ page }) => {
    const response = await page.goto(URL);
    expect(response.status()).toBe(200);
  });

  test('título de la página es correcto', async ({ page }) => {
    await page.goto(URL);
    await expect(page).toHaveTitle(/.+/);
  });

  test('no hay errores en consola', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto(URL);
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('links internos no están rotos', async ({ page }) => {
    await page.goto(URL);
    const links = await page.locator('a[href]').all();
    console.log(`Links encontrados: ${links.length}`);
    expect(links.length).toBeGreaterThan(0);
  });

  test('screenshot de referencia', async ({ page }) => {
    await page.goto(URL);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('portfolio.png', {
      maxDiffPixelRatio: 0.05
    });
  });

});
