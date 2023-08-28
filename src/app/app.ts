import { Route, Router } from './router/router';
import FooterView from './view/footer/footer-view';
import HeaderView from './view/header/header-view';
import MainView from './view/main/main-view';
import WrapperView from './view/wrapper';
import { Pages } from './router/pages';
import { View } from './view/view';
import State from './state/state';
import { AuthAPI } from '../api/auth-api/auth-api';

class App {
  private router: Router;

  private header: HeaderView | null;

  private main: MainView | null;

  constructor() {
    AuthAPI.setAccessToken();
    this.header = null;
    this.main = null;
    const state = new State();
    const routes = this.createRoutes(state);
    this.router = new Router(routes, state);
    this.createView(state);
  }

  private createView(state: State): void {
    const wrapperView = new WrapperView();
    this.header = new HeaderView(this.router, state);
    this.main = new MainView();
    const footer = new FooterView();

    wrapperView
      .getHTMLElement()
      .append(this.header.getHTMLElement(), this.main.getHTMLElement(), footer.getHTMLElement());

    document.body.append(wrapperView.getHTMLElement());
  }

  /* eslint-disable max-lines-per-function */
  private createRoutes(state: State): Route[] {
    const result: Route[] = [
      {
        path: '',
        callback: async () => {
          const { default: IndexView } = await import('./view/main/index/index-view');
          this.setContent(Pages.INDEX, new IndexView(this.router));
        },
      },
      {
        path: `${Pages.INDEX}`,
        callback: async () => {
          const { default: IndexView } = await import('./view/main/index/index-view');
          this.setContent(Pages.INDEX, new IndexView(this.router));
        },
      },
      {
        path: `${Pages.LOGIN}`,
        callback: async () => {
          const { default: LoginView } = await import('./view/main/login/login-view');
          this.setContent(Pages.LOGIN, new LoginView(this.router, this.header, state));
        },
      },
      {
        path: `${Pages.REGISTRATION}`,
        callback: async () => {
          const { default: RegistrationView } = await import('./view/main/registration/registration-view');
          this.setContent(Pages.REGISTRATION, new RegistrationView(this.router, this.header, state));
        },
      },
      {
        path: `${Pages.CATALOG}`,
        callback: async () => {
          const { default: CatalogView } = await import('./view/main/catalog/catalog-view');
          this.setContent(Pages.CATALOG, new CatalogView(this.router));
        },
      },
      {
        path: `${Pages.NOT_FOUND}`,
        callback: async () => {
          const { default: NotFoundView } = await import('./view/main/not-found/not-found-view');
          this.setContent(Pages.NOT_FOUND, new NotFoundView(this.router));
        },
      },
    ];
    return result;
  }
  /* eslint-enable max-lines-per-function */

  private setContent(page: string, view: View): void {
    this.header?.setSelectedItem(page);
    this.main?.setContent(view);
  }
}

export default App;
