import { Route, Router } from './router/router';
import FooterView from './view/footer/footer-view';
import HeaderView from './view/header/header-view';
import MainView from './view/main/main-view';
import WrapperView from './view/wrapper';
import { Pages } from './router/pages';
import IndexView from './view/main/index/index-view';
import { View } from './view/view';
import LoginView from './view/main/login/login-view';
import NotFoundView from './view/main/not-found/not-found-view';
import RegistrationView from './view/main/registration/registration-view';
import State from './state/state';
import { AuthAPI } from '../api/authAPI/authAPI';

class App {
  private router: Router;

  private header: HeaderView | null;

  private main: MainView | null;

  constructor() {
    this.header = null;
    this.main = null;
    const state = new State();
    const routes = this.createRoutes(state);
    this.router = new Router(routes);
    AuthAPI.setAccessToken();
    this.createView();
  }

  private createView(): void {
    const wrapperView = new WrapperView();
    this.header = new HeaderView(this.router);
    this.main = new MainView();
    const footer = new FooterView();

    wrapperView
      .getHTMLElement()
      .append(this.header.getHTMLElement(), this.main.getHTMLElement(), footer.getHTMLElement());

    document.body.append(wrapperView.getHTMLElement());
  }

  private createRoutes(state: State): Route[] {
    const result: Route[] = [
      {
        path: ``,
        callback: () => {
          this.main?.setContent(new IndexView());
        },
      },
      {
        path: `${Pages.INDEX}`,
        callback: () => {
          this.main?.setContent(new IndexView());
        },
      },
      {
        path: `${Pages.LOGIN}`,
        callback: () => {
          this.main?.setContent(new LoginView(state));
        },
      },
      {
        path: `${Pages.REGISTRATION}`,
        callback: () => {
          this.main?.setContent(new RegistrationView(state));
        },
      },
      {
        path: `${Pages.NOT_FOUND}`,
        callback: () => {
          this.main?.setContent(new NotFoundView());
        },
      },
    ];
    return result;
  }

  // TODO из-за этого багался колл-стек, разобрать.
  public setContent(pageName: string, view: View): void {
    // TODO или из-за этого.
    this.header?.setSelectedItem(pageName);
    this.main?.setContent(view);
  }
}

export default App;
