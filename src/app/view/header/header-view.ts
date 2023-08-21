import { Router } from '../../router/router';
import { ElementCreator } from '../../utils/element-creator';
import { View } from '../view';
import LinkView from './link-view';
import { IPages, Pages } from '../../router/pages';

const CssClasses = {
  HEADER: 'header',
  NAV: 'header__nav',
};

const NamePages: IPages = {
  INDEX: 'Main',
  LOGIN: 'Login',
  REGISTRATION: 'Registration',
};

class HeaderView extends View {
  private headerLinkElements: Map<string, LinkView>;

  constructor(router: Router) {
    super('header', CssClasses.HEADER);
    this.headerLinkElements = new Map();
    this.configView(router);
  }

  private configView(router: Router): void {
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

  public setSelectedItem(namePage: string): void {
    console.log(namePage);
    const linkItem = this.headerLinkElements.get(namePage.toUpperCase());
    console.log(linkItem);
    if (linkItem instanceof LinkView) {
      linkItem.setSelectedStatus();
    }
  }
}

export default HeaderView;
