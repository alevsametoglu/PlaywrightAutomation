class LoginPage {
  /**
   * Constructs a new instance of the LoginPage class.
   */
  constructor(page) {
    this.page = page;
    this.mailInput = page.getByTestId("login-field-email"); // Locator for the email input field
    this.passwordInput = page.getByTestId("login-field-password"); // Locator for the password input field
    this.loginButton = page.getByTestId("login-button-submit"); // Locator for the login button
  }

  /**
   * Go to login page url
   */
  goToLoginPage = async () => {
    await this.page.goto("https://www.welcometothejungle.com/fr/me/settings/account");
  };

  /**
   * Logs in with valide credentials.
   * Fills the email and password inputs with valid values and clicks the submit button.
   */
  async loginWithValidelCredentials() {
    await this.goToLoginPage();
    await this.mailInput.fill("inqom.qaautomationapplicant@gmail.com");
    await this.passwordInput.fill("o5N,d5ZR@R7^");
    await this.loginButton.click();
    await this.page.waitForSelector("button[data-testid='header-user-links-toggle']");
  }

  /**
   * Logs in with invalide credentials.
   * Fills the email and password inputs with invalid values and clicks the submit button.
   */
  async loginWithInvalideCredentials() {
    await this.goToLoginPage();
    await this.mailInput.fill("xxx@gmail.com");
    await this.passwordInput.fill("111111111111");
    await this.loginButton.click();
  }

  /**
   * Logs in with an invalid email.
   * Fills the email input with an invalid value, fills the password input with a valid value, and clicks the submit button.
   */
  async loginWithInvalidMail() {
    await this.goToLoginPage();
    await this.mailInput.fill("xxxxx");
    await this.passwordInput.fill("o5N,d5ZR@R7^");
    await this.loginButton.click();
  }

  /**
   * Logs in with an invalid password.
   * Fills the email input with a valid value, fills the password input with an invalid value, and clicks the submit button.
   */
  async loginWithInvalidPassword() {
    await this.goToLoginPage();
    await this.mailInput.fill("inqom.qaautomationapplicant@gmail.com");
    await this.passwordInput.fill("111");
    await this.loginButton.click();
  }
}

module.exports = LoginPage;
