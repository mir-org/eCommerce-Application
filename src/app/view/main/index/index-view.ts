import { ElementCreator } from '../../../utils/element-creator';
import { View } from '../../view';
import LinkView from '../../header/link-view';
import { Pages, IPages } from '../../../router/pages';
import { Router } from '../../../router/router';

const CssClasses = {
  INDEX: 'index',
  TITLE: 'index__title',
  WRAPPER: 'index__wrapper',
  BUTTON: 'index__btn',
  FIX_IT: 'primary-button',
  PROMO_CODE: 'promo-code',
};
const BUTTONS: IPages = {
  LOGIN: 'Login',
  REGISTRATION: 'Registration',
};

class IndexView extends View {
  private headerLinkElements: Map<string, LinkView>;

  constructor(router: Router) {
    super('section', CssClasses.INDEX);
    this.headerLinkElements = new Map();
    this.configView(router);
  }

  private configView(router: Router): void {
    const title = new ElementCreator('h1', CssClasses.TITLE);
    this.viewElementCreator.addInnerElement(title);
    const infoBlock = new ElementCreator(
      'div',
      CssClasses.PROMO_CODE,
      'Try a GRAYSEPTEMBER promo code for 10% discount!'
    );
    this.viewElementCreator.addInnerElement(infoBlock);
    const navWrapper = new ElementCreator('div', CssClasses.WRAPPER);
    this.viewElementCreator.addInnerElement(navWrapper);
    Object.keys(BUTTONS).forEach((key) => {
      const linkParams = {
        name: BUTTONS[key],
        callback: () => router.navigate(Pages[key]),
      };
      const linkElement = new LinkView(linkParams.name, linkParams.callback, this.headerLinkElements);
      linkElement.getHTMLElement().classList.add(CssClasses.BUTTON, CssClasses.FIX_IT);
      navWrapper.addInnerElement(linkElement.getHTMLElement());
      this.headerLinkElements.set(Pages[key].toUpperCase(), linkElement);
    });
  }
}

export default IndexView;
