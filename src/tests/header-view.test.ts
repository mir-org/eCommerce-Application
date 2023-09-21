import { Router } from '../app/router/router';
import State from '../app/state/state';
import HeaderView from '../app/view/header/header-view';

describe('HeaderView', () => {
  let headerView: HeaderView;
  let router: Router;
  let state: State;
  beforeEach(() => {
    router = new Router([], state);
    state = new State();
    headerView = new HeaderView(router, state);
  });
  it('should create an instance of HeaderView', () => {
    expect(headerView).toBeInstanceOf(HeaderView);
  });
});
