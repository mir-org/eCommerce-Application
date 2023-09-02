import { CustomerAPI } from '../../../../api/customer-api/customer-api';
import { CustomerInfo } from '../../../../api/customer-api/customer-api-types';
import { ElementCreator } from '../../../utils/element-creator';
import InputFieldsCreator from '../../../utils/input-fields-creator';
import { View } from '../../view';
import { PROFILE_CLASSES, PROFILE_TEXT } from './user-profile-types';

class UserProfileView extends View {
  private form: ElementCreator | null;

  private data: CustomerInfo | null;

  constructor() {
    super('section', PROFILE_CLASSES.PROFILE);
    this.form = null;
    this.data = null;
    this.configView();
  }

  private async configView(): Promise<void> {
    await this.getCustomerData();
    this.addTitle();
    this.addForm();
    console.log(this.data);
  }

  private addTitle(): void {
    const title = new ElementCreator('h1', PROFILE_CLASSES.TITLE, PROFILE_TEXT.TITLE);
    this.viewElementCreator.addInnerElement(title);
  }

  private addForm(): void {
    this.form = new ElementCreator('form', 'registration__form');
    this.viewElementCreator.addInnerElement(this.form.getElement());
    this.addFirstNameInput();
    this.addLastNameInput();
    this.addDateOfBirthInput();
    this.addEmailInput();
    this.addShippingFieldSet();
    this.addBillingFieldSet();
  }

  private async getCustomerData(): Promise<CustomerInfo> {
    this.data = await CustomerAPI.getCustomerInfo();
    return this.data;
  }

  private addFirstNameInput(): void {
    const firstNameInputCreator = new InputFieldsCreator(
      PROFILE_CLASSES.PROFILE,
      PROFILE_CLASSES.FIRST_NAME,
      PROFILE_TEXT.FIRST_NAME,
      this.data?.firstName ?? '',
      'text',
      ''
    );
    // const firstNameInputElement = firstNameInputCreator.getInputElement();
    // firstNameInputCreator.getInputElement().setAttribute('required', '');
    firstNameInputCreator.getInputElement().setAttribute('disabled', '');
    // this.firstNameInput = firstNameInputElement;
    // firstNameInputElement.addEventListener('input', () => {
    //   this.inputValidation(firstNameInputCreator, () => Validator.nameField(firstNameInputElement.value));
    //   this.inputKeydownFn();
    // });
    this.form?.addInnerElement(firstNameInputCreator.getElement());
  }

  private addLastNameInput(): void {
    const lastNameInputCreator = new InputFieldsCreator(
      PROFILE_CLASSES.PROFILE,
      PROFILE_CLASSES.LAST_NAME,
      PROFILE_TEXT.LAST_NAME,
      this.data?.lastName ?? '',
      'text',
      ''
    );
    // const lastNameInputElement = lastNameInputCreator.getInputElement();
    // lastNameInputCreator.getInputElement().setAttribute('required', '');
    lastNameInputCreator.getInputElement().setAttribute('disabled', '');
    // this.lastNameInput = lastNameInputElement;
    // lastNameInputElement.addEventListener('input', () => {
    //   this.inputValidation(lastNameInputCreator, () => Validator.nameField(lastNameInputElement.value));
    //   this.inputKeydownFn();
    // });
    this.form?.addInnerElement(lastNameInputCreator.getElement());
  }

  private addDateOfBirthInput(): void {
    const dateOfBirthInputCreator = new InputFieldsCreator(
      PROFILE_CLASSES.PROFILE,
      PROFILE_CLASSES.DATE_OF_BIRTH,
      PROFILE_TEXT.DATE_OF_BIRTH,
      this.data?.dateOfBirth ?? '',
      'date',
      ''
    );
    // const dateOfBirthInputElement = dateOfBirthInputCreator.getInputElement();
    // dateOfBirthInputCreator.getInputElement().setAttribute('required', '');
    dateOfBirthInputCreator.getInputElement().setAttribute('disabled', '');
    // this.dateOfBirthInput = dateOfBirthInputElement;
    // dateOfBirthInputElement.addEventListener('input', () => {
    //   this.inputValidation(dateOfBirthInputCreator, () => Validator.birthField(dateOfBirthInputElement.value));
    //   this.inputKeydownFn();
    // });
    this.form?.addInnerElement(dateOfBirthInputCreator.getElement());
  }

  private addEmailInput(): void {
    const emailInputCreator = new InputFieldsCreator(
      PROFILE_CLASSES.PROFILE,
      PROFILE_CLASSES.EMAIL,
      PROFILE_TEXT.EMAIL,
      this.data?.email ?? '',
      'email',
      ''
    );
    // const emailInputElement = emailInputCreator.getInputElement();
    // emailInputCreator.getInputElement().setAttribute('required', '');
    emailInputCreator.getInputElement().setAttribute('disabled', '');
    // this.emailInput = emailInputElement;
    // emailInputElement.addEventListener('input', () => {
    //   this.inputValidation(emailInputCreator, () => Validator.emailField(emailInputElement.value));
    //   this.inputKeydownFn();
    // });
    this.form?.addInnerElement(emailInputCreator.getElement());
  }

  private addShippingFieldSet(): void {
    const fieldSet = new ElementCreator('fieldset', 'fieldset');
    // this.shippingAddressFieldSet = fieldSet;
    const legendFieldSet = new ElementCreator('legend', 'legend');
    legendFieldSet.getElement().textContent = 'Shipping Addresses';
    fieldSet.addInnerElement(legendFieldSet);
    this.form?.addInnerElement(fieldSet);
  }

  private addBillingFieldSet(): void {
    const fieldSet = new ElementCreator('fieldset', 'fieldset');
    // this.billingAddressFieldSet = fieldSet;
    const legendFieldSet = new ElementCreator('legend', 'legend');
    legendFieldSet.getElement().textContent = 'Billing Addresses';
    fieldSet.addInnerElement(legendFieldSet);
    this.form?.addInnerElement(fieldSet);
  }

  // private addAddressInput(wrapper: ElementCreator | null, type: string): void {
  //   if (wrapper) {
  //     this.addCityAddressInput(wrapper, type);
  //     // this.addStreetAddressInput(wrapper, type);
  //     // this.addPostalCodeAddressInput(wrapper, type);
  //     // this.addCountryAddressInput(wrapper, type);
  //     // this.addDefaultCheckbox(wrapper, type);
  //   }
  // }

  // private addCityAddressInput(wrapper: ElementCreator, type: string): void {
  //   const cityAddressInputCreator = new InputFieldsCreator(
  //     PROFILE_CLASSES.PROFILE,
  //     PROFILE_CLASSES.CITY,
  //     PROFILE_TEXT.CITY,
  //     '',
  //     'text',
  //     ''
  //   );
  //   const cityAddressInputElement = cityAddressInputCreator.getInputElement();
  //   if (type === 'shipping') {
  //     this.cityShippingAddressInput = cityAddressInputElement;
  //   } else if (type === 'billing') {
  //     this.cityBillingAddressInput = cityAddressInputElement;
  //   }
  //   cityAddressInputElement.addEventListener('input', () => {
  //     this.inputValidation(cityAddressInputCreator, () => Validator.cityField(cityAddressInputElement.value));
  //     this.inputKeydownFn();
  //   });
  //   wrapper?.addInnerElement(cityAddressInputCreator.getElement());
  // }
}

export default UserProfileView;
