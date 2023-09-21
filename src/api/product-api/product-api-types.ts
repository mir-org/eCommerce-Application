export type Product = {
  createdAt: string;
  createdBy: CreatedAndModified;
  id: string;
  key: string;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: CreatedAndModified;
  lastVariantId: number;
  masterData: MasterData;
  productType: ProductInfo;
  taxCategory: ProductInfo;
  version: number;
  versionModifiedAt: string;
};

export type AllProducts = {
  count: number;
  limit: number;
  offset: number;
  results: Product[];
  total: number;
};

export type ProductCards = ProductCard[];

export type ProductCard = {
  description: string;
  image: string;
  name: string;
  price: number;
  discount?: number;
  id: string;
};

export interface MyCustomEvent {
  detail: string;
  data: EventData[];
  currentPage: number;
  totalPages: number;
  query: FilterProductsQuery;
}

type EventData = {
  categories: Ids[];
  categoryOrderHints: object;
  createdAt: string;
  description: Language;
  hasStagedChanges: boolean;
  id: string;
  key: string;
  lastModifiedAt: string;
  masterVariant: MasterVariant;
  metaDescription: {
    de: string;
    en: string;
  };
  metaTitle: {
    de: string;
    en: string;
  };
  name: {
    en: string;
  };
  priceMode: string;
  productType: Ids;
  published: boolean;
  searchKeywords: object;
  slug: {
    en: string;
  };
  variants: [];
  version: number;
};

type CreatedAndModified = {
  clientId: string;
  isPlatformClient: boolean;
};

type ProductInfo = {
  id: string;
  typeId: string;
};

type MasterData = {
  current: CurrentAndStaged;
  hasStagedChanges: boolean;
  published: boolean;
  staged: CurrentAndStaged;
};

type Description = {
  en: string;
};

type CurrentAndStaged = {
  description: Description;
  categories: Ids[];
  categoryOrderHints: object;
  masterVariant: MasterVariant;
  metaDescription?: Language;
  name: Language;
  searchKeywords: object;
  slug: Language;
  variants: [];
};

type Ids = {
  typeId: string;
  id: string;
};

type Language = {
  [language: string]: string;
};

export type MasterVariant = {
  assets: [];
  attributes: Attributes[];
  id: number;
  images: Image[];
  key: string;
  prices: Prices[];
  sku: string;
};

export type Image = {
  url: string;
  dimensions: ImageDimensions;
};

type ImageDimensions = {
  h: number;
  w: number;
};

type Prices = {
  id: string;
  value: { centAmount: number; currencyCode: string; fractionDigits: number; type: number };
  discounted?: {
    discount: Ids;
    value: { centAmount: number; currencyCode: string; fractionDigits: number; type: number };
  };
  customerGroup?: Ids;
  country?: string;
  channel?: Ids;
};

export type Attributes = {
  name: string;
  value: string | boolean | AttributeValueObject;
};

type AttributeValueObject = {
  key: string;
  label: string | LabelObject;
};

type LabelObject = {
  key: string;
  label: Language;
};

export interface FilterProductsQuery {
  categoryId: string;
  search?: string;
  sort?: string;
  minPriceValue?: string;
  maxPriceValue?: string;
  brands?: string;
  sockets?: string;
  coresAmount?: string;
  chipset?: string;
  vramAmount?: string;
}

export type FacetsProducts = {
  count: number;
  facets: Facets;
  limit: number;
  offset: number;
  results: Product[];
  total: number;
};

export type Facets = {
  'variants.attributes.manufacturer': VariantsAttributes;
  'variants.attributes.socket': VariantsAttributes;
  'variants.attributes.cores-amount': VariantsAttributes;
  'variants.attributes.chipset': VariantsAttributes;
  'variants.attributes.vram-amount': VariantsAttributes;
};

type VariantsAttributes = {
  dataType: string;
  missing: number;
  other: number;
  terms: TermsData[];
  total: number;
  type: string;
};

export interface FiltersData {
  manufacturers: TermsData[];
  sockets: TermsData[];
  coresAmount: TermsData[];
  chipset: TermsData[];
  vramAmount: TermsData[];
}

type TermsData = {
  term: string;
  count: number;
};
