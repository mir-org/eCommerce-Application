import State from '../state/state';
import HeaderView from '../view/header/header-view';

class Observer {
  public header: HeaderView | null;

  constructor() {
    this.header = null;
  }

  public setHeader(header: HeaderView): void {
    this.header = header;
  }

  public userIsLoggedIn(state: State): void {
    this.header?.userIsLoggedIn(state);
  }
}

export default Observer;
