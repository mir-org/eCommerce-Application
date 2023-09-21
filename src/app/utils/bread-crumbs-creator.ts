import { Router } from '../router/router';
import { ElementCreator } from './element-creator';

type BreadCrumbsInfo = BreadCrumbInfo[];
type BreadCrumbInfo = {
  text: string;
  isCurrent: boolean;
  pagePath: string;
};

export const BREAD_CRUMBS_CLASSES = {
  BREAD_CRUMBS: 'bread-crumbs',
  BREAD_CRUMBS_ELEMENT: 'bread-crumbs__element',
  BREAD_CRUMBS_LINK: 'bread-crumbs__link',
  BREAD_CRUMBS_LINK_ACTIVE: 'bread-crumbs__link--active',
};

export class BreadCrumbsCreator {
  private element: ElementCreator;

  constructor(
    breadCrumbsInfo: BreadCrumbsInfo,
    private router: Router
  ) {
    this.element = new ElementCreator('ul', BREAD_CRUMBS_CLASSES.BREAD_CRUMBS);
    this.createBreadCrumbs(breadCrumbsInfo);
  }

  private createBreadCrumbs(breadCrumbsInfo: BreadCrumbsInfo): void {
    breadCrumbsInfo.forEach((breadCrumbInfo) => {
      const elementCreator = new ElementCreator('li', BREAD_CRUMBS_CLASSES.BREAD_CRUMBS_ELEMENT);
      const cssClasses = breadCrumbInfo.isCurrent
        ? [BREAD_CRUMBS_CLASSES.BREAD_CRUMBS_LINK, BREAD_CRUMBS_CLASSES.BREAD_CRUMBS_LINK_ACTIVE]
        : BREAD_CRUMBS_CLASSES.BREAD_CRUMBS_LINK;
      const linkCreator = new ElementCreator('a', cssClasses, breadCrumbInfo.text);
      linkCreator.getElement().addEventListener('click', () => this.router.navigate(breadCrumbInfo.pagePath));
      elementCreator.addInnerElement(linkCreator);
      this.element.addInnerElement(elementCreator);
    });
  }

  public getElement(): HTMLElement {
    return this.element.getElement();
  }
}
