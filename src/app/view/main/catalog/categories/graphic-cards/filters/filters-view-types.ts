export const CssClasses = {
  FILTERS: 'filters',
  SEARCH_INPUT: 'search',
  SORT: 'filters__sort-bar',
  SORT_OPTION: 'filters__sort-option',
  FILTERS_BLOCK: 'filters__block',
  FILTERS_HEADER: 'filters__header',
  PRICE_LINE: 'filters__price-line',
  PRICE_SPLITTER: 'filters__price-splitter',
  PRICE_INPUT: 'price',
  BRANDS_LIST: 'filters__brands-list',
  BRANDS_LINE: 'filters__brands-line',
  CHECKBOX_INPUT: 'checkbox',
  RESET_BUTTON: 'filters__reset-button',
  ACCORDION_BUTTON: 'filters__accordion-button',
  ACCORDION_BUTTON_ACTIVE: 'filters__accordion-button--active',
  ACCORDION_MENU: 'filters__accordion-menu',
  ACCORDION_MENU_ACTIVE: 'filters__accordion-menu--active',
  NAVIGATION_CATEGORY: 'filters__navigation-category',
  NAVIGATION_SUBCATEGORY: 'filters__navigation-subcategory',
  NAVIGATION_SUBCATEGORY_ACTIVE: 'filters__navigation-subcategory--active',
  CURRENT_FILTER: 'filters__current-filter',
};

export const PLACEHOLDER = {
  SEARCH_INPUT: '',
  PRICE_INPUT: '',
  BRANDS_INPUT: '',
};

export const INITIAL_VALUE = {
  INPUT: '',
  SORT_BAR: 'price desc',
};

export const INPUT_LABEL = {
  SEARCH_INPUT: 'Search...',
  PRICE_MIN_INPUT: 'from',
  PRICE_MAX_INPUT: 'to',
};

export const INPUT_TYPE = {
  SEARCH_INPUT: 'text',
  PRICE_INPUT: 'number',
  BRANDS_INPUT: 'checkbox',
};

export const TEXT = {
  PRICE_HEADER: 'Price(USD)',
  BRANDS_HEADER: 'Brands',
  CHIPSETS_HEADER: 'Chipsets',
  VRAM_AMOUNT_HEADER: 'Vram amount',
  RESET_BUTTON: 'Reset',
  NAVIGATION_BUTTON: 'Navigation',
  PC_COMPONENTS_CATEGORY: 'PC-Components',
  PROCESSORS_SUBCATEGORY: 'Processors',
  GRAPHIC_CARDS_SUBCATEGORY: 'Graphic cards',
  CURRENT_FILTERS: 'Current filters',
};

export const SORT_OPTIONS = [
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

export type SortOptionData = {
  TEXT: string;
  VALUE: string;
};

export const CATEGORY_ID = '0b0e9d3c-edea-4285-a921-4346b70db822';
