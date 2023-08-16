import { View } from '../view';

const CssClasses = 'footer';
const TEXT = 'SPA';

class FooterView extends View {
  constructor() {
    super('footer', CssClasses, TEXT);
  }
}

export default FooterView;
