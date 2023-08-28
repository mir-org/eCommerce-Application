interface IPages {
  [index: string]: string;
}

const Pages: IPages = {
  INDEX: 'main',
  LOGIN: 'login',
  REGISTRATION: 'registration',
  CATALOG: 'catalog',
  NOT_FOUND: 'not-found',
};

const ID = '{id}';

export { IPages, Pages, ID };
