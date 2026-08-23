class InventoryPage {
  constructor(page) {
    this.page = page;
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.addBackpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  }

  async addBackpackToCart() {
    await this.addBackpackButton.click();
  }

  async getCartCount() {
    return this.cartBadge.textContent();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

module.exports = { InventoryPage };
