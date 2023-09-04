import { Router } from '../../../router/router';
import { ElementCreator } from '../../../utils/element-creator';
import { View } from '../../view';
import { BREAD_CRUMBS_INFO, CATALOG_CLASSES, CATALOG_TEXT, CatalogLinkParams } from './catalog-view-types';
import { Pages } from '../../../router/pages';
import { BreadCrumbsCreator } from '../../../utils/bread-crumbs-creator';

export default class CatalogView extends View {
  constructor(private router: Router) {
    super('section', CATALOG_CLASSES.CATALOG);
    this.configureView();
  }

  private configureView(): void {
    this.addBreadCrumbs();
    this.addCategoryLinks();
  }

  private addBreadCrumbs(): void {
    const breadCrumbsCreator = new BreadCrumbsCreator(BREAD_CRUMBS_INFO, this.router);
    this.viewElementCreator.addInnerElement(breadCrumbsCreator.getElement());
  }

  private addCategoryLinks(): void {
    const linksBlockCreator = new ElementCreator('div', CATALOG_CLASSES.LINKS_WRAPPER);
    const processorsLinkElement = this.getProcessorsLink({
      src: '../../../../assets/images/cpu.svg',
      text: CATALOG_TEXT.PROCESSORS_LINK,
      callback: () => this.router.navigate(Pages.INDEX),
    });
    const graphicCardsLinkElement = this.getProcessorsLink({
      src: '../../../../assets/images/graphic-card.svg',
      text: CATALOG_TEXT.GRAPHIC_CARDS_LINK,
      callback: () => this.router.navigate(Pages.INDEX),
    });
    linksBlockCreator.addInnerElement(processorsLinkElement);
    linksBlockCreator.addInnerElement(graphicCardsLinkElement);
    this.viewElementCreator.addInnerElement(linksBlockCreator);
  }

  private getProcessorsLink(linkParams: CatalogLinkParams): HTMLElement {
    const linkElementCreator = new ElementCreator('a', CATALOG_CLASSES.LINK);
    const linkImgCreator = new ElementCreator('img', CATALOG_CLASSES.LINK_IMG);
    linkImgCreator.getElement().setAttribute('src', linkParams.src);
    linkElementCreator.addInnerElement(linkImgCreator);
    const linkTextCreator = new ElementCreator('div', CATALOG_CLASSES.LINK_TEXT, linkParams.text);
    linkElementCreator.getElement().addEventListener('click', linkParams.callback);
    linkElementCreator.addInnerElement(linkTextCreator);
    return linkElementCreator.getElement();
  }
}
