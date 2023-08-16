import { View } from '../../view';
import { ElementCreator } from '../../../utils/element-creator';

class NotFoundView extends View {
  constructor() {
    super('section', 'not-found');
    this.configView();
  }

  configView() {
    const title = new ElementCreator('h1', 'title', 'НЕ НАЙДЕНА');
    this.viewElementCreator.addInnerElement(title);
  }
}

export default NotFoundView;
