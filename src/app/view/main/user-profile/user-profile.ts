import { CustomerAPI } from '../../../../api/customer-api/customer-api';
import { ElementCreator } from '../../../utils/element-creator';
import { View } from '../../view';
import { PROFILE_CLASSES, PROFILE_TEXT } from './user-profile-types';

class UserProfileView extends View {
  private form: ElementCreator | null;

  constructor() {
    super('section', PROFILE_CLASSES.PROFILE);
    this.form = null;
    this.configView();
  }

  private configView(): void {
    this.addTitle();
    this.addForm();
    console.log(CustomerAPI.getCustomerInfo());
  }

  private addTitle(): void {
    const title = new ElementCreator('h1', PROFILE_CLASSES.TITLE, PROFILE_TEXT.TITLE);
    this.viewElementCreator.addInnerElement(title);
  }

  private addForm(): void {
    this.form = new ElementCreator('form', 'registration__form');
    this.viewElementCreator.addInnerElement(this.form.getElement());
  }
}

export default UserProfileView;
