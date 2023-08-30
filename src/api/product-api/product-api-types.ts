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

type CurrentAndStaged = {
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

type MasterVariant = {
  assets: [];
  attributes: Attributes[];
  id: number;
  images: Image[];
  key: string;
  prices: Prices[];
  sku: string;
};

type Image = {
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

type Attributes = {
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
  search?: string;
}
