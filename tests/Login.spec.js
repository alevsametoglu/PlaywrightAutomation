import { test, expect } from "../core/myTest";

test.describe("Login functionality", () => {
  // Test case for successful login with valid credentials
  test("should log in successfully with valid credentials", async ({ page, loginPage }) => {
    await test.step("Perform succesful log in ", async () => {
      await loginPage.loginWithValidelCredentials();
    });
    // Check if the user link is visible, indicating successful login
    await test.step("Check if the user link is visible", async () => {
      const userLink = page.getByTestId("header-user-links-toggle");
      await expect(userLink).toBeVisible();
    });
  });

  // Test case for unsuccessful login with invalid credentials
  test("should not log in with invalid credentials", async ({ page, loginPage }) => {
    // Call the login method with invalid email and password
    await test.step("Perform login with invalid credentials", async () => {
      await loginPage.loginWithValidelCredentials();
    });

    // Check if the error message is visible, indicating unsuccessful login
    await test.step("Check if error message is visible", async () => {
      const errorMessage = page.getByTestId("modal-content-home").locator("div").filter({ hasText: "Email ou mot de passe incorrect" }).nth(1);
      await expect(errorMessage).toBeTruthy();
    });
  });

  test("should not login with invalid email format", async ({ page, loginPage }) => {
    // Call the login method with invalid email format
    await test.step("Perform login with invalid email", async () => {
      await loginPage.loginWithInvalidMail();
    });

    // Check if email validation error message is visible, indicating unsuccessful login
    await test.step("Check if email validation error message is visible", async () => {
      const emailError = page.locator("div").filter({ hasText: /^Email invalide$/ });
      await expect(emailError).toHaveText("Email invalide");
    });
  });

  test("should not login with invalid password ", async ({ page, loginPage }) => {
    // Call the login method with invalid password
    await test.step("Perform login with invalid password", async () => {
      await loginPage.loginWithInvalidPassword();
    });

    // Check if the error message is visible, indicating unsuccessful login
    await test.step("Check if password validation error message is visible", async () => {
      const passwordError = page.locator("div").filter({ hasText: /^Doit contenir au minimum 8 caractères$/ });
      await expect(passwordError).toHaveText("Doit contenir au minimum 8 caractères");
    });
  });
});
