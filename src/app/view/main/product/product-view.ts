import { Router } from '../../../router/router';
import { ElementCreator } from '../../../utils/element-creator';
import { View } from '../../view';

class ProductView extends View {
  constructor(id: string, router: Router) {
    super('section', 'user-profile');
    this.configView(id, router);
  }

  private configView(id: string, router: Router): void {
    const title = new ElementCreator('h1', 'card', `${id} ${router.toString()}`);
    this.viewElementCreator.addInnerElement(title);
  }
}

export default ProductView;
