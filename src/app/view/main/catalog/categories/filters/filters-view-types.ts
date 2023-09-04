export const CssClasses = {
  FILTERS: 'filters',
  SEARCH_INPUT: 'search',
  SORT: 'filters__sort-bar',
  SORT_OPTION: 'filters__sort-option',
  PRICE_BLOCK: 'filters__price-block',
  PRICE_HEADER: 'filters__price-header',
  PRICE_LINE: 'filters__price-line',
  PRICE_SPLITTER: 'filters__price-splitter',
  PRICE_INPUT: 'price',
  BRANDS_LIST: 'filters__brands-list',
  BRANDS_LINE: 'filters__brands-line',
  BRANDS_INPUT: 'brands',
};

export const PLACEHOLDER = {
  SEARCH_INPUT: '',
  PRICE_INPUT: '',
  BRANDS_INPUT: '',
};

export const INITIAL_VALUE = {
  INPUT: '',
  PRICE_MIN_INPUT: '',
  PRICE_MAX_INPUT: '',
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
