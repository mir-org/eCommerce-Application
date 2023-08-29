import { View } from '../../view';
import { Router } from '../../../router/router';
import { ElementCreator } from '../../../utils/element-creator';
import { CATALOG_CLASSES, CATALOG_TEXT } from './catalog-view-types';
import { ProductAPI } from '../../../../api/product-api/product-api';
import { ProductCard, ProductCards } from '../../../../api/product-api/product-api-types';

class CatalogView extends View {
  private content: ElementCreator | null;

  private contentProducts: ElementCreator | null;

  constructor(private router: Router) {
    super('section', CATALOG_CLASSES.CATALOG);
    this.content = null;
    this.contentProducts = null;
    this.configView();
  }

  private configView(): void {
    this.addTitle();
    this.addContent();
    this.addAside();
    this.addProductsWrapper();
  }

  private addTitle(): void {
    const title = new ElementCreator('h1', CATALOG_CLASSES.TITLE, CATALOG_TEXT.TITLE);
    this.viewElementCreator.addInnerElement(title);
    // ProductAPI.getAllProducts(1);
    // ProductAPI.getProduct('efa39720-5e7c-4158-be12-1362a4e0b095');
    // ProductAPI.getNumberOfPages();
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

  private addProductsWrapper(): void {
    const products = new ElementCreator('div', CATALOG_CLASSES.PRODUCTS, '');
    this.contentProducts = products;
    this.content?.addInnerElement(products);
    // products.addInnerElement(this.createProductCards());
    this.createAllProductCards();
  }

  private async createAllProductCards(): Promise<void> {
    try {
      const products = await this.getProductCardsInfo();
      products.forEach((product: ProductCard) => {
        this.createProductCard(product);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  private createProductCard(product: ProductCard): void {
    const { name } = product;
    const { description } = product;
    const { price } = product;
    const { image } = product;
    // console.log('name', name);
    // console.log('description', description);
    // console.log('price', price);
    // console.log('image', image);
    const card = new ElementCreator('div', 'product-card', `${name}, ${description}, ${price}, ${image}`);
    console.log(card);
    this.contentProducts?.addInnerElement(card);
  }

  private async getProductCardsInfo(): Promise<ProductCards> {
    try {
      const products = (await ProductAPI.getAllProducts()).results;
      const productCards = products.map((product) => {
        const name = product.masterData.current.name.en;
        let description = '';
        if (product.masterData.current.metaDescription) {
          description = product.masterData.current.metaDescription.en;
        }
        const price = product.masterData.current.masterVariant.prices[0].value.centAmount / 100;
        const image = product.masterData.current.masterVariant.images[0].url;
        return { name, description, price, image };
      });
      return productCards;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }
}

export default CatalogView;
