import { Route, Router } from './router/router';
import FooterView from './view/footer/footer-view';
import HeaderView from './view/header/header-view';
import MainView from './view/main/main-view';
import WrapperView from './view/wrapper';
import { Pages, ID } from './router/pages';
import { View } from './view/view';
import State from './state/state';
import { AuthAPI } from '../api/auth-api/auth-api';
import Observer from './observer/observer';

class App {
  private router: Router;

  private header: HeaderView | null;

  private main: MainView | null;

  private observer: Observer;

  constructor() {
    AuthAPI.setAccessToken();
    this.header = null;
    this.main = null;
    const state = new State();
    const routes = this.createRoutes(state);
    this.router = new Router(routes, state);
    this.observer = new Observer();
    this.createView(state);
    window.addEventListener('not-found', async () => {
      const { default: NotFoundView } = await import('./view/main/not-found/not-found-view');
      this.main?.setContent(new NotFoundView(this.router));
      document.title = 'Not Found';
    });
  }

  private createView(state: State): void {
    const wrapperView = new WrapperView();
    this.header = new HeaderView(this.router, state);
    this.observer.setHeader(this.header);
    this.observer.setCartState();
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
          document.title = 'Main';
        },
      },
      {
        path: `${Pages.LOGIN}`,
        callback: async () => {
          const { default: LoginView } = await import('./view/main/login/login-view');
          this.setContent(Pages.LOGIN, new LoginView(this.router, this.observer, state));
          document.title = 'Login';
        },
      },
      {
        path: `${Pages.USER_PROFILE}`,
        callback: async () => {
          const { default: UserProfileView } = await import('./view/main/user-profile/user-profile');
          this.setContent(Pages.USER_PROFILE, new UserProfileView());
          document.title = 'Profile';
        },
      },
      {
        path: `${Pages.REGISTRATION}`,
        callback: async () => {
          const { default: RegistrationView } = await import('./view/main/registration/registration-view');
          this.setContent(Pages.REGISTRATION, new RegistrationView(this.router, this.observer, state));
          document.title = 'Registration';
        },
      },
      {
        path: `${Pages.CATALOG}`,
        callback: async () => {
          const { default: CatalogView } = await import('./view/main/catalog/catalog-view');
          this.setContent(Pages.CATALOG, new CatalogView(this.router));
          document.title = 'Catalog';
        },
      },
      {
        path: `${Pages.PROCESSORS}`,
        callback: async () => {
          const { default: ProcessorsView } = await import('./view/main/catalog/categories/processors/processors-view');
          this.setContent(Pages.CATALOG, new ProcessorsView(this.router, this.observer));
          document.title = 'Processors';
        },
      },
      {
        path: `${Pages.GRAPHIC_CARDS}`,
        callback: async () => {
          const { default: GraphicCardsView } = await import(
            './view/main/catalog/categories/graphic-cards/graphic-cards-view'
          );
          this.setContent(Pages.GRAPHIC_CARDS, new GraphicCardsView(this.router, this.observer));
          document.title = 'Graphic cards';
        },
      },
      {
        path: `${Pages.CATALOG}/${ID}`,
        callback: async (id) => {
          const { default: ProductView } = await import('./view/main/product/product-view');
          if (id !== undefined) {
            this.setContent(Pages.CATALOG, new ProductView(id, this.observer));
            document.title = 'Catalog';
          }
        },
      },
      {
        path: `${Pages.NOT_FOUND}`,
        callback: async () => {
          const { default: NotFoundView } = await import('./view/main/not-found/not-found-view');
          this.setContent(Pages.NOT_FOUND, new NotFoundView(this.router));
          document.title = 'Not Found';
        },
      },
      {
        path: `${Pages.ABOUT_US}`,
        callback: async () => {
          const { default: AboutView } = await import('./view/main/about-us/about-us-view');
          this.setContent(Pages.ABOUT_US, new AboutView());
          document.title = 'About Us';
        },
      },
      {
        path: `${Pages.CART}`,
        callback: async () => {
          const { default: CartView } = await import('./view/main/cart/cart-view');
          this.setContent(Pages.CART, new CartView(this.observer));
          document.title = 'Cart';
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
