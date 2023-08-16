interface IPages {
  [index: string]: string;
}

const Pages: IPages = {
  INDEX: 'main',
  LOGIN: 'login',
  REGISTRATION: 'registration',
  NOT_FOUND: 'not-found',
};

export { IPages, Pages };
