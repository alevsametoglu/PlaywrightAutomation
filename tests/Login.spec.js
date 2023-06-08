const { test, expect } = require("@playwright/test");
const LoginPage = require("../Pages/LoginPage");


test.describe("Login functionality", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });
  // Test case for successful login with valid credentials
  test("should log in successfully with valid credentials", async ({ page }) => {
    await loginPage.loginWithValidelCredentials();
    // Check if the user link is visible, indicating successful login
    const userLink = page.getByTestId("header-user-links-toggle");
    await expect(userLink).toBeVisible();
  });

  // Test case for unsuccessful login with invalid credentials
  test("should not log in with invalid credentials", async ({ page }) => {
    // Call the login method with invalid email and password
    await loginPage.loginWithInvalideCredentials();

    // Check if the error message is visible, indicating unsuccessful login
    const errorMessage = page.getByText("Email ou mot de passe incorrect");
    await expect(errorMessage).toBeVisible();
  });

  test("should not login with invalid email format", async ({ page }) => {
    // Call the login method with invalid email format
    await loginPage.loginWithInvalidMail();

    // Check if the error message is visible, indicating unsuccessful login
    const invalidMailError = page.locator("div").filter({ hasText: /^Email invalide$/ });
    await expect(invalidMailError).toBeTruthy();
  });

  test("should not login with invalid password ", async ({ page }) => {
    // Call the login method with invalid password
    await loginPage.loginWithInvalidPassword();

    // Check if the error message is visible, indicating unsuccessful login
    const invalidPasswordError = page.getByText("Doit contenir au minimum 8 caractères");
    await expect(invalidPasswordError).toBeTruthy();
  });
});
