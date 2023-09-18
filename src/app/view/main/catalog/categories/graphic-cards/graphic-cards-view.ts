import { View } from '../../../../view';
import { Router } from '../../../../../router/router';
import { ElementCreator } from '../../../../../utils/element-creator';
import { BREAD_CRUMBS_INFO, CATEGORY_CLASSES, CATEGORY_TEXT } from './graphic-cards-view-types';
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
import { Observer } from '../../../../../observer/observer';
import { CartAPI } from '../../../../../../api/cart-api/cart-api';

class GraphicCardsView extends View {
  private content: ElementCreator | null;

  private contentProducts: ElementCreator | null;

  private cardsWrapper: ElementCreator | null;

  private currentPage: number = 0;

  private totalPages: number = 0;

  private query: FilterProductsQuery;

  private observer: Observer;

  private router: Router;

  constructor(router: Router, observer: Observer) {
    super('section', CATEGORY_CLASSES.CATALOG);
    this.observer = observer;
    this.content = null;
    this.contentProducts = null;
    this.cardsWrapper = null;
    this.router = router;
    this.query = {
      categoryId: '0b0e9d3c-edea-4285-a921-4346b70db822',
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
    products.forEach(async (product: ProductCard) => {
      this.cardsWrapper?.addInnerElement(await this.createProductCard(product));
    });
  }

  private async createProductCard(product: ProductCard): Promise<ElementCreator> {
    const { name, description, price, image, discount, id } = product;
    const isItemInCart = await CartAPI.itemIsInCart(id);
    const card = new ElementCreator('div', 'product-card', '');
    const cardTitle = new ElementCreator('h2', 'product-card__name', `${name}`);
    const cardImg = new ElementCreator('img', 'product-card__image', '');
    const cardPrice = new ElementCreator('div', 'product-card__price', `$${price}`);
    const cardDiscount = new ElementCreator('div', 'product-card__discount', `$${discount}`);
    const cardAddToCart = new ElementCreator('button', 'product-card__buy', 'Add to cart');
    if (isItemInCart) {
      cardAddToCart.getElement().classList.add('product-card__in-cart');
      cardAddToCart.getElement().textContent = 'Go to cart';
    } else {
      cardAddToCart.getElement().classList.remove('product-card__in-cart');
      cardAddToCart.getElement().textContent = 'Add to cart';
    }
    const cardDescription = new ElementCreator('div', 'product-card__description', `${description}`);
    cardImg.getElement().setAttribute('src', `${image}`);
    card.addInnerElement(cardTitle);
    card.addInnerElement(cardImg);
    card.addInnerElement(cardPrice);
    card.addInnerElement(cardDiscount);
    card.addInnerElement(cardAddToCart);
    card.addInnerElement(cardDescription);
    card.getElement().dataset.id = id;
    cardAddToCart.getElement().addEventListener('click', (event) => {
      event.stopPropagation();
      if (isItemInCart) {
        this.router.navigate(`cart`);
      } else {
        this.buyButtonClickHandler(id, event);
      }
    });
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

  private async buyButtonClickHandler(id: string, event: Event): Promise<void> {
    event.stopPropagation();
    const isItemInCart = await CartAPI.itemIsInCart(id);
    const button = event.target as HTMLButtonElement;
    if (isItemInCart) {
      this.router.navigate('cart');
    } else {
      const cart = await CartAPI.addProductToCart(id);
      this.observer.setCartState(cart);
      button.classList.add('product-card__in-cart');
      button.textContent = 'Go to cart';
    }
  }
}

export default GraphicCardsView;
