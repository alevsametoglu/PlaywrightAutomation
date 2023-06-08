// Importing the necessary dependencies from Playwright and custom pages
import { test as base } from "@playwright/test";
import { LoginPage, AccountPage } from "../Pages";

// Extending the base test and providing fixture setup functions
export const test = base.extend({
  // Setting up the login page fixture
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page)); // Creating an instance of LoginPage and passing it to 'use'
  },
  // Setting up the account page fixture
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page)); // Creating an instance of AccountPage and passing it to 'use'
  },
});

// Re-exporting the 'expect' function from Playwright test
export { expect } from "@playwright/test";
