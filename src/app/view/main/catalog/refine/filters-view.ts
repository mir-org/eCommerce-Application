import { ProductAPI } from '../../../../../api/product-api/product-api';
import InputFieldsCreator from '../../../../utils/input-fields-creator';
import { View } from '../../../view';

const CssClasses = {
  FILTERS: 'filters',
  SEARCH_INPUT: 'search',
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

export class FiltersView extends View {
  private searchInput: HTMLInputElement | null;

  constructor() {
    super('section', CssClasses.FILTERS);
    this.searchInput = null;
    this.configureView();
  }

  private configureView(): void {
    this.addSearchBar();
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

  private async getFilteredProducts(): Promise<void> {
    await ProductAPI.getFilteredProducts({ search: this.searchInput?.value });
  }
}
