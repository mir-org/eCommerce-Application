import { ProductAPI } from '../../../../../api/product-api/product-api';
import { ElementCreator } from '../../../../utils/element-creator';
import InputFieldsCreator from '../../../../utils/input-fields-creator';
import { View } from '../../../view';

const CssClasses = {
  FILTERS: 'filters',
  SEARCH_INPUT: 'search',
  SORT: 'filters__sort-bar',
  SORT_OPTION: 'filters__sort-option',
};

const PLACEHOLDER = {
  SEARCH_INPUT: '',
};

const INITIAL_VALUE = {
  INPUT: '',
};

const INPUT_LABEL = {
  SEARCH_INPUT: 'Search...',
};

const INPUT_TYPE = {
  SEARCH_INPUT: 'text',
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

  constructor() {
    super('section', CssClasses.FILTERS);
    this.searchInput = null;
    this.sortBar = null;
    this.configureView();
  }

  private configureView(): void {
    this.addSearchBar();
    this.addSortBar();
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

  private async getFilteredProducts(): Promise<void> {
    await ProductAPI.getFilteredProducts({ search: this.searchInput?.value, sort: this.sortBar?.value });
  }
}
