import { Pages } from '../../../router/pages';

export const CATALOG_CLASSES = {
  CATALOG: 'catalog',
  LINKS_WRAPPER: 'catalog__links-wrapper',
  LINK: 'catalog__link',
  LINK_IMG: 'catalog__link-img',
  LINK_TEXT: 'catalog__link-text',
};

export const CATALOG_TEXT = {
  PROCESSORS_LINK: 'Processors',
  GRAPHIC_CARDS_LINK: 'Graphic cards',
};

export type CatalogLinkParams = {
  src: string;
  text: string;
  callback: () => void;
};

export const BREAD_CRUMBS_INFO = [
  {
    text: 'PC-Components',
    isCurrent: true,
    pagePath: Pages.CATALOG,
  },
];
