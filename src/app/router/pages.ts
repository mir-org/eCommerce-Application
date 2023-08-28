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

export { IPages, Pages };
