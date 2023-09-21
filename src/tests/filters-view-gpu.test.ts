import { FiltersView } from '../app/view/main/catalog/categories/graphic-cards/filters/filters-view';
import { Router } from '../app/router/router';
import State from '../app/state/state';

describe('FiltersView', () => {
  let filtersView: FiltersView;
  let router: Router;
  let state: State;
  beforeEach(() => {
    router = new Router([], state);
    filtersView = new FiltersView(router);
  });
  it('should create a AboutView instance', () => {
    expect(filtersView).toBeInstanceOf(FiltersView);
  });
});
