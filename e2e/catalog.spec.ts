import { expect, test } from "@playwright/test";

test("catalog filters and add to cart update header badge", async ({ page }) => {
  await page.goto("/products");

  await expect(page.getByRole("heading", { name: "Catálogo de productos" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Explora por categoría" })).toBeVisible();

  await page.getByRole("link", { name: "💻 electronics" }).click();
  await expect(page).toHaveURL(/category=electronics/);

  await page.locator("article a").first().click();
  await expect(page).toHaveURL(/\/product\/\d+/);

  await page.getByRole("button", { name: "Agregar al carrito" }).click();
  await expect(page.getByLabel(/Carrito con 1 productos/i)).toBeVisible();
});
