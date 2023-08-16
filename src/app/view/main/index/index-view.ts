import { ElementCreator } from '../../../utils/element-creator';
import { View } from '../../view';

const CssClasses = {
  INDEX: 'index',
  TITLE: 'index__title',
};
const TEXT = {
  TITLE: 'ЭТО ГЛАВНАЯ СТРАНИЦА',
};

class IndexView extends View {
  constructor() {
    super('section', CssClasses.INDEX);
    this.configView();
  }

  configView() {
    const title = new ElementCreator('h1', CssClasses.TITLE, TEXT.TITLE);
    this.viewElementCreator.addInnerElement(title);
  }
}

export default IndexView;
