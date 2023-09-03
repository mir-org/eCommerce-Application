/* eslint-disable */
interface RequestParams {
  path: string;
  resource: string;
}

type RouterHandlerParam = {
  nameEvent: string;
  locationField: string;
};

class HistoryRouterHandler {
  public callback: (result: RequestParams) => void;

  public handler: (url: PopStateEvent | string) => void;

  constructor(callback: (requestParams: RequestParams) => void) {
    this.callback = callback;
    this.handler = this.navigate.bind(this);

    window.addEventListener('popstate', this.handler);
  }
  public navigate(url: PopStateEvent | string): void {
    if (typeof url === 'string') {
      this.setHistory(url);
    }
    const urlString = window.location.pathname.slice(1);

    const result: RequestParams = {
      path: '',
      resource: '',
    };
    const path = urlString.split('/');
    [result.path = '', result.resource = ''] = path;

    this.callback(result);
  }

  public setHistory(url: string): void {
    window.history.pushState(null, '', `/${url}`);
  }
}

export { RequestParams, RouterHandlerParam, HistoryRouterHandler };
