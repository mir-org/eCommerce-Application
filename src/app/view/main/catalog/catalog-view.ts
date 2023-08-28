import { View } from '../../view';
import { Router } from '../../../router/router';

const CssClasses = {
  CATALOG: 'catalog',
};

class CatalogView extends View {
  constructor(private router: Router) {
    super('section', CssClasses.CATALOG);
  }
}

export default CatalogView;
