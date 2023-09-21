interface IPages {
  [index: string]: string;
}

const Pages: IPages = {
  INDEX: 'main',
  LOGIN: 'login',
  REGISTRATION: 'registration',
  USER_PROFILE: 'profile',
  CATALOG: 'catalog',
  PROCESSORS: 'processors',
  GRAPHIC_CARDS: 'graphic-cards',
  NOT_FOUND: 'not-found',
  ABOUT_US: 'about-us',
  CART: 'cart',
};

const ID = '{id}';

export { IPages, Pages, ID };
