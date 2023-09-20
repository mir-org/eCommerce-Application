import { Router } from '../app/router/router';
import State from '../app/state/state';
import IndexView from '../app/view/main/index/index-view';

describe('IndexView', () => {
  let indexView: IndexView;
  let router: Router;
  let state: State;
  beforeEach(() => {
    router = new Router([], state);
    indexView = new IndexView(router);
  });
  it('should create a NotFoundView instance', () => {
    expect(indexView).toBeInstanceOf(IndexView);
  });
});
