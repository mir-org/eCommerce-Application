import { CustomerAPI } from '../../../../api/CustomerAPI/CustomerAPI';
import { MyCustomerDraft } from '../../../../api/CustomerAPI/customer-api-type';
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

  private cityAddressInput: HTMLInputElement | null;

  private streetAddressInput: HTMLInputElement | null;

  private postalCodeAddressInput: HTMLInputElement | null;

  private countryAddressInput: HTMLSelectElement | null;

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
    this.cityAddressInput = null;
    this.streetAddressInput = null;
    this.postalCodeAddressInput = null;
    this.countryAddressInput = null;
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
    this.addAddressInput(this.shippingAddressFieldSet);
    this.addBillingFieldSet();
    this.addAddressInput(this.billingAddressFieldSet);
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

  private addAddressInput(wrapper: ElementCreator | null): void {
    if (wrapper) {
      this.addCityAddressInput(wrapper);
      this.addStreetAddressInput(wrapper);
      this.addPostalCodeAddressInput(wrapper);
      this.addCountryAddressInput(wrapper);
      this.addDefaultCheckbox(wrapper);
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

  private addCityAddressInput(wrapper: ElementCreator): void {
    const cityAddressInputCreator = new InputFieldsCreator(
      SIGN_UP_CLASSES.REGISTRATION,
      SIGN_UP_CLASSES.CITY,
      SIGN_UP_TEXT.CITY,
      '',
      'text',
      ''
    );
    const cityAddressInputElement = cityAddressInputCreator.getInputElement();
    this.cityAddressInput = cityAddressInputElement;
    // firstNameInputElement.addEventListener('keydown', this.inputKeydownFn.bind(this));
    wrapper?.addInnerElement(cityAddressInputCreator.getElement());
  }

  private addStreetAddressInput(wrapper: ElementCreator | null): void {
    const streetAddressInputCreator = new InputFieldsCreator(
      SIGN_UP_CLASSES.REGISTRATION,
      SIGN_UP_CLASSES.STREET,
      SIGN_UP_TEXT.STREET,
      '',
      'text',
      ''
    );
    const streetAddressInputElement = streetAddressInputCreator.getInputElement();
    this.streetAddressInput = streetAddressInputElement;
    // firstNameInputElement.addEventListener('keydown', this.inputKeydownFn.bind(this));
    wrapper?.addInnerElement(streetAddressInputCreator.getElement());
  }

  private addPostalCodeAddressInput(wrapper: ElementCreator | null): void {
    const postalCodeAddressInputCreator = new InputFieldsCreator(
      SIGN_UP_CLASSES.REGISTRATION,
      SIGN_UP_CLASSES.POSTAL_CODE,
      SIGN_UP_TEXT.POSTAL_CODE,
      '',
      'number',
      ''
    );
    const postalCodeAddressInputElement = postalCodeAddressInputCreator.getInputElement();
    this.postalCodeAddressInput = postalCodeAddressInputElement;
    // firstNameInputElement.addEventListener('keydown', this.inputKeydownFn.bind(this));
    wrapper?.addInnerElement(postalCodeAddressInputCreator.getElement());
  }

  private addCountryAddressInput(wrapper: ElementCreator | null): void {
    // TODO refactor to separate createSelect method
    const countryOptions = ['USA', 'Poland', 'Russia'];
    const countryValues = ['US', 'PL', 'RU'];
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
    this.countryAddressInput = countryAddressInputElement;
    wrapper?.addInnerElement(countryAddressInputWrapper.getElement());
  }

  private addDefaultCheckbox(wrapper: ElementCreator): void {
    const defaultAddressCheckboxCreator = new InputFieldsCreator(
      SIGN_UP_CLASSES.REGISTRATION,
      SIGN_UP_CLASSES.SET_DEFAULT_ADDRESS,
      SIGN_UP_TEXT.SET_DEFAULT_ADDRESS,
      '',
      'checkbox',
      ''
    );
    console.log(defaultAddressCheckboxCreator);
    // const cityAddressInputElement = cityAddressInputCreator.getInputElement();
    // this.cityAddressInput = cityAddressInputElement;
    // firstNameInputElement.addEventListener('keydown', this.inputKeydownFn.bind(this));
    wrapper?.addInnerElement(defaultAddressCheckboxCreator.getElement());
    const kek = defaultAddressCheckboxCreator.getElement().lastChild?.firstChild as HTMLElement;
    console.log(kek);
    kek.classList.remove('primary-input');
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

  private getFormData(): MyCustomerDraft {
    const formEmail = this.emailInput?.value ?? '';
    const formPassword = this.passwordInput?.value ?? '';
    const formFirstName = this.firstNameInput?.value ?? '';
    const formLastName = this.lastNameInput?.value ?? '';
    const formDateOfBirth = this.dateOfBirthInput?.value ?? '';
    const formCity = this.cityAddressInput?.value ?? '';
    const formStreet = this.streetAddressInput?.value ?? '';
    const formPostalCode = this.postalCodeAddressInput?.value ?? '';
    const formCountry = this.countryAddressInput?.value ?? '';
    const formData: MyCustomerDraft = {
      email: formEmail,
      password: formPassword,
      firstName: formFirstName,
      lastName: formLastName,
      dateOfBirth: formDateOfBirth,
      addresses: [
        {
          country: formCountry,
          streetName: formStreet,
          postalCode: formPostalCode,
          city: formCity,
        },
      ],
    };
    return formData;
  }

  // private inputKeydownFn(): void {
  //   this.errorLine?.classList.remove('show');
  // }
}

export default RegistrationView;
