import State from '../state/state';
import { Pages } from './pages';

const KEY_FOR_SAVE = {
  LOGIN_STATUS: 'login-status',
};

const BROWSER_ROUTER_BASENAME = 'eCommerce-Application/';

interface Route {
  path: string;
  callback: () => void;
}

interface UserRequest {
  path: string;
  resource: string;
}

class Router {
  private routes: Route[];

  private state: State;

  constructor(routes: Route[], state: State) {
    this.routes = routes;
    this.state = state;
    document.addEventListener('DOMContentLoaded', () => {
      const path = this.getCurrentPath();
      this.navigate(path);
    });

    window.addEventListener('popstate', this.browserChangeHandler.bind(this));
    window.addEventListener('hashchange', this.browserChangeHandler.bind(this));
  }

  public navigate(url: string): void {
    const request = this.parseUrl(url);
    const pathForFind = request.resource === '' ? request.path : `${request.path}/${request.resource}`;
    const route = this.routes.find((item) => item.path === pathForFind);
    const isLoggedIn = this.state.getValue(KEY_FOR_SAVE.LOGIN_STATUS);

    if (request.path === Pages.REGISTRATION || request.path === Pages.LOGIN) {
      if (isLoggedIn === 'true') {
        this.redirectToMain();
        return;
      }
    }

    if (!route) {
      this.redirectToNotFound();
    } else {
      route.callback();
      window.history.pushState(null, '', pathForFind);
    }
  }

  private parseUrl(url: string): UserRequest {
    const path = url.split('/');
    const result: UserRequest = {
      path: '',
      resource: '',
    };
    [result.path = '', result.resource = ''] = path;
    return result;
  }

  private redirectToNotFound(): void {
    const routeNotFound = this.routes.find((item) => item.path === Pages.NOT_FOUND);
    if (routeNotFound) {
      this.navigate(routeNotFound.path);
    }
  }

  private redirectToMain(): void {
    const routeMainPage = this.routes.find((item) => item.path === Pages.INDEX);
    if (routeMainPage) {
      this.navigate(routeMainPage.path);
    }
  }

  private browserChangeHandler(): void {
    const path = this.getCurrentPath();
    this.navigate(path);
  }

  private getCurrentPath(): string {
    if (window.location.hash) {
      return window.location.hash.slice(1).replace(BROWSER_ROUTER_BASENAME, '');
    }
    return window.location.pathname.slice(1).replace(BROWSER_ROUTER_BASENAME, '');
  }
}

export { Route, Router };
