import { Router } from '../../router/router';
import { ElementCreator } from '../../utils/element-creator';
import { View } from '../view';
import LinkView from './link-view';
import { IPages, Pages } from '../../router/pages';
import { AuthAPI } from '../../../api/auth-api/auth-api';
import State from '../../state/state';

const CssClasses = {
  HEADER: 'header',
  NAV: ['header__nav', 'nav'],
  USER_MENU: ['header__user-menu', 'user-menu'],
  LOGOUT_BUTTON: ['user-menu__logout-button'],
  HEADER_CART: ['header__cart', 'cart'],
};

const NamePages: IPages = {
  INDEX: 'Main',
  CATALOG: 'Catalog',
  ABOUT_US: 'About Us',
};

const USER_MENU_PAGES: IPages = {
  REGISTRATION: 'Registration',
  LOGIN: 'Login',
  USER_PROFILE: 'Your profile',
  CART: 'Cart',
};

const TEXT = {
  LOGOUT_BUTTON: 'Logout',
};

const KEY_FOR_SAVE = {
  LOGIN_STATUS: 'login-status',
};

class HeaderView extends View {
  private headerLinkElements: Map<string, LinkView>;

  private logoutButton: ElementCreator;

  private cartCounter: ElementCreator | null;

  private cartPrice: ElementCreator | null;

  constructor(router: Router, state: State) {
    super('header', CssClasses.HEADER);
    this.headerLinkElements = new Map();
    this.logoutButton = this.crateLogoutButton();
    this.cartCounter = null;
    this.cartPrice = null;
    this.configView(router, state);
  }

  private configView(router: Router, state: State): void {
    this.addNavigation(router);
    this.addCart();
    this.addUserMenu(router);
    this.logoutButton.getElement().addEventListener('click', this.logoutButtonHandler.bind(this, state));
    this.setLoginStatus(state);
  }

  public setSelectedItem(namePage: string): void {
    const linkItem = this.headerLinkElements.get(namePage.toUpperCase());
    if (linkItem instanceof LinkView) {
      linkItem.setSelectedStatus();
    }
  }

  private addNavigation(router: Router): void {
    const creatorNav = new ElementCreator('nav', CssClasses.NAV);
    Object.keys(NamePages).forEach((key) => {
      const linkParams = {
        name: NamePages[key],
        callback: () => router.navigate(Pages[key]),
      };
      const linkElement = new LinkView(linkParams.name, linkParams.callback, this.headerLinkElements);
      creatorNav.addInnerElement(linkElement.getHTMLElement());
      this.headerLinkElements.set(Pages[key].toUpperCase(), linkElement);
    });

    this.viewElementCreator.addInnerElement(creatorNav);
  }

  private addUserMenu(router: Router): void {
    const userMenuCreator = new ElementCreator('div', CssClasses.USER_MENU);
    Object.keys(USER_MENU_PAGES).forEach((key) => {
      const linkParams = {
        name: USER_MENU_PAGES[key],
        callback: () => router.navigate(Pages[key]),
      };
      const linkElement = new LinkView(linkParams.name, linkParams.callback, this.headerLinkElements);
      userMenuCreator.addInnerElement(linkElement.getHTMLElement());
      this.headerLinkElements.set(Pages[key].toUpperCase(), linkElement);
    });
    userMenuCreator.addInnerElement(this.logoutButton);
    this.viewElementCreator.addInnerElement(userMenuCreator);
  }

  private crateLogoutButton(): ElementCreator {
    const logoutButtonCreator = new ElementCreator('a', CssClasses.LOGOUT_BUTTON, TEXT.LOGOUT_BUTTON);
    return logoutButtonCreator;
  }

  private async logoutButtonHandler(state: State): Promise<void> {
    await AuthAPI.fetchAnonymousToken();
    state.setValue(KEY_FOR_SAVE.LOGIN_STATUS, 'false');
    this.setLoginStatus(state);
  }

  private addCart(): void {
    const cartCreator = new ElementCreator('div', CssClasses.HEADER_CART);
    const cartImage = new ElementCreator('img', 'cart__image');
    cartImage.getElement().setAttribute('src', './assets/images/cart.svg');
    cartCreator.addInnerElement(cartImage);
    this.cartCounter = new ElementCreator('div', 'cart__counter');
    cartCreator.addInnerElement(this.cartCounter);
    this.cartPrice = new ElementCreator('div', 'cart__price');
    cartCreator.addInnerElement(this.cartPrice);

    this.viewElementCreator.addInnerElement(cartCreator);
  }

  public setCartState(counter: string, price: string): void {
    this.cartCounter!.getElement().textContent = counter;
    this.cartPrice!.getElement().textContent = price;
  }

  public setLoginStatus(state: State): void {
    const headerLinks: HTMLElement[] = [
      this.headerLinkElements.get('REGISTRATION')!.getHTMLElement(),
      this.headerLinkElements.get('LOGIN')!.getHTMLElement(),
      this.headerLinkElements.get('PROFILE')!.getHTMLElement(),
      this.logoutButton.getElement(),
    ];
    const isLoggedIn = state.getValue(KEY_FOR_SAVE.LOGIN_STATUS);
    const currentIndexes: number[] = isLoggedIn === 'true' ? [0, 1] : [2, 3];

    headerLinks.forEach((elem, index) => {
      elem.classList.remove('hide');
      if (currentIndexes.includes(index)) elem.classList.add('hide');
    });
  }
}

export default HeaderView;
