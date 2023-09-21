import { Observer } from '../app/observer/observer';
import { Router } from '../app/router/router';
import State from '../app/state/state';
import LoginView from '../app/view/main/login/login-view';

describe('LoginView', () => {
  let loginView: LoginView;
  let router: Router;
  let state: State;
  let observer: Observer;
  beforeEach(() => {
    router = new Router([], state);
    loginView = new LoginView(router, observer, state);
  });
  it('should create a NotFoundView instance', () => {
    expect(loginView).toBeInstanceOf(LoginView);
  });
});
