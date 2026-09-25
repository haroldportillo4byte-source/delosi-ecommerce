import { expect, test } from "@playwright/test";

test("cart items persist after reload via localStorage", async ({ page }) => {
  await page.goto("/products/1");

  await page.getByRole("button", { name: /Agregar.*al carrito/i }).click();
  await expect(page.getByLabel(/Carrito con 1 productos/i)).toBeVisible();

  await page.reload();
  await expect(page.getByLabel(/Carrito con 1 productos/i)).toBeVisible();

  await page.getByLabel(/Carrito con 1 productos/i).click();
  await expect(page.getByRole("heading", { name: /Tu carrito \(1\)/i })).toBeVisible();
});
