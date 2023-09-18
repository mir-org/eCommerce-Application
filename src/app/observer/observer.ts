import State from '../state/state';
import HeaderView from '../view/header/header-view';
import { CartAPI } from '../../api/cart-api/cart-api';
import { Cart } from '../../api/cart-api/cart-api-types';

const KEY_FOR_SAVE = {
  CART_ITEMS_STATE_ARRAY: 'cartItemsStateArray',
};

interface CartItemForState {
  name: string;
  id: string;
  productId: string;
}

class Observer {
  public header: HeaderView | null;

  public state: State;

  constructor(state: State) {
    this.header = null;
    this.state = state;
  }

  public setHeader(header: HeaderView): void {
    this.header = header;
  }

  public setLoginStatus(state: State): void {
    this.header?.setLoginStatus(state);
  }

  public async setCartState(data?: Cart): Promise<void> {
    let cart: Cart;
    if (!data) {
      cart = await CartAPI.getCart();
    } else {
      cart = data;
    }
    const cartItemsStateArray: CartItemForState[] = [];
    cart.lineItems.forEach((elem) => {
      cartItemsStateArray.push({
        name: elem.name.en,
        id: elem.id,
        productId: elem.productId,
      });
    });
    this.state.setValue(KEY_FOR_SAVE.CART_ITEMS_STATE_ARRAY, JSON.stringify(cartItemsStateArray));
    const quantity = cart.lineItems.reduce((acc, elem) => elem.quantity + acc, 0);
    const cartCounterValue = `${quantity}`;
    const cartPriceValue = `${cart.totalPrice.centAmount / 100} $`;
    this.header?.setCartState(cartCounterValue, cartPriceValue);
  }
}

export { Observer, CartItemForState };
