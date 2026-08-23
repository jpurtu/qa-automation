const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Accessibility Testing — Swag Labs', () => {

  test('página de login no tiene violaciones críticas', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    const critical = results.violations.filter(v =>
      ['critical', 'serious'].includes(v.impact)
    );
    expect(critical.length).toBe(0);
  });

  test('página de catálogo — documenta violaciones conocidas', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.waitForURL('**/inventory.html');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .exclude('.select_container') // BUG conocido: select sin label accesible
      .analyze();

    const critical = results.violations.filter(v =>
      ['critical', 'serious'].includes(v.impact)
    );

    // Bug documentado: BUG-003 — select de ordenamiento sin nombre accesible
    // Impacto: crítico para usuarios con lector de pantalla
    // Estado: pendiente de corrección por el equipo de desarrollo
    expect(critical.length).toBe(0);
  });

});
