import { CTP_PROJECT_KEY, CTP_API_URL, TOKEN_STORAGE_KEY } from '../api-data';
import { AllProducts, FilterProductsQuery, Product } from './product-api-types';

export class ProductAPI {
  public static async getAllProducts(pageNumber: number = 0, limit: number = 20): Promise<AllProducts> {
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

  public static async getFilteredProducts(filterProductsQuery: FilterProductsQuery): Promise<void> {
    const { sort, search, minPriceValue, maxPriceValue, brands } = filterProductsQuery;
    const searchQuery = search ? `text.en=${search}` : '';
    const sortQuery = sort ? `sort=${sort}` : '';
    const priceQuery =
      minPriceValue || maxPriceValue
        ? `filter=variants.price.centAmount:range (${minPriceValue} to ${maxPriceValue})`
        : '';
    const brandsFilterQuery = brands ? `filter.query=variants.attributes.manufacturer:${brands}` : '';
    const brandsFacetQuery = brands ? `facet=variants.attributes.manufacturer:${brands}` : '';
    const queryParams = `${brandsFilterQuery}&${brandsFacetQuery}&${priceQuery}&${sortQuery}&${searchQuery}`;
    const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/product-projections/search?${queryParams}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_STORAGE_KEY)}`,
      },
    });
    const data = await response.json();
    console.log('Filtered products', data);
  }
}