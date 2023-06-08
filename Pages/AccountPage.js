// Importing necessary dependencies from Playwright and the LoginPage module
import LoginPage from "./LoginPage";

class AccountPage {
  constructor(page) {
    this.page = page;
    // Initializing the avatar input locator by locating the input element with a specific test ID
    this.avatarInput = page.getByTestId("account-edit-field-avatar").locator('input[type="file"]');
    // Initializing the form submit button locator by locating the button element with a specific test ID
    this.formSubmitButton = page.getByTestId("account-edit-button-submit");
  }

  // Navigates to the account page after performing a successful login
  async gotoAccountPage() {
    await new LoginPage(this.page).loginWithValidelCredentials();
    await this.page.goto("https://www.welcometothejungle.com/fr/me/settings/account");
    // Waits for the account navigation link to be available in the DOM
    await this.page.waitForSelector("a[data-testid='account-nav-links-0-account']");
  }

  // Updates the avatar successfully by setting the input files and clicking the form submit button
  async updateAvatarSuccessful() {
    await this.avatarInput.setInputFiles("assets/avatar.png");
    await this.formSubmitButton.click();
  }

  async updateAvatarUnsuccessful() {
    await this.avatarInput.setInputFiles("assets/avatar.avif");
  }

  async updateAvatarWithInvalidFile() {
    await this.avatarInput.setInputFiles("assets/avatar.txt");
  }

  async updateAvatarWithLargeFile() {
    await this.avatarInput.setInputFiles("assets/avatar-large.jpeg");
  }
}

export default AccountPage;
