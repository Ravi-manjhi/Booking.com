import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";

test("should allow the user to Register", async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign-In" }).click();
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

  await page.getByRole("link", { name: "Register" }).click();

  await page.locator("[name=firstName]").fill("Ravi");
  await page.locator("[name=lastName]").fill("Manjhi");
  await page.locator("[name=email]").fill("ravi.manjhi19901@gmail.com");
  await page.locator("[name=password]").fill("Test@123");
  await page.locator("[name=confirmPassword]").fill("Test@123");

  await page.getByRole("button", { name: "Register" }).click();

  await expect(page.getByText("User Register Success")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Booking" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
});

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign-In" }).click();

  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

  await page.locator("[name=email]").fill("ravi.manjhi19901@gmail.com");
  await page.locator("[name=password]").fill("Test@123");

  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page.getByText("Login Success")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Booking" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
});
