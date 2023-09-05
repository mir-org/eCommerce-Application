import { ProductAPI } from '../../../../../../../api/product-api/product-api';
import { ElementCreator } from '../../../../../../utils/element-creator';
import InputFieldsCreator from '../../../../../../utils/input-fields-creator';
import { View } from '../../../../../view';
import {
  CssClasses,
  PLACEHOLDER,
  INITIAL_VALUE,
  INPUT_LABEL,
  INPUT_TYPE,
  TEXT,
  SORT_OPTIONS,
  SortOptionData,
  CATEGORY_ID,
} from './filters-view-types';

export class FiltersView extends View {
  private searchInput: HTMLInputElement | null;

  private sortBar: HTMLSelectElement | null;

  private minPriceInput: HTMLInputElement | null;

  private maxPriceInput: HTMLInputElement | null;

  private brands: Set<string> = new Set();

  private sockets: Set<string> = new Set();

  private coresAmount: Set<string> = new Set();

  constructor() {
    super('section', CssClasses.FILTERS);
    this.searchInput = null;
    this.sortBar = null;
    this.minPriceInput = null;
    this.maxPriceInput = null;
    this.configureView();
  }

  private configureView(): void {
    this.addSearchBar();
    this.addSortBar();
    this.addPriceBlock();
    this.addBrandsList();
    this.addSocketsList();
    this.addCoresAmountList();
  }

  private addSearchBar(): void {
    const searchInputCreator = new InputFieldsCreator(
      CssClasses.FILTERS,
      CssClasses.SEARCH_INPUT,
      INPUT_LABEL.SEARCH_INPUT,
      INITIAL_VALUE.INPUT,
      INPUT_TYPE.SEARCH_INPUT,
      PLACEHOLDER.SEARCH_INPUT
    );
    const searchInputElement = searchInputCreator.getInputElement();
    this.searchInput = searchInputElement;
    searchInputElement.addEventListener('keydown', this.searchBarCallback.bind(this));
    this.viewElementCreator.addInnerElement(searchInputCreator.getElement());
  }

  private async searchBarCallback(e: KeyboardEvent): Promise<void> {
    if (!this.searchInput) throw new Error();
    if (e.code === 'Enter' || e.key === 'Enter') {
      await this.getFilteredProducts();
    }
  }

  private addSortBar(): void {
    const selectElementCreator = new ElementCreator('select', CssClasses.SORT);
    SORT_OPTIONS.forEach((sortOption: SortOptionData) => {
      const optionElementCreator = new ElementCreator('option', CssClasses.SORT_OPTION, sortOption.TEXT);
      const optionElement = optionElementCreator.getElement();
      if (optionElement instanceof HTMLOptionElement) optionElement.value = sortOption.VALUE;
      selectElementCreator.addInnerElement(optionElement);
    });
    const selectElement = selectElementCreator.getElement();
    if (selectElement instanceof HTMLSelectElement) this.sortBar = selectElement;
    selectElement.addEventListener('change', this.sortBarCallback.bind(this));
    this.viewElementCreator.addInnerElement(selectElement);
  }

  private async sortBarCallback(): Promise<void> {
    await this.getFilteredProducts();
  }

  private addPriceBlock(): void {
    const priceFilterBlock = new ElementCreator('div', CssClasses.FILTERS_BLOCK);
    const priceBlockHeader = new ElementCreator('header', CssClasses.FILTERS_HEADER, TEXT.PRICE_HEADER);
    const priceLine = new ElementCreator('div', CssClasses.PRICE_LINE);
    this.addPriceLine(priceLine);
    priceFilterBlock.addInnerElement(priceBlockHeader.getElement());
    priceFilterBlock.addInnerElement(priceLine.getElement());
    this.viewElementCreator.addInnerElement(priceFilterBlock.getElement());
  }

  private addPriceLine(priceLine: ElementCreator): void {
    const minPriceInputCreator = new InputFieldsCreator(
      CssClasses.FILTERS,
      CssClasses.PRICE_INPUT,
      INPUT_LABEL.PRICE_MIN_INPUT,
      INITIAL_VALUE.PRICE_MIN_INPUT,
      INPUT_TYPE.PRICE_INPUT,
      PLACEHOLDER.PRICE_INPUT
    );
    this.minPriceInput = minPriceInputCreator.getInputElement();
    minPriceInputCreator.getInputElement().addEventListener('keydown', this.priceKeyDownCallback.bind(this));
    minPriceInputCreator.getInputElement().addEventListener('input', this.priceInputCallback.bind(this));
    const priceSplitter = new ElementCreator('div', CssClasses.PRICE_SPLITTER);
    const maxPriceInputCreator = new InputFieldsCreator(
      CssClasses.FILTERS,
      CssClasses.PRICE_INPUT,
      INPUT_LABEL.PRICE_MAX_INPUT,
      INITIAL_VALUE.PRICE_MAX_INPUT,
      INPUT_TYPE.PRICE_INPUT,
      PLACEHOLDER.PRICE_INPUT
    );
    this.maxPriceInput = maxPriceInputCreator.getInputElement();
    maxPriceInputCreator.getInputElement().addEventListener('keydown', this.priceKeyDownCallback.bind(this));
    maxPriceInputCreator.getInputElement().addEventListener('input', this.priceInputCallback.bind(this));
    priceLine.addInnerElement(minPriceInputCreator.getElement());
    priceLine.addInnerElement(priceSplitter.getElement());
    priceLine.addInnerElement(maxPriceInputCreator.getElement());
  }

  private priceKeyDownCallback(e: KeyboardEvent): void {
    if (e.code === 'KeyE' || e.key === 'e') e.preventDefault();
  }

  private async priceInputCallback(): Promise<void> {
    await this.getFilteredProducts.call(this);
  }

  private async addBrandsList(): Promise<void> {
    const brandsFilterBlock = new ElementCreator('div', CssClasses.FILTERS_BLOCK);
    const brandsBlockHeader = new ElementCreator('header', CssClasses.FILTERS_HEADER, TEXT.BRANDS_HEADER);
    const listElementCreator = new ElementCreator('ul', CssClasses.BRANDS_LIST);
    try {
      const { manufacturers } = await ProductAPI.getFiltersData(CATEGORY_ID);
      manufacturers.forEach((manufacturerInfo) => {
        const lineElementCreator = new ElementCreator('li', CssClasses.BRANDS_LINE);
        const inputElementCreator = new InputFieldsCreator(
          CssClasses.FILTERS,
          CssClasses.CHECKBOX_INPUT,
          `${manufacturerInfo.term} (${manufacturerInfo.count})`,
          `${manufacturerInfo.term}`,
          INPUT_TYPE.BRANDS_INPUT,
          PLACEHOLDER.BRANDS_INPUT
        );
        lineElementCreator.addInnerElement(inputElementCreator.getElement());
        listElementCreator.addInnerElement(lineElementCreator);
      });
    } catch (e) {
      console.log(e);
    }
    listElementCreator.getElement().addEventListener('change', this.brandsListCallback.bind(this));
    brandsFilterBlock.addInnerElement(brandsBlockHeader);
    brandsFilterBlock.addInnerElement(listElementCreator);
    this.viewElementCreator.addInnerElement(brandsFilterBlock);
  }

  private async addSocketsList(): Promise<void> {
    const socketFilterBlock = new ElementCreator('div', CssClasses.FILTERS_BLOCK);
    const socketBlockHeader = new ElementCreator('header', CssClasses.FILTERS_HEADER, TEXT.SOCKETS_HEADER);
    const listElementCreator = new ElementCreator('ul', CssClasses.BRANDS_LIST);
    try {
      const { sockets } = await ProductAPI.getFiltersData(CATEGORY_ID);
      sockets.forEach((socketInfo) => {
        const lineElementCreator = new ElementCreator('li', CssClasses.BRANDS_LINE);
        const inputElementCreator = new InputFieldsCreator(
          CssClasses.FILTERS,
          CssClasses.CHECKBOX_INPUT,
          `${socketInfo.term} (${socketInfo.count})`,
          `${socketInfo.term}`,
          INPUT_TYPE.BRANDS_INPUT,
          PLACEHOLDER.BRANDS_INPUT
        );
        lineElementCreator.addInnerElement(inputElementCreator.getElement());
        listElementCreator.addInnerElement(lineElementCreator);
      });
    } catch (e) {
      console.log(e);
    }
    listElementCreator.getElement().addEventListener('change', this.socketsListCallback.bind(this));
    socketFilterBlock.addInnerElement(socketBlockHeader);
    socketFilterBlock.addInnerElement(listElementCreator);
    this.viewElementCreator.addInnerElement(socketFilterBlock);
  }

  private async addCoresAmountList(): Promise<void> {
    const coresAmountFilterBlock = new ElementCreator('div', CssClasses.FILTERS_BLOCK);
    const coresAmountBlockHeader = new ElementCreator('header', CssClasses.FILTERS_HEADER, TEXT.CORES_AMOUNT_HEADER);
    const listElementCreator = new ElementCreator('ul', CssClasses.BRANDS_LIST);
    try {
      const { coresAmount } = await ProductAPI.getFiltersData(CATEGORY_ID);
      coresAmount.forEach((coresAmountInfo) => {
        const lineElementCreator = new ElementCreator('li', CssClasses.BRANDS_LINE);
        const inputElementCreator = new InputFieldsCreator(
          CssClasses.FILTERS,
          CssClasses.CHECKBOX_INPUT,
          `${coresAmountInfo.term} (${coresAmountInfo.count})`,
          `${coresAmountInfo.term}`,
          INPUT_TYPE.BRANDS_INPUT,
          PLACEHOLDER.BRANDS_INPUT
        );
        lineElementCreator.addInnerElement(inputElementCreator.getElement());
        listElementCreator.addInnerElement(lineElementCreator);
      });
    } catch (e) {
      console.log(e);
    }
    listElementCreator.getElement().addEventListener('change', this.coresAmountListCallback.bind(this));
    coresAmountFilterBlock.addInnerElement(coresAmountBlockHeader);
    coresAmountFilterBlock.addInnerElement(listElementCreator);
    this.viewElementCreator.addInnerElement(coresAmountFilterBlock);
  }

  private async brandsListCallback(e: Event): Promise<void> {
    if (e.target instanceof HTMLInputElement && e.target.closest('input')) {
      if (e.target.checked === true) {
        this.brands.add(e.target.value);
        this.getFilteredProducts.call(this);
      }
      if (e.target.checked === false) {
        this.brands.delete(e.target.value);
        this.getFilteredProducts.call(this);
      }
    }
  }

  private async socketsListCallback(e: Event): Promise<void> {
    if (e.target instanceof HTMLInputElement && e.target.closest('input')) {
      if (e.target.checked === true) {
        this.sockets.add(e.target.value);
        this.getFilteredProducts.call(this);
      }
      if (e.target.checked === false) {
        this.sockets.delete(e.target.value);
        this.getFilteredProducts.call(this);
      }
    }
  }

  private async coresAmountListCallback(e: Event): Promise<void> {
    if (e.target instanceof HTMLInputElement && e.target.closest('input')) {
      if (e.target.checked === true) {
        this.coresAmount.add(e.target.value);
        this.getFilteredProducts.call(this);
      }
      if (e.target.checked === false) {
        this.coresAmount.delete(e.target.value);
        this.getFilteredProducts.call(this);
      }
    }
  }

  private async getFilteredProducts(): Promise<void> {
    const searchValue = this.searchInput?.value;
    const sortValue = this.sortBar?.value;
    if (!this.minPriceInput || !this.maxPriceInput) {
      throw new Error();
    }
    const minPrice = Number(this.minPriceInput.value || '0');
    const maxPrice = Number(this.maxPriceInput.value || '*');
    const minValueUsd = String(minPrice * 100 || '0');
    const maxValueUsd = String(maxPrice * 100 || '*');
    const brandsString = [...this.brands].map((brand) => `"${brand}"`).join(',');
    const socketsString = [...this.sockets].map((socket) => `"${socket}"`).join(',');
    const coresAmountString = [...this.coresAmount].map((coresAmount) => `"${coresAmount}"`).join(',');
    await ProductAPI.getFilteredProducts({
      categoryId: CATEGORY_ID,
      search: searchValue,
      sort: sortValue,
      minPriceValue: minValueUsd,
      maxPriceValue: maxValueUsd,
      brands: brandsString,
      sockets: socketsString,
      coresAmount: coresAmountString,
    });
  }
}
