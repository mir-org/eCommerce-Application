import { View } from '../../view';
import { CART_CLASSES } from './cart-view-types';

class CartView extends View {
  constructor() {
    super('main', CART_CLASSES.CART);
    this.configureView();
  }

  private configureView(): void {
    console.log('Configure Cart View');
  }
}

export default CartView;
