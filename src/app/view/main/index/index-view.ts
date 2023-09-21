import { ElementCreator } from '../../../utils/element-creator';
import { View } from '../../view';
import LinkView from '../../header/link-view';
import { Pages, IPages } from '../../../router/pages';
import { Router } from '../../../router/router';

const CssClasses = {
  INDEX: 'index',
  TITLE: 'index__title',
  LINKS: 'index__links',
  BUTTON: 'index__btn',
  FIX_IT: 'primary-button',
  INFO: 'index__info',
  INFO_PROMO: 'index__info-promo',
  INFO_IMG: 'index__info-img',
  INFO_TEXT: 'index__info-text',
};
const BUTTONS: IPages = {
  LOGIN: 'Login',
  REGISTRATION: 'Registration',
  CATALOG: 'Catalog',
  ABOUT_US: 'About Us',
  PROCESSORS: 'Processors',
  GRAPHIC_CARDS: 'Graphic Cards',
};

class IndexView extends View {
  private headerLinkElements: Map<string, LinkView>;

  constructor(router: Router) {
    super('section', CssClasses.INDEX);
    this.headerLinkElements = new Map();
    this.configView(router);
  }

  private configView(router: Router): void {
    this.createInfoBlock();
    this.createLinkBlock(router);
  }

  private createInfoBlock(): void {
    const infoBlock = new ElementCreator('div', CssClasses.INFO);
    const promoCode = new ElementCreator(
      'div',
      CssClasses.INFO_PROMO,
      'Try a GRAYSEPTEMBER promo code for 10% discount!'
    );
    const shopImage = new ElementCreator('img', CssClasses.INFO_IMG, '');
    shopImage.getElement().setAttribute('src', './assets/images/shop.jpg');
    const shopText = new ElementCreator(
      'div',
      CssClasses.INFO_TEXT,
      `Welcome to GigaGoods, your one-stop destination for all your PC hardware needs! Whether you're a gaming enthusiast, a professional content creator, or simply looking to upgrade your computer, we've got you covered.
    At GigaGoods, we take pride in offering an extensive range of high-quality PC parts and accessories to help you build, upgrade, or customize your dream computer setup. With a passion for technology and a commitment to excellence,
    we bring you the latest and most sought-after components from leading manufacturers. From powerful processors and graphics cards to lightning-fast SSDs, dependable power supplies, and stylish cases, our carefully curated selection ensures you have access to the best hardware options available in the market.`
    );
    infoBlock.addInnerElement(promoCode);
    infoBlock.addInnerElement(shopImage);
    infoBlock.addInnerElement(shopText);
    this.viewElementCreator.addInnerElement(infoBlock);
  }

  private createLinkBlock(router: Router): void {
    const navWrapper = new ElementCreator('div', CssClasses.LINKS);
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
