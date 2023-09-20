import RegistrationView from '../app/view/main/registration/registration-view';
import { Router } from '../app/router/router';
import State from '../app/state/state';
import { Observer } from '../app/observer/observer';

describe('RegistrationView', () => {
  let registrationView: RegistrationView;
  let router: Router;
  let state: State;
  let observer: Observer;
  beforeEach(() => {
    router = new Router([], state);
    registrationView = new RegistrationView(router, observer, state);
  });
  it('should create a AboutView instance', () => {
    expect(registrationView).toBeInstanceOf(RegistrationView);
  });
});
