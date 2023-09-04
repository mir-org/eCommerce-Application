import { CTP_PROJECT_KEY, CTP_API_URL, TOKEN_STORAGE_KEY } from '../api-data';
import { AllProducts, FilterProductsQuery, Product } from './product-api-types';

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
    const { categoryId, sort, search, minPriceValue, maxPriceValue, brands } = filterProductsQuery;
    const categoryQuery = categoryId ? `filter=categories.id:"${categoryId}"` : '';
    const searchQuery = search ? `text.en=${search}` : '';
    const sortQuery = sort ? `sort=${sort}` : '';
    const priceQuery =
      minPriceValue || maxPriceValue
        ? `filter=variants.price.centAmount:range (${minPriceValue} to ${maxPriceValue})`
        : '';
    const brandsFilterQuery = brands ? `filter.query=variants.attributes.manufacturer:${brands}` : '';
    const brandsFacetQuery = brands ? `facet=variants.attributes.manufacturer:${brands}` : '';
    const queryParams = `${categoryQuery}&${brandsFilterQuery}&${brandsFacetQuery}&${priceQuery}&${sortQuery}&${searchQuery}`;
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
    console.log(data);
    document.dispatchEvent(customEvent);
  }
}
