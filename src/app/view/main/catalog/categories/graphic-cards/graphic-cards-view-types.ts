import { Pages } from '../../../../../router/pages';

export const CATEGORY_CLASSES = {
  CATALOG: 'category',
  TITLE: 'category__title',
  CONTENT: 'category__content',
  ASIDE: 'category__content-aside',
  PRODUCTS: 'category__content-products',
};

export const CATEGORY_TEXT = {
  TITLE: 'Catalog',
  CONTENT: '',
  ASIDE: '',
  PRODUCTS: '',
};

export const BREAD_CRUMBS_INFO = [
  {
    text: 'PC-Components',
    isCurrent: false,
    pagePath: Pages.CATALOG,
  },
  {
    text: 'Video cards',
    isCurrent: true,
    pagePath: Pages.GRAPHIC_CARDS,
  },
];
