import { Pages } from './pages';

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

  constructor(routes: Route[]) {
    this.routes = routes;
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
    console.log('путь', typeof route?.path, route?.path);
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

  private browserChangeHandler(): void {
    const path = this.getCurrentPath();
    this.navigate(path);
  }

  private getCurrentPath(): string {
    if (window.location.hash) {
      return window.location.hash.slice(1);
    }
    return window.location.pathname.slice(1);
  }
}

export { Route, Router };
