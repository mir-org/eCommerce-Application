import { BreadCrumbsCreator } from '../app/utils/bread-crumbs-creator';
import { Router } from '../app/router/router';

describe('BreadCrumbsCreator', () => {
  let router: Router;
  it('should create an instance of BreadCrumbsCreator', () => {
    const breadCrumbsInfo = [
      { text: 'Main', isCurrent: false, pagePath: '/main' },
      { text: 'Catalog', isCurrent: true, pagePath: '/catalog' },
      { text: 'About Us', isCurrent: false, pagePath: '/about-us' },
    ];
    const breadCrumbsCreator = new BreadCrumbsCreator(breadCrumbsInfo, router);
    expect(breadCrumbsCreator).toBeInstanceOf(BreadCrumbsCreator);
  });
});
