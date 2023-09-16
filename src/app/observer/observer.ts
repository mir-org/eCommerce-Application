import State from '../state/state';
import HeaderView from '../view/header/header-view';
import { CartAPI } from '../../api/cart-api/cart-api';

class Observer {
  public header: HeaderView | null;

  constructor() {
    this.header = null;
  }

  public setHeader(header: HeaderView): void {
    this.header = header;
  }

  public setLoginStatus(state: State): void {
    this.header?.setLoginStatus(state);
  }

  public async setCartState(): Promise<void> {
    const cart = await CartAPI.getCart();
    const cartCounterValue = `${cart.lineItems.length}`;
    const cartPriceValue = `${cart.totalPrice.centAmount}`;
    this.header?.setCartState(cartCounterValue, cartPriceValue);
  }
}

export default Observer;
