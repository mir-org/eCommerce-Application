import { View } from '../../view';
import { Router } from '../../../router/router';
import { ElementCreator } from '../../../utils/element-creator';
import { CATALOG_CLASSES, CATALOG_TEXT } from './catalog-view-types';
import { ProductAPI } from '../../../../api/product-api/product-api';
import { ProductCard, ProductCards } from '../../../../api/product-api/product-api-types';
import { clearElement } from '../../../utils/clear-element';
import { FiltersView } from './filters/filters-view';

class CatalogView extends View {
  private content: ElementCreator | null;

  private contentProducts: ElementCreator | null;

  private cardsWrapper: ElementCreator | null;

  constructor(private router: Router) {
    super('section', CATALOG_CLASSES.CATALOG);
    this.content = null;
    this.contentProducts = null;
    this.cardsWrapper = null;
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
  }

  private addContent(): void {
    const content = new ElementCreator('div', CATALOG_CLASSES.CONTENT, CATALOG_TEXT.CONTENT);
    this.content = content;
    this.viewElementCreator.addInnerElement(content);
  }

  private addAside(): void {
    const aside = new ElementCreator('aside', CATALOG_CLASSES.ASIDE, CATALOG_TEXT.ASIDE);
    const filtersView = new FiltersView();
    aside.addInnerElement(filtersView.getHTMLElement());
    this.content?.addInnerElement(aside);
  }

  private addProductsWrapper(): void {
    const products = new ElementCreator('div', CATALOG_CLASSES.PRODUCTS, '');
    this.contentProducts = products;
    this.content?.addInnerElement(products);
    this.createAllProductCards();
    this.createPaginator();
  }

  private async createAllProductCards(): Promise<void> {
    const cardsWrapper = new ElementCreator('div', 'cards-wrapper', '');
    this.cardsWrapper = cardsWrapper;
    this.contentProducts?.addInnerElement(cardsWrapper);
    try {
      const products = await this.getProductCardsInfo(0);
      products.forEach((product: ProductCard) => {
        cardsWrapper.addInnerElement(this.createProductCard(product));
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  private async createPaginator(): Promise<void> {
    const pages = await ProductAPI.getNumberOfPages();
    const btnsWrapper = new ElementCreator('div', 'paginator', '');
    this.contentProducts?.addInnerElement(btnsWrapper);
    for (let i = 0; i < pages; i += 1) {
      const button = new ElementCreator('button', 'paginator-btn', `${i + 1}`);
      button.getElement().addEventListener('click', async () => {
        try {
          const products = await this.getProductCardsInfo(i);
          clearElement(this.cardsWrapper?.getElement());
          products.forEach((product: ProductCard) => {
            this.cardsWrapper?.addInnerElement(this.createProductCard(product));
          });
        } catch (error) {
          console.error('Error:', error);
        }
      });
      btnsWrapper.addInnerElement(button);
    }
  }

  private createProductCard(product: ProductCard): ElementCreator {
    const { name } = product;
    const { description } = product;
    const { price } = product;
    const { image } = product;
    const { discount } = product;
    const { id } = product;
    const card = new ElementCreator('div', 'product-card', '');
    const cardTitle = new ElementCreator('h2', 'product-card-name', `${name}`);
    const cardImg = new ElementCreator('img', 'product-card-image', '');
    const cardPrice = new ElementCreator('div', 'product-card-price', `$${price}`);
    const cardDiscount = new ElementCreator('div', 'product-card-discount', `$${discount}`);
    const cardDescription = new ElementCreator('div', 'product-card-description', `${description}`);
    cardImg.getElement().setAttribute('src', `${image}`);
    card.addInnerElement(cardTitle);
    card.addInnerElement(cardImg);
    card.addInnerElement(cardPrice);
    card.addInnerElement(cardDiscount);
    card.addInnerElement(cardDescription);
    card.getElement().dataset.id = id;
    return card;
  }

  private async getProductCardsInfo(page: number): Promise<ProductCards> {
    try {
      const products = (await ProductAPI.getAllProducts(page)).results;
      const productCards = products.map((product) => {
        const name = product.masterData.current.name.en;
        let description = '';
        if (product.masterData.current.metaDescription) {
          description = product.masterData.current.metaDescription.en;
        }
        const price = product.masterData.current.masterVariant.prices[0].value.centAmount / 100;
        const discountValue = product.masterData?.current?.masterVariant?.prices[0]?.discounted?.value?.centAmount;
        let discount;
        if (discountValue) {
          discount = discountValue / 100;
        }
        const image = product.masterData.current.masterVariant.images[0].url;
        const { id } = product;
        return { name, description, price, image, discount, id };
      });
      return productCards;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }
}

export default CatalogView;
