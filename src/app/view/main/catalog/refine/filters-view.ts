import { ProductAPI } from '../../../../../api/product-api/product-api';
import { ElementCreator } from '../../../../utils/element-creator';
import InputFieldsCreator from '../../../../utils/input-fields-creator';
import { View } from '../../../view';

const CssClasses = {
  FILTERS: 'filters',
  SEARCH_INPUT: 'search',
  SORT: 'filters__sort-bar',
  SORT_OPTION: 'filters__sort-option',
  PRICE_BLOCK: 'filters__price-block',
  PRICE_HEADER: 'filters__price-header',
  PRICE_LINE: 'filters__price-line',
  PRICE_SPLITTER: 'filters__price-splitter',
  PRICE_INPUT: 'price',
};

const PLACEHOLDER = {
  SEARCH_INPUT: '',
  PRICE_INPUT: '',
};

const INITIAL_VALUE = {
  INPUT: '',
  PRICE_MIN_INPUT: '',
  PRICE_MAX_INPUT: '',
};

const INPUT_LABEL = {
  SEARCH_INPUT: 'Search...',
  PRICE_MIN_INPUT: 'from',
  PRICE_MAX_INPUT: 'to',
};

const INPUT_TYPE = {
  SEARCH_INPUT: 'text',
  PRICE_INPUT: 'number',
};

const TEXT = {
  PRICE_HEADER: 'Price(USD)',
};

const SORT_OPTIONS = [
  {
    TEXT: 'Price: height to low',
    VALUE: 'price desc',
  },
  {
    TEXT: 'Price: low to height',
    VALUE: 'price asc',
  },
  {
    TEXT: 'Name: A-Z',
    VALUE: 'name.en asc',
  },
  {
    TEXT: 'Name: Z-A',
    VALUE: 'name.en desc',
  },
];

type SortOptionData = {
  TEXT: string;
  VALUE: string;
};

export class FiltersView extends View {
  private searchInput: HTMLInputElement | null;

  private sortBar: HTMLSelectElement | null;

  private minPriceInput: HTMLInputElement | null;

  private maxPriceInput: HTMLInputElement | null;

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
    await ProductAPI.getFilteredProducts({
      search: searchValue,
      sort: sortValue,
      minPriceValue: minValueUsd,
      maxPriceValue: maxValueUsd,
    });
  }
}
