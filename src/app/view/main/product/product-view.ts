import { Router } from '../../../router/router';
import { ElementCreator } from '../../../utils/element-creator';
import { View } from '../../view';
import { ProductAPI } from '../../../../api/product-api/product-api';

class ProductView extends View {
  constructor(id: string, router: Router) {
    super('section', 'user-profile');
    this.configView(id, router);
  }

  private configView(id: string, router: Router): void {
    const title = new ElementCreator('h1', 'card', `${id} ${router.toString()}`);
    this.viewElementCreator.addInnerElement(title);
    this.getData(id);
  }

  private async getData(id: string): Promise<number[]> {
    const data = await ProductAPI.getProduct(id);
    const name = data.masterData.current.name.en;
    const descriptions = data.masterData.current.description.en;
    const price = data.masterData.current.masterVariant.prices[0].value.centAmount / 100;
    const discountValue = data.masterData?.current?.masterVariant?.prices[0]?.discounted?.value?.centAmount;
    let discount;
    if (discountValue) {
      discount = discountValue / 100;
    }
    const imageArr = data.masterData.current.masterVariant.images;

    const info = {
      name,
      descriptions,
      price,
      discount,
      imageArr,
    };

    // console.log(data);
    console.log(info);
    return [1, 2, 3];
  }
}

export default ProductView;
