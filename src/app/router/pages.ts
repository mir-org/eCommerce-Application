interface IPages {
  [index: string]: string;
}

const Pages: IPages = {
  INDEX: 'main',
  LOGIN: 'login',
  REGISTRATION: 'registration',
  NOT_FOUND: 'not-found',
};

const ID_SELECTOR = '{id}';

export { IPages, Pages, ID_SELECTOR };
