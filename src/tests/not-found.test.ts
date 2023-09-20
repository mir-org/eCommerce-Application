import { Router } from '../app/router/router';
import State from '../app/state/state';
import NotFoundView from '../app/view/main/not-found/not-found-view';

describe('NotFoundView', () => {
  let notFoundView: NotFoundView;
  let router: Router;
  let state: State;
  beforeEach(() => {
    router = new Router([], state);
    notFoundView = new NotFoundView(router);
  });
  it('should create a NotFoundView instance', () => {
    expect(notFoundView).toBeInstanceOf(NotFoundView);
  });
});
