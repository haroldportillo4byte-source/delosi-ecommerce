import { expect, test } from "@playwright/test";

test("product detail exposes SEO metadata and canonical route", async ({ page }) => {
  await page.goto("/products/1");

  await expect(page).toHaveURL(/\/products\/1$/);
  await expect(page.getByRole("heading", { level: 1, name: /Fjallraven/i })).toBeVisible();

  const title = await page.title();
  expect(title.length).toBeGreaterThan(0);
  expect(title).toMatch(/Fjallraven/i);

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute("content", /.+/);

  const ogTitle = page.locator('meta[property="og:title"]');
  await expect(ogTitle).toHaveAttribute("content", /.+/);
});

test("legacy /product/:id redirects to /products/:id", async ({ page }) => {
  await page.goto("/product/1");
  await expect(page).toHaveURL(/\/products\/1$/);
});
