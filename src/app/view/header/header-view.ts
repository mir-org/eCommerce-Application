import { Router } from '../../router/router';
import { ElementCreator } from '../../utils/element-creator';
import { View } from '../view';
import LinkView from './link-view';
import { IPages, Pages } from '../../router/pages';
import { AuthAPI } from '../../../api/authAPI/authAPI';
import State from '../../state/state';

const CssClasses = {
  HEADER: 'header',
  NAV: ['header__nav', 'nav'],
  LOGOUT_BUTTON: 'header__logout-button',
  SHOW_LOGOUT_BUTTON: 'show',
  HIDE_LINK_ELEMENT: 'hide',
};

const NamePages: IPages = {
  INDEX: 'Main',
  LOGIN: 'Login',
  REGISTRATION: 'Registration',
  CATALOG: 'Catalog',
};

const TEXT = {
  LOGOUT_BUTTON: 'Logout',
};

const KEY_FOR_SAVE = {
  LOGIN_STATUS: 'login-status',
};

class HeaderView extends View {
  private headerLinkElements: Map<string, LinkView>;

  private logoutButton: HTMLElement | null;

  constructor(router: Router, state: State) {
    super('header', CssClasses.HEADER);
    this.headerLinkElements = new Map();
    this.logoutButton = null;
    this.configView(router, state);
  }

  private configView(router: Router, state: State): void {
    this.addNavigation(router, state);
    this.addLogoutButton(router, state);
  }

  public setSelectedItem(namePage: string): void {
    const linkItem = this.headerLinkElements.get(namePage.toUpperCase());
    if (linkItem instanceof LinkView) {
      linkItem.setSelectedStatus();
    }
  }

  private addNavigation(router: Router, state: State): void {
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
    // Сука руки бы вырвал
    this.hideLoginLink(state);
    this.viewElementCreator.addInnerElement(creatorNav);
  }

  // Эта ебанина тригерится из другой вьюшки.
  public customerLogin(state: State): void {
    this.logoutButton?.classList.add('show');
    this.hideLoginLink(state);
  }

  /* Эта ебанина тригерится ебаниной выше, которая тригерится из другой вьюшки.
  Она типо прячет ссылки на логин и регистрацию */
  private hideLoginLink(state: State): void {
    const isLoggedIn = state.getValue(KEY_FOR_SAVE.LOGIN_STATUS);
    if (isLoggedIn === 'true') {
      const loginLink = this.headerLinkElements.get('LOGIN');
      loginLink?.getHTMLElement().classList.add(CssClasses.HIDE_LINK_ELEMENT);
      const registrationLink = this.headerLinkElements.get('REGISTRATION');
      registrationLink?.getHTMLElement().classList.add(CssClasses.HIDE_LINK_ELEMENT);
    }
  }

  // У это ебанины корявое название, и нахуй она учавствует в создании кнопки.
  private showLogoutButton(state: State): void {
    const isLoggedIn = state.getValue(KEY_FOR_SAVE.LOGIN_STATUS);
    if (isLoggedIn === 'true') {
      this.logoutButton?.classList.add(CssClasses.SHOW_LOGOUT_BUTTON);
    }
  }

  private addLogoutButton(router: Router, state: State): void {
    const logoutButtonCreator = new ElementCreator('button', CssClasses.LOGOUT_BUTTON, TEXT.LOGOUT_BUTTON);
    const logoutButtonElement = logoutButtonCreator.getElement();
    this.logoutButton = logoutButtonElement;
    logoutButtonElement.addEventListener('click', this.logoutButtonClickFn.bind(this, router, state));
    // Тригерится ебаниной выше
    this.showLogoutButton(state);
    this.viewElementCreator.addInnerElement(logoutButtonElement);
  }

  // Что это нахуй такое? Это последний триггер.
  private async logoutButtonClickFn(router: Router, state: State): Promise<void> {
    await AuthAPI.fetchAnonymousToken();
    // Это куда, зачем?
    router.navigate(Pages.LOGIN);
    this.logoutButton?.classList.remove(CssClasses.SHOW_LOGOUT_BUTTON);
    const loginLink = this.headerLinkElements.get('LOGIN');
    loginLink?.getHTMLElement().classList.remove(CssClasses.HIDE_LINK_ELEMENT);
    const registrationLink = this.headerLinkElements.get('REGISTRATION');
    registrationLink?.getHTMLElement().classList.remove(CssClasses.HIDE_LINK_ELEMENT);
    state.setValue(KEY_FOR_SAVE.LOGIN_STATUS, 'false');
  }
}

export default HeaderView;
