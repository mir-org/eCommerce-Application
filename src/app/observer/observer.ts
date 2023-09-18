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
    const quantity = cart.lineItems.reduce((acc, elem) => elem.quantity + acc, 0);
    const cartCounterValue = `${quantity}`;
    const cartPriceValue = `${cart.totalPrice.centAmount / 100} $`;
    this.header?.setCartState(cartCounterValue, cartPriceValue);

    // console.log(cart);
  }
}

export default Observer;
