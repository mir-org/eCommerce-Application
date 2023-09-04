import { ProductAPI } from '../../../../../../api/product-api/product-api';
import { ElementCreator } from '../../../../../utils/element-creator';
import InputFieldsCreator from '../../../../../utils/input-fields-creator';
import { View } from '../../../../view';
import {
  CssClasses,
  PLACEHOLDER,
  INITIAL_VALUE,
  INPUT_LABEL,
  INPUT_TYPE,
  TEXT,
  SORT_OPTIONS,
  SortOptionData,
} from './filters-view-types';

export class FiltersView extends View {
  private searchInput: HTMLInputElement | null;

  private sortBar: HTMLSelectElement | null;

  private minPriceInput: HTMLInputElement | null;

  private maxPriceInput: HTMLInputElement | null;

  private brands: Set<string> = new Set();

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
      this.searchInput.value = '';
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
    const priceFilterBlock = new ElementCreator('div', CssClasses.PRICE_BLOCK);
    const priceBlockHeader = new ElementCreator('header', CssClasses.PRICE_HEADER, TEXT.PRICE_HEADER);
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
    const listElementCreator = new ElementCreator('ul', CssClasses.BRANDS_LIST);
    try {
      const products = (await ProductAPI.getAllProducts()).results;
      const brands = products.map((productInfo) => {
        const brandName = productInfo.masterData.current.masterVariant.attributes.find(
          (elem) => elem.name === 'manufacturer'
        )?.value;
        return brandName;
      });
      const uniqueBrands = [...new Set(brands)];
      uniqueBrands.forEach((brandName) => {
        const lineElementCreator = new ElementCreator('li', CssClasses.BRANDS_LINE);
        const inputElementCreator = new InputFieldsCreator(
          CssClasses.FILTERS,
          CssClasses.BRANDS_INPUT,
          `${brandName}`,
          `${brandName}`,
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
    this.viewElementCreator.addInnerElement(listElementCreator.getElement());
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
    await ProductAPI.getFilteredProducts({
      search: searchValue,
      sort: sortValue,
      minPriceValue: minValueUsd,
      maxPriceValue: maxValueUsd,
      brands: brandsString,
    });
  }
}
