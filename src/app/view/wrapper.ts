import { View } from './view';

const CssClasses = ['wrapper'];

class WrapperView extends View {
  constructor() {
    super('div', CssClasses);
  }
}

export default WrapperView;
