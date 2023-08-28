import State from '../state/state';
import { Pages, ID } from './pages';
import { HistoryRouterHandler, RequestParams } from './history-router-handler';

const KEY_FOR_SAVE = {
  LOGIN_STATUS: 'login-status',
};

// const BROWSER_ROUTER_BASENAME = 'eCommerce-Application/';

interface Route {
  path: string;
  callback: (resource?: string) => void;
}

class Router {
  private routes: Route[];

  private state: State;

  public handler: HistoryRouterHandler;

  constructor(routes: Route[], state: State) {
    this.routes = routes;

    this.handler = new HistoryRouterHandler(this.urlChangedHandler.bind(this));

    this.state = state;

    document.addEventListener('DOMContentLoaded', () => {
      this.handler.navigate('');
    });
  }

  public navigate(url: string): void {
    this.handler.navigate(url);
  }

  public urlChangedHandler(requestParams: RequestParams): void {
    const isLoggedIn = this.state.getValue(KEY_FOR_SAVE.LOGIN_STATUS);
    if (requestParams.path === Pages.REGISTRATION || requestParams.path === Pages.LOGIN) {
      if (isLoggedIn === 'true') {
        this.redirectToMain();
        return;
      }
    }

    const pathForFind = requestParams.resource === '' ? requestParams.path : `${requestParams.path}/${ID}`;
    const route = this.routes.find((item) => item.path === pathForFind);

    if (!route) {
      this.redirectToNotFoundPage();
      return;
    }

    route.callback(requestParams.resource);
  }

  private redirectToMain(): void {
    const routeMainPage = this.routes.find((item) => item.path === Pages.INDEX);
    if (routeMainPage) {
      this.navigate(routeMainPage.path);
    }
  }

  public redirectToNotFoundPage(): void {
    const notFoundPage = this.routes.find((item) => item.path === Pages.NOT_FOUND);
    if (notFoundPage) {
      this.navigate(notFoundPage.path);
    }
  }
}

export { Route, Router };
