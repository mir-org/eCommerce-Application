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
  BRANDS_HEADER: 'Brands',
  SOCKETS_HEADER: 'Socket',
  CORES_AMOUNT_HEADER: 'Cores amount',
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

export const CATEGORY_ID = '0c1874b3-f13a-4879-ae0c-4cc69c02d71c';