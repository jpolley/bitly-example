import { Page } from "@playwright/test";

export class LoginPage {
  readonly email = this.page.getByLabel("Email");
  readonly password = this.page.getByLabel("Password");
  readonly loginButton = this.page.getByRole("button", { name: "Log in" });
  readonly invalidCredentialsError = this.page.getByText("Email / username or password is incorrect.");
  readonly dismissCookiesElement = this.page.getByRole("button", { name: "Close" });

  async goto() {
    await this.page.goto("https://bitly.com/a/sign_in");
  }

  async login(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.dismissCookies();
    await this.loginButton.click();
  }

  async loginWithValidCredentials() {
    await this.login(process.env.USER_EMAIL ?? "", process.env.USER_PASSWORD ?? "");
  }

  async dismissCookies() {
    if (await this.dismissCookiesElement.isVisible()) {
      await this.dismissCookiesElement.click();
    }
  }

  constructor(private readonly page: Page) {}
}
