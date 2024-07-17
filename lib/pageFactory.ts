import { Page } from "@playwright/test";
import { LoginPage } from "./pages/login.page";
import { HomePage } from "./pages/home.page";
import { CreateLinkPage } from "./pages/links/createLink.page";
import { LinkDetailsPage } from "./pages/links/details.page";
import { LinksPage } from "./pages/links/links.page";

export interface PageFactory {
  withLoginPage(cb: (page: LoginPage) => Promise<void>): Promise<void>;
  withHomePage(cb: (page: HomePage) => Promise<void>): Promise<void>;
  withCreateLinkPage(cb: (page: CreateLinkPage) => Promise<void>): Promise<void>;
  withLinkDetailsPage(cb: (page: LinkDetailsPage) => Promise<void>): Promise<void>;
  withLinksPage(cb: (page: LinksPage) => Promise<void>): Promise<void>;
}

export function createPageFactory(page: Page): PageFactory {
  return {
    async withLoginPage(cb) {
      const p = new LoginPage(page);
      await cb(p);
    },

    async withHomePage(cb) {
      const p = new HomePage(page);
      await cb(p);
    },

    async withCreateLinkPage(cb) {
      const p = new CreateLinkPage(page);
      await cb(p);
    },

    async withLinkDetailsPage(cb) {
      const p = new LinkDetailsPage(page);
      await cb(p);
    },

    async withLinksPage(cb) {
      const p = new LinksPage(page);
      await cb(p);
    },
  };
}
