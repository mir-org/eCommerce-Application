import { View } from '../../view';
import { Router } from '../../../router/router';
import { ElementCreator } from '../../../utils/element-creator';
import { CATALOG_CLASSES, CATALOG_TEXT } from './catalog-view-types';
import { ProductAPI } from '../../../../api/product-api/product-api';

class CatalogView extends View {
  private content: ElementCreator | null;

  constructor(private router: Router) {
    super('section', CATALOG_CLASSES.CATALOG);
    this.content = null;
    this.configView();
  }

  private configView(): void {
    this.addTitle();
    this.addContent();
    this.addAside();
    this.addProducts();
  }

  private addTitle(): void {
    const title = new ElementCreator('h1', CATALOG_CLASSES.TITLE, CATALOG_TEXT.TITLE);
    this.viewElementCreator.addInnerElement(title);
    ProductAPI.getAllProducts(1);
    ProductAPI.getProduct('efa39720-5e7c-4158-be12-1362a4e0b095');
    ProductAPI.getNumberOfPages();
  }

  private addContent(): void {
    const content = new ElementCreator('div', CATALOG_CLASSES.CONTENT, CATALOG_TEXT.CONTENT);
    this.content = content;
    this.viewElementCreator.addInnerElement(content);
  }

  private addAside(): void {
    const aside = new ElementCreator('aside', CATALOG_CLASSES.ASIDE, CATALOG_TEXT.ASIDE);
    this.content?.addInnerElement(aside);
  }

  private addProducts(): void {
    const products = new ElementCreator('div', CATALOG_CLASSES.PRODUCTS, CATALOG_TEXT.PRODUCTS);
    this.content?.addInnerElement(products);
  }
}

export default CatalogView;
