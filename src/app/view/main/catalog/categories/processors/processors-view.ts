import { View } from '../../../../view';
import { Router } from '../../../../../router/router';
import { ElementCreator } from '../../../../../utils/element-creator';
import { BREAD_CRUMBS_INFO, CATEGORY_CLASSES, CATEGORY_TEXT } from './processors-view-types';
import { ProductAPI } from '../../../../../../api/product-api/product-api';
import {
  ProductCard,
  ProductCards,
  MyCustomEvent,
  FilterProductsQuery,
} from '../../../../../../api/product-api/product-api-types';
import { clearElement } from '../../../../../utils/clear-element';
import { FiltersView } from './filters/filters-view';
import { BreadCrumbsCreator } from '../../../../../utils/bread-crumbs-creator';

class ProcessorsView extends View {
  private content: ElementCreator | null;

  private contentProducts: ElementCreator | null;

  private cardsWrapper: ElementCreator | null;

  private currentPage: number = 0;

  private totalPages: number = 0;

  private query: FilterProductsQuery;
  // private router: Router,
  // private filter: FiltersView | null

  constructor(private router: Router) {
    super('section', CATEGORY_CLASSES.CATALOG);
    this.content = null;
    this.contentProducts = null;
    this.cardsWrapper = null;
    // this.filter = filter;
    this.query = {
      categoryId: '0c1874b3-f13a-4879-ae0c-4cc69c02d71c',
      search: '',
      sort: 'price desc',
      minPriceValue: '0',
      maxPriceValue: '*',
      brands: '',
    };
    this.configView();
  }

  private configView(): void {
    this.addTitle();
    this.addContent();
    this.addAside();
    this.addProductsWrapper();
    this.content?.getElement().addEventListener('click', this.cardWrapperClickHandler.bind(this));
  }

  private addTitle(): void {
    const title = new ElementCreator('h1', CATEGORY_CLASSES.TITLE, CATEGORY_TEXT.TITLE);
    this.viewElementCreator.addInnerElement(title);
  }

  private addContent(): void {
    const content = new ElementCreator('div', CATEGORY_CLASSES.CONTENT, CATEGORY_TEXT.CONTENT);
    this.content = content;
    this.viewElementCreator.addInnerElement(content);
  }

  private addAside(): void {
    const aside = new ElementCreator('aside', CATEGORY_CLASSES.ASIDE, CATEGORY_TEXT.ASIDE);
    const filtersView = new FiltersView(this.router);
    aside.addInnerElement(filtersView.getHTMLElement());
    this.content?.addInnerElement(aside);
    document.addEventListener('myCustomEvent', ((event: CustomEvent<MyCustomEvent>) => {
      clearElement(this.contentProducts?.getElement());
      const productsData = event.detail.data;
      this.currentPage = event.detail.currentPage;
      this.totalPages = event.detail.totalPages;
      this.query = event.detail.query;
      const productCards = productsData.map((product) => {
        const name = product.name.en;
        let description = '';
        if (product.metaDescription) {
          description = product.metaDescription.en;
        }
        const price = product.masterVariant.prices[0].value.centAmount / 100;
        const discountValue = product.masterVariant.prices[0]?.discounted?.value?.centAmount;
        let discount;
        if (discountValue) {
          discount = discountValue / 100;
        }
        const image = product.masterVariant.images[0].url;
        const { id } = product;
        return { name, description, price, image, discount, id };
      });
      this.addBreadCrumbs();
      this.createProductsWrapper();
      this.createAllProductCards(productCards);
      this.createPaginator();
    }) as EventListener);
  }

  private createPaginator(): void {
    const paginator = new ElementCreator('div', 'paginator', '');
    const prevButton = new ElementCreator('button', 'paginator__btn', '<');
    if (this.currentPage === 0) prevButton.getElement().setAttribute('disabled', '');
    prevButton.getElement().addEventListener('click', () => {
      if (this.currentPage > 0) {
        this.currentPage -= 1;
        this.fetchFilteredProducts();
      }
    });
    paginator.addInnerElement(prevButton);
    for (let i = 0; i < this.totalPages; i += 1) {
      const pageButton = new ElementCreator('button', 'paginator__btn', `${i + 1}`);
      if (this.currentPage === i) pageButton.getElement().classList.add('active');
      pageButton.getElement().addEventListener('click', () => {
        this.currentPage = i;
        this.fetchFilteredProducts();
      });
      paginator.addInnerElement(pageButton);
    }
    const nextButton = new ElementCreator('button', 'paginator__btn', '>');
    if (this.currentPage === this.totalPages - 1) nextButton.getElement().setAttribute('disabled', '');
    nextButton.getElement().addEventListener('click', () => {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage += 1;
        this.fetchFilteredProducts();
      }
    });
    paginator.addInnerElement(nextButton);
    this.contentProducts?.addInnerElement(paginator);
  }

  private async fetchFilteredProducts(): Promise<void> {
    const filterProductsQuery: FilterProductsQuery = this.query;
    await ProductAPI.getFilteredProducts(filterProductsQuery, this.currentPage);
  }

  private async addProductsWrapper(): Promise<void> {
    const products = new ElementCreator('div', CATEGORY_CLASSES.PRODUCTS, '');
    this.contentProducts = products;
    this.content?.addInnerElement(products);
    this.addBreadCrumbs();
    this.createProductsWrapper();
    this.fetchFilteredProducts();
    this.createPaginator();
  }

  private addBreadCrumbs(): void {
    const breadCrumbsCreator = new BreadCrumbsCreator(BREAD_CRUMBS_INFO, this.router);
    this.contentProducts?.addInnerElement(breadCrumbsCreator.getElement());
  }

  private createProductsWrapper(): void {
    const cardsWrapper = new ElementCreator('div', 'cards-wrapper', '');
    this.cardsWrapper = cardsWrapper;
    this.contentProducts?.addInnerElement(cardsWrapper);
  }

  private async createAllProductCards(products: ProductCards): Promise<void> {
    products.forEach((product: ProductCard) => {
      this.cardsWrapper?.addInnerElement(this.createProductCard(product));
    });
  }

  private createProductCard(product: ProductCard): ElementCreator {
    const { name } = product;
    const { description } = product;
    const { price } = product;
    const { image } = product;
    const { discount } = product;
    const { id } = product;
    const card = new ElementCreator('div', 'product-card', '');
    const cardTitle = new ElementCreator('h2', 'product-card__name', `${name}`);
    const cardImg = new ElementCreator('img', 'product-card__image', '');
    const cardPrice = new ElementCreator('div', 'product-card__price', `$${price}`);
    const cardDiscount = new ElementCreator('div', 'product-card__discount', `$${discount}`);
    const cardDescription = new ElementCreator('div', 'product-card__description', `${description}`);
    cardImg.getElement().setAttribute('src', `${image}`);
    card.addInnerElement(cardTitle);
    card.addInnerElement(cardImg);
    card.addInnerElement(cardPrice);
    card.addInnerElement(cardDiscount);
    card.addInnerElement(cardDescription);
    card.getElement().dataset.id = id;
    return card;
  }

  private cardWrapperClickHandler(event: MouseEvent): void {
    const сtarget = event.target;
    if (сtarget instanceof HTMLElement) {
      const card = сtarget.closest('.product-card');
      if (card) {
        const ID = card.getAttribute('data-id');
        this.router.navigate(`catalog/${ID}`);
      }
    }
  }
}

export default ProcessorsView;
