import { CustomerAPI } from '../../../../api/CustomerAPI/CustomerAPI';
import { Address, MyCustomerDraft } from '../../../../api/CustomerAPI/customer-api-type';
import { AuthAPI } from '../../../../api/authAPI/authAPI';
import { Pages } from '../../../router/pages';
import { Router } from '../../../router/router';
import { ElementCreator } from '../../../utils/element-creator';
import InputFieldsCreator from '../../../utils/input-fields-creator';
import { Validator } from '../../../utils/validator';
import { View } from '../../view';
import { SIGN_UP_CLASSES, SIGN_UP_TEXT, TYPE } from './registration-view-types';

class RegistrationView extends View {
  private form: ElementCreator | null;

  private btnsWrapper: ElementCreator | null;

  private firstNameInput: HTMLInputElement | null;

  private lastNameInput: HTMLInputElement | null;

  private dateOfBirthInput: HTMLInputElement | null;

  private emailInput: HTMLInputElement | null;

  private passwordInput: HTMLInputElement | null;

  private confirmPasswordInput: HTMLInputElement | null;

  private shippingAddressFieldSet: ElementCreator | null;

  private billingAddressFieldSet: ElementCreator | null;

  private cityShippingAddressInput: HTMLInputElement | null;

  private streetShippingAddressInput: HTMLInputElement | null;

  private postalCodeShippingAddressInput: HTMLInputElement | null;

  private countryShippingAddressInput: HTMLSelectElement | null;

  private defaultShippingAddressInput: HTMLInputElement | null;

  private cityBillingAddressInput: HTMLInputElement | null;

  private streetBillingAddressInput: HTMLInputElement | null;

  private postalCodeBillingAddressInput: HTMLInputElement | null;

  private countryBillingAddressInput: HTMLSelectElement | null;

  private defaultBillingAddressInput: HTMLInputElement | null;

  private errorLine: HTMLElement | null;

  constructor(private router: Router) {
    super('section', SIGN_UP_CLASSES.REGISTRATION);
    this.form = null;
    this.btnsWrapper = null;
    this.firstNameInput = null;
    this.lastNameInput = null;
    this.dateOfBirthInput = null;
    this.emailInput = null;
    this.passwordInput = null;
    this.confirmPasswordInput = null;
    this.shippingAddressFieldSet = null;
    this.billingAddressFieldSet = null;
    this.cityShippingAddressInput = null;
    this.streetShippingAddressInput = null;
    this.postalCodeShippingAddressInput = null;
    this.countryShippingAddressInput = null;
    this.defaultShippingAddressInput = null;
    this.cityBillingAddressInput = null;
    this.streetBillingAddressInput = null;
    this.postalCodeBillingAddressInput = null;
    this.countryBillingAddressInput = null;
    this.defaultBillingAddressInput = null;
    this.errorLine = null;
    this.configView();
  }

  private configView(): void {
    this.addTitle();
    this.addForm();
    this.configForm();
  }

  private addTitle(): void {
    const title = new ElementCreator('h1', SIGN_UP_CLASSES.TITLE, SIGN_UP_TEXT.TITLE);
    this.viewElementCreator.addInnerElement(title);
  }

  private addForm(): void {
    this.form = new ElementCreator('form', 'registration__form');
    this.form?.getElement().addEventListener('submit', (event: Event) => this.handleSubmit(event));
    this.viewElementCreator.addInnerElement(this.form.getElement());
  }

  private configForm(): void {
    this.addFirstNameInput();
    this.addLastNameInput();
    this.addDateOfBirthInput();
    this.addEmailInput();
    this.addPasswordInput();
    this.addConfirmPasswordInput();
    this.addShippingFieldSet();
    this.addAddressInput(this.shippingAddressFieldSet, 'shipping');
    this.addBillingFieldSet();
    this.addAddressInput(this.billingAddressFieldSet, 'billing');
    this.addErrorLine();
    this.addControlButtons();
  }

  private addFirstNameInput(): void {
    const firstNameInputCreator = new InputFieldsCreator(
      SIGN_UP_CLASSES.REGISTRATION,
      SIGN_UP_CLASSES.FIRST_NAME,
      SIGN_UP_TEXT.FIRST_NAME,
      '',
      'text',
      ''
    );
    const firstNameInputElement = firstNameInputCreator.getInputElement();
    this.firstNameInput = firstNameInputElement;
    // firstNameInputElement.addEventListener('keydown', this.inputKeydownFn.bind(this));
    this.form?.addInnerElement(firstNameInputCreator.getElement());
  }

  private addLastNameInput(): void {
    const lastNameInputCreator = new InputFieldsCreator(
      SIGN_UP_CLASSES.REGISTRATION,
      SIGN_UP_CLASSES.LAST_NAME,
      SIGN_UP_TEXT.LAST_NAME,
      '',
      'text',
      ''
    );
    const lastNameInputElement = lastNameInputCreator.getInputElement();
    this.lastNameInput = lastNameInputElement;
    // firstNameInputElement.addEventListener('keydown', this.inputKeydownFn.bind(this));
    this.form?.addInnerElement(lastNameInputCreator.getElement());
  }

  private addDateOfBirthInput(): void {
    const dateOfBirthInputCreator = new InputFieldsCreator(
      SIGN_UP_CLASSES.REGISTRATION,
      SIGN_UP_CLASSES.DATE_OF_BIRTH,
      SIGN_UP_TEXT.DATE_OF_BIRTH,
      '',
      'date',
      ''
    );
    const dateOfBirthInputElement = dateOfBirthInputCreator.getInputElement();
    this.dateOfBirthInput = dateOfBirthInputElement;
    // firstNameInputElement.addEventListener('keydown', this.inputKeydownFn.bind(this));
    this.form?.addInnerElement(dateOfBirthInputCreator.getElement());
  }

  private addEmailInput(): void {
    const emailInputCreator = new InputFieldsCreator(
      SIGN_UP_CLASSES.REGISTRATION,
      SIGN_UP_CLASSES.EMAIL,
      SIGN_UP_TEXT.EMAIL,
      '',
      'email',
      ''
    );
    const emailInputElement = emailInputCreator.getInputElement();
    this.emailInput = emailInputElement;
    // firstNameInputElement.addEventListener('keydown', this.inputKeydownFn.bind(this));
    this.form?.addInnerElement(emailInputCreator.getElement());
  }

  private addPasswordInput(): void {
    const passwordInputCreator = new InputFieldsCreator(
      SIGN_UP_CLASSES.REGISTRATION,
      SIGN_UP_CLASSES.PASSWORD,
      SIGN_UP_TEXT.PASSWORD,
      '',
      'password',
      ''
    );
    const passwordInputElement = passwordInputCreator.getInputElement();
    this.passwordInput = passwordInputElement;
    this.addShowHidePasswordIcon(this.passwordInput, passwordInputCreator);
    // firstNameInputElement.addEventListener('keydown', this.inputKeydownFn.bind(this));
    this.form?.addInnerElement(passwordInputCreator.getElement());
  }

  private addConfirmPasswordInput(): void {
    const confirmPasswordInputCreator = new InputFieldsCreator(
      SIGN_UP_CLASSES.REGISTRATION,
      SIGN_UP_CLASSES.CONFIRM_PASSWORD,
      SIGN_UP_TEXT.CONFIRM_PASSWORD,
      '',
      'password',
      ''
    );
    const confirmPasswordInputElement = confirmPasswordInputCreator.getInputElement();
    this.confirmPasswordInput = confirmPasswordInputElement;
    this.addShowHidePasswordIcon(this.confirmPasswordInput, confirmPasswordInputCreator);
    // firstNameInputElement.addEventListener('keydown', this.inputKeydownFn.bind(this));
    this.form?.addInnerElement(confirmPasswordInputCreator.getElement());
  }

  private addShowHidePasswordIcon(passwordInput: HTMLInputElement, passwordInputCreator: InputFieldsCreator): void {
    const showHideIconCreator = new ElementCreator(
      'span',
      SIGN_UP_CLASSES.SHOW_HIDE_ICON,
      SIGN_UP_TEXT.SHOW_HIDE_ICON.VISIBLE
    );
    showHideIconCreator
      .getElement()
      .addEventListener('click', this.showHidePasswordFn.bind(this, passwordInput, showHideIconCreator));
    passwordInputCreator.addInnerElement(showHideIconCreator);
  }

  private addAddressInput(wrapper: ElementCreator | null, type: string): void {
    if (wrapper) {
      this.addCityAddressInput(wrapper, type);
      this.addStreetAddressInput(wrapper, type);
      this.addPostalCodeAddressInput(wrapper, type);
      this.addCountryAddressInput(wrapper, type);
      this.addDefaultCheckbox(wrapper, type);
    }
  }

  private addShippingFieldSet(): void {
    const fieldSet = new ElementCreator('fieldset', 'fieldset');
    this.shippingAddressFieldSet = fieldSet;
    const legendFieldSet = new ElementCreator('legend', 'legend');
    legendFieldSet.getElement().textContent = 'Shipping Address';
    fieldSet.addInnerElement(legendFieldSet);
    this.form?.addInnerElement(fieldSet);
  }

  private addBillingFieldSet(): void {
    const fieldSet = new ElementCreator('fieldset', 'fieldset');
    this.billingAddressFieldSet = fieldSet;
    const legendFieldSet = new ElementCreator('legend', 'legend');
    legendFieldSet.getElement().textContent = 'Billing Address';
    fieldSet.addInnerElement(legendFieldSet);
    this.form?.addInnerElement(fieldSet);
  }

  private addCityAddressInput(wrapper: ElementCreator, type: string): void {
    const cityAddressInputCreator = new InputFieldsCreator(
      SIGN_UP_CLASSES.REGISTRATION,
      SIGN_UP_CLASSES.CITY,
      SIGN_UP_TEXT.CITY,
      '',
      'text',
      ''
    );
    const cityAddressInputElement = cityAddressInputCreator.getInputElement();
    if (type === 'shipping') {
      this.cityShippingAddressInput = cityAddressInputElement;
    } else if (type === 'billing') {
      this.cityBillingAddressInput = cityAddressInputElement;
    }
    // firstNameInputElement.addEventListener('keydown', this.inputKeydownFn.bind(this));
    wrapper?.addInnerElement(cityAddressInputCreator.getElement());
  }

  private addStreetAddressInput(wrapper: ElementCreator, type: string): void {
    const streetAddressInputCreator = new InputFieldsCreator(
      SIGN_UP_CLASSES.REGISTRATION,
      SIGN_UP_CLASSES.STREET,
      SIGN_UP_TEXT.STREET,
      '',
      'text',
      ''
    );
    const streetAddressInputElement = streetAddressInputCreator.getInputElement();
    if (type === 'shipping') {
      this.streetShippingAddressInput = streetAddressInputElement;
    } else if (type === 'billing') {
      this.streetBillingAddressInput = streetAddressInputElement;
    }
    // firstNameInputElement.addEventListener('keydown', this.inputKeydownFn.bind(this));
    wrapper?.addInnerElement(streetAddressInputCreator.getElement());
  }

  private addPostalCodeAddressInput(wrapper: ElementCreator, type: string): void {
    const postalCodeAddressInputCreator = new InputFieldsCreator(
      SIGN_UP_CLASSES.REGISTRATION,
      SIGN_UP_CLASSES.POSTAL_CODE,
      SIGN_UP_TEXT.POSTAL_CODE,
      '',
      'number',
      ''
    );
    const postalCodeAddressInputElement = postalCodeAddressInputCreator.getInputElement();
    if (type === 'shipping') {
      this.postalCodeShippingAddressInput = postalCodeAddressInputElement;
    } else if (type === 'billing') {
      this.postalCodeBillingAddressInput = postalCodeAddressInputElement;
    }
    // firstNameInputElement.addEventListener('keydown', this.inputKeydownFn.bind(this));
    wrapper?.addInnerElement(postalCodeAddressInputCreator.getElement());
  }

  private addCountryAddressInput(wrapper: ElementCreator, type: string): void {
    // TODO refactor to separate createSelect method
    const countryOptions = ['USA', 'Russia'];
    const countryValues = ['US', 'RU'];
    const wrapperClasses = ['registration__country-input-wrapper', 'primary-wrapper'];
    const labelClasses = ['registration__country-label', 'primary-label'];
    const selectClasses = ['registration__country-input', 'primary-input'];
    const countryAddressInputWrapper = new ElementCreator('div', wrapperClasses);
    const countryAddressInputLabel = new ElementCreator('label', labelClasses);
    countryAddressInputLabel.getElement().textContent = 'Country';
    const countryAddressInputCreator = new ElementCreator('select', selectClasses);
    for (let i = 0; i < countryOptions.length; i += 1) {
      const option = document.createElement('option');
      option.setAttribute('value', countryValues[i]);
      option.textContent = countryOptions[i];
      countryAddressInputCreator.getElement().appendChild(option);
    }
    countryAddressInputWrapper.addInnerElement(countryAddressInputLabel.getElement());
    countryAddressInputLabel.addInnerElement(countryAddressInputCreator.getElement());
    const countryAddressInputElement = countryAddressInputCreator.getElement() as HTMLSelectElement;
    if (type === 'shipping') {
      this.countryShippingAddressInput = countryAddressInputElement;
    } else if (type === 'billing') {
      this.countryBillingAddressInput = countryAddressInputElement;
    }
    wrapper?.addInnerElement(countryAddressInputWrapper.getElement());
  }

  private addDefaultCheckbox(wrapper: ElementCreator, type: string): void {
    const defaultAddressCheckboxCreator = new InputFieldsCreator(
      SIGN_UP_CLASSES.REGISTRATION,
      SIGN_UP_CLASSES.SET_DEFAULT_ADDRESS,
      SIGN_UP_TEXT.SET_DEFAULT_ADDRESS,
      '',
      'checkbox',
      ''
    );
    const defaultShippingAddressInputElement = defaultAddressCheckboxCreator.getInputElement();
    // firstNameInputElement.addEventListener('keydown', this.inputKeydownFn.bind(this));
    if (type === 'shipping') {
      this.defaultShippingAddressInput = defaultShippingAddressInputElement;
    } else if (type === 'billing') {
      this.defaultBillingAddressInput = defaultShippingAddressInputElement;
    }
    wrapper?.addInnerElement(defaultAddressCheckboxCreator.getElement());
    const checkbox = defaultAddressCheckboxCreator.getElement().lastChild?.firstChild as HTMLElement;
    checkbox.classList.remove('primary-input');
  }

  private addErrorLine(): void {
    const errorLineCreator = new ElementCreator('div', SIGN_UP_CLASSES.ERROR_LINE, SIGN_UP_TEXT.ERROR_LINE);
    const errorLineElement = errorLineCreator.getElement();
    this.errorLine = errorLineElement;
    this.form?.addInnerElement(errorLineElement);
  }

  private addControlButtons(): void {
    this.btnsWrapper = new ElementCreator('div', 'form-buttons');
    this.btnsWrapper?.addInnerElement(this.addRegisterButton());
    this.btnsWrapper?.addInnerElement(this.addLoginButton());
    this.btnsWrapper?.addInnerElement(this.addCopyButton());
    this.form?.addInnerElement(this.btnsWrapper.getElement());
  }

  private addRegisterButton(): ElementCreator {
    const registerBtn = new ElementCreator('button', SIGN_UP_CLASSES.REGISTER_BTN, SIGN_UP_TEXT.REGISTER_BTN);
    registerBtn.getElement().setAttribute('type', 'submit');
    return registerBtn;
  }

  private addLoginButton(): ElementCreator {
    const loginBtn = new ElementCreator('button', SIGN_UP_CLASSES.LOGIN_BTN, SIGN_UP_TEXT.LOGIN_BTN);
    loginBtn.getElement().setAttribute('type', 'button');
    loginBtn.getElement().addEventListener('click', () => this.router.navigate(Pages.LOGIN));
    return loginBtn;
  }

  private addCopyButton(): ElementCreator {
    const copyBtn = new ElementCreator('button', 'copy', 'copy');
    copyBtn.getElement().setAttribute('type', 'button');
    copyBtn.getElement().addEventListener('click', this.copyShippingAddressToBillingAddress.bind(this));
    return copyBtn;
  }

  private async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    const validationErrors = [];
    const formData = this.getFormData();
    if (Validator.nameField(formData.firstName).length > 0) {
      validationErrors.push(...Validator.nameField(formData.firstName));
    }
    if (Validator.nameField(formData.lastName).length > 0) {
      validationErrors.push(...Validator.nameField(formData.lastName));
    }
    if (Validator.emailField(formData.email).length > 0) {
      validationErrors.push(...Validator.emailField(formData.email));
    }
    if (Validator.passwordField(formData.password).length > 0) {
      validationErrors.push(...Validator.passwordField(formData.password));
    }
    if (validationErrors.length === 0) {
      await CustomerAPI.registerCustomer(formData);
      await AuthAPI.fetchPasswordToken(formData.email, formData.password);
      await CustomerAPI.getCustomerInfo();
      await CustomerAPI.loginCustomer(formData.email, formData.password);
      this.router.navigate(Pages.INDEX);
    } else if (this.errorLine) {
      this.errorLine.textContent = `${validationErrors}`;
    }
  }

  private copyShippingAddressToBillingAddress(): void {
    const cityValue = this.cityShippingAddressInput?.value;
    const streetValue = this.streetShippingAddressInput?.value;
    const postalCodeValue = this.postalCodeShippingAddressInput?.value;
    const countryValue = this.countryShippingAddressInput?.value;
    if (cityValue !== undefined && this.cityBillingAddressInput !== null) {
      this.cityBillingAddressInput.value = cityValue;
      this.cityBillingAddressInput.focus();
      this.cityBillingAddressInput.blur();
    }
    if (streetValue !== undefined && this.streetBillingAddressInput !== null) {
      this.streetBillingAddressInput.value = streetValue;
      this.streetBillingAddressInput.focus();
      this.streetBillingAddressInput.blur();
    }
    if (postalCodeValue !== undefined && this.postalCodeBillingAddressInput !== null) {
      this.postalCodeBillingAddressInput.value = postalCodeValue;
      this.postalCodeBillingAddressInput.focus();
      this.postalCodeBillingAddressInput.blur();
    }
    if (countryValue !== undefined && this.countryBillingAddressInput !== null) {
      this.countryBillingAddressInput.value = countryValue;
    }
  }

  private showHidePasswordFn(passwordInput: HTMLInputElement, showHideIconCreator: ElementCreator): void {
    const showHideIconElement = showHideIconCreator.getElement();
    if (passwordInput.getAttribute('type') === TYPE.INPUT_TYPE.PASSWORD) {
      passwordInput.setAttribute('type', TYPE.INPUT_TYPE.TEXT);
      showHideIconElement.textContent = SIGN_UP_TEXT.SHOW_HIDE_ICON.VISIBLE_OFF;
    } else {
      passwordInput.setAttribute('type', TYPE.INPUT_TYPE.PASSWORD);
      showHideIconElement.textContent = SIGN_UP_TEXT.SHOW_HIDE_ICON.VISIBLE;
    }
  }

  private getAddressFormData(inputType: string): Address {
    let cityInput;
    let streetInput;
    let postalCodeInput;
    let countryInput;
    if (inputType === 'Shipping') {
      cityInput = this.cityShippingAddressInput;
      streetInput = this.streetShippingAddressInput;
      postalCodeInput = this.postalCodeShippingAddressInput;
      countryInput = this.countryShippingAddressInput;
    } else if (inputType === 'Billing') {
      cityInput = this.cityBillingAddressInput;
      streetInput = this.streetBillingAddressInput;
      postalCodeInput = this.postalCodeBillingAddressInput;
      countryInput = this.countryBillingAddressInput;
    }
    return {
      country: countryInput?.value ?? '',
      streetName: streetInput?.value ?? '',
      postalCode: postalCodeInput?.value ?? '',
      city: cityInput?.value ?? '',
    };
  }

  private getShippingAddressFormData(): Address {
    return this.getAddressFormData('Shipping');
  }

  private getBillingAddressFormData(): Address {
    return this.getAddressFormData('Billing');
  }

  private getFormData(): MyCustomerDraft {
    const formEmail = this.emailInput?.value ?? '';
    const formPassword = this.passwordInput?.value ?? '';
    const formFirstName = this.firstNameInput?.value ?? '';
    const formLastName = this.lastNameInput?.value ?? '';
    const formDateOfBirth = this.dateOfBirthInput?.value ?? '';
    const shippingAddress = this.getShippingAddressFormData();
    const billingAddress = this.getBillingAddressFormData();
    const formData: MyCustomerDraft = {
      email: formEmail,
      password: formPassword,
      firstName: formFirstName,
      lastName: formLastName,
      dateOfBirth: formDateOfBirth,
      addresses: [shippingAddress, billingAddress],
    };
    if (this.defaultShippingAddressInput?.checked) {
      formData.defaultShippingAddress = 0;
    }
    if (this.defaultBillingAddressInput?.checked) {
      formData.defaultBillingAddress = 1;
    }
    return formData;
  }

  // private inputKeydownFn(): void {
  //   this.errorLine?.classList.remove('show');
  // }
}

export default RegistrationView;
