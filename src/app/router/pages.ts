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
  NOT_FOUND: 'not-found',
};

const ID = '{id}';

export { IPages, Pages, ID };
