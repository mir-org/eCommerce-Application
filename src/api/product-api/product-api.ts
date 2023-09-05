import { CTP_PROJECT_KEY, CTP_API_URL, TOKEN_STORAGE_KEY } from '../api-data';
import { AllProducts, FacetsProducts, FilterProductsQuery, FiltersData, Product } from './product-api-types';

export class ProductAPI {
  public static async getAllProducts(pageNumber: number = 0, limit: number = 4): Promise<AllProducts> {
    const offset = limit * pageNumber;
    const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/products?limit=${limit}&offset=${offset}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_STORAGE_KEY)}`,
      },
    });
    const products: AllProducts = await response.json();
    return products;
  }

  public static async getProduct(id: string): Promise<Product> {
    const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/products/${id}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_STORAGE_KEY)}`,
      },
    });
    const product: Product = await response.json();
    return product;
  }

  public static async getNumberOfPages(): Promise<number> {
    const response = await ProductAPI.getAllProducts();
    const maxPages = Math.ceil(response.total / response.limit);
    return maxPages;
  }

  public static async getFilteredProducts(
    filterProductsQuery: FilterProductsQuery,
    page: number = 0,
    limit: number = 4
  ): Promise<void> {
    const queryParams = this.getQueryParamsForFiltering(filterProductsQuery);
    const offset = limit * page;
    const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/product-projections/search?${queryParams}&limit=${limit}&offset=${offset}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_STORAGE_KEY)}`,
      },
    });
    const data = await response.json();
    const customEvent: CustomEvent = new CustomEvent('myCustomEvent', {
      detail: {
        message: 'Custom event dispatched',
        data: data.results,
        currentPage: page,
        totalPages: Math.ceil(data.total / limit),
        query: filterProductsQuery,
      },
    });
    document.dispatchEvent(customEvent);
  }

  private static getQueryParamsForFiltering(filterProductsQuery: FilterProductsQuery): string {
    const {
      categoryId,
      sort,
      search,
      minPriceValue,
      maxPriceValue,
      brands,
      sockets,
      coresAmount,
      chipset,
      vramAmount,
    } = filterProductsQuery;
    const categoryQuery = categoryId ? `filter=categories.id:"${categoryId}"` : '';
    const searchQuery = search ? `text.en=${search}` : '';
    const sortQuery = sort ? `sort=${sort}` : '';
    const priceQuery =
      minPriceValue || maxPriceValue
        ? `filter=variants.price.centAmount:range (${minPriceValue} to ${maxPriceValue})`
        : '';
    const brandsFilterQuery = brands ? `filter.query=variants.attributes.manufacturer:${brands}` : '';
    const brandsFacetQuery = brands ? `facet=variants.attributes.manufacturer:${brands}` : '';
    const socketsFilterQuery = sockets ? `filter.query=variants.attributes.socket:${sockets}` : '';
    const socketsFacetQuery = sockets ? `facet=variants.attributes.socket:${sockets}` : '';
    const coresAmountFilterQuery = coresAmount ? `filter.query=variants.attributes.cores-amount:${coresAmount}` : '';
    const coresAmountFacetQuery = coresAmount ? `facet=variants.attributes.cores-amount:${coresAmount}` : '';
    const chipsetFilterQuery = chipset ? `filter.query=variants.attributes.chipset:${chipset}` : '';
    const chipsetFacetQuery = chipset ? `facet=variants.attributes.chipset:${chipset}` : '';
    const vramAmountFilterQuery = vramAmount ? `filter.query=variants.attributes.vram-amount:${vramAmount}` : '';
    const vramAmountFacetQuery = vramAmount ? `facet=variants.attributes.vram-amount:${vramAmount}` : '';
    const queryParams = `${categoryQuery}&${brandsFilterQuery}&${brandsFacetQuery}&${socketsFilterQuery}&${socketsFacetQuery}&${coresAmountFilterQuery}&${coresAmountFacetQuery}&${priceQuery}&${sortQuery}&${searchQuery}&${chipsetFilterQuery}&${chipsetFacetQuery}&${vramAmountFilterQuery}&${vramAmountFacetQuery}`;
    return queryParams;
  }

  public static async getFiltersData(categoryId: string): Promise<FiltersData> {
    const categoryFilterQuery = categoryId ? `filter.query=categories.id:subtree("${categoryId}")` : '';
    const brandsFacetQuery = `facet=variants.attributes.manufacturer`;
    const socketFacetQuery = `facet=variants.attributes.socket`;
    const coresAmountFacetQuery = `facet=variants.attributes.cores-amount`;
    const chipsetFacetQuery = `facet=variants.attributes.chipset`;
    const vramAmountFacetQuery = `facet=variants.attributes.vram-amount`;
    const queryParams = `${categoryFilterQuery}&${brandsFacetQuery}&${socketFacetQuery}&${coresAmountFacetQuery}&${chipsetFacetQuery}&${vramAmountFacetQuery}`;
    const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/product-projections/search?${queryParams}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_STORAGE_KEY)}`,
      },
    });
    const data: FacetsProducts = await response.json();
    console.log(data);
    const result = {
      manufacturers: data.facets['variants.attributes.manufacturer'].terms,
      sockets: data.facets['variants.attributes.socket'].terms,
      coresAmount: data.facets['variants.attributes.cores-amount'].terms,
      chipset: data.facets['variants.attributes.chipset'].terms,
      vramAmount: data.facets['variants.attributes.vram-amount'].terms,
    };
    return result;
  }
}
