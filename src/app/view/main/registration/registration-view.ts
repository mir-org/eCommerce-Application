import { CustomerAPI } from '../../../../api/CustomerAPI/CustomerAPI';
import { MyCustomerDraft } from '../../../../api/CustomerAPI/customer-api-type';
import { AuthAPI } from '../../../../api/authAPI/authAPI';
import { Pages } from '../../../router/pages';
import { Router } from '../../../router/router';
import { ElementCreator } from '../../../utils/element-creator';
import InputFieldsCreator from '../../../utils/input-fields-creator';
import { Validator } from '../../../utils/validator';
import { View } from '../../view';
import { SIGN_UP_CLASSES, SIGN_UP_TEXT } from './registration-view-types';

class RegistrationView extends View {
  private form: ElementCreator | null;

  private btnsWrapper: ElementCreator | null;

  private firstNameInput: HTMLInputElement | null;

  private lastNameInput: HTMLInputElement | null;

  private dateOfBirthInput: HTMLInputElement | null;

  private emailInput: HTMLInputElement | null;

  private passwordInput: HTMLInputElement | null;

  private confirmPasswordInput: HTMLInputElement | null;

  private cityAddressInput: HTMLInputElement | null;

  private streetAddressInput: HTMLInputElement | null;

  private postalCodeAddressInput: HTMLInputElement | null;

  private countryAddressInput: HTMLSelectElement | null;

  // private errorLine: HTMLElement | null;

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
    this.cityAddressInput = null;
    this.streetAddressInput = null;
    this.postalCodeAddressInput = null;
    this.countryAddressInput = null;
    // this.errorLine = null;
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
    this.form = new ElementCreator('form', 'registration-form');
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
    this.addAddressInput();
    this.addControlButtons();
  }

  private addFirstNameInput(): void {
    const firstNameInputCreator = new InputFieldsCreator(
      SIGN_UP_CLASSES.REGISTRATION,
      SIGN_UP_CLASSES.FIRST_NAME,
      SIGN_UP_TEXT.FIRST_NAME,
      '',
      'text',
      SIGN_UP_TEXT.FIRST_NAME
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
      SIGN_UP_TEXT.LAST_NAME
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
      SIGN_UP_TEXT.DATE_OF_BIRTH
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
      SIGN_UP_TEXT.EMAIL
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
      SIGN_UP_TEXT.PASSWORD
    );
    const passwordInputElement = passwordInputCreator.getInputElement();
    this.passwordInput = passwordInputElement;
    // firstNameInputElement.addEventListener('keydown', this.inputKeydownFn.bind(this));
    this.form?.addInnerElement(passwordInputCreator.getElement());
  }

  private addConfirmPasswordInput(): void {
    const confirmPasswordInputCreator = new InputFieldsCreator(
      SIGN_UP_CLASSES.REGISTRATION,
      SIGN_UP_CLASSES.PASSWORD,
      SIGN_UP_TEXT.PASSWORD,
      '',
      'password',
      SIGN_UP_TEXT.PASSWORD
    );
    const confirmPasswordInputElement = confirmPasswordInputCreator.getInputElement();
    this.confirmPasswordInput = confirmPasswordInputElement;
    // firstNameInputElement.addEventListener('keydown', this.inputKeydownFn.bind(this));
    this.form?.addInnerElement(confirmPasswordInputCreator.getElement());
  }

  private addAddressInput(): void {
    this.addCityAddressInput();
    this.addStreetAddressInput();
    this.addPostalCodeAddressInput();
    this.addCountryAddressInput();
  }

  private addCityAddressInput(): void {
    const cityAddressInputCreator = new InputFieldsCreator(
      SIGN_UP_CLASSES.REGISTRATION,
      SIGN_UP_CLASSES.CITY,
      SIGN_UP_TEXT.CITY,
      '',
      'text',
      SIGN_UP_TEXT.CITY
    );
    const cityAddressInputElement = cityAddressInputCreator.getInputElement();
    this.cityAddressInput = cityAddressInputElement;
    // firstNameInputElement.addEventListener('keydown', this.inputKeydownFn.bind(this));
    this.form?.addInnerElement(cityAddressInputCreator.getElement());
  }

  private addStreetAddressInput(): void {
    const streetAddressInputCreator = new InputFieldsCreator(
      SIGN_UP_CLASSES.REGISTRATION,
      SIGN_UP_CLASSES.STREET,
      SIGN_UP_TEXT.STREET,
      '',
      'text',
      SIGN_UP_TEXT.STREET
    );
    const streetAddressInputElement = streetAddressInputCreator.getInputElement();
    this.streetAddressInput = streetAddressInputElement;
    // firstNameInputElement.addEventListener('keydown', this.inputKeydownFn.bind(this));
    this.form?.addInnerElement(streetAddressInputCreator.getElement());
  }

  private addPostalCodeAddressInput(): void {
    const postalCodeAddressInputCreator = new InputFieldsCreator(
      SIGN_UP_CLASSES.REGISTRATION,
      SIGN_UP_CLASSES.POSTAL_CODE,
      SIGN_UP_TEXT.POSTAL_CODE,
      '',
      'number',
      SIGN_UP_TEXT.POSTAL_CODE
    );
    const postalCodeAddressInputElement = postalCodeAddressInputCreator.getInputElement();
    this.postalCodeAddressInput = postalCodeAddressInputElement;
    // firstNameInputElement.addEventListener('keydown', this.inputKeydownFn.bind(this));
    this.form?.addInnerElement(postalCodeAddressInputCreator.getElement());
  }

  private addCountryAddressInput(): void {
    // TODO refactor to separate createSelect method
    const countryOptions = ['USA', 'Poland', 'Russia'];
    const countryValues = ['US', 'PL', 'RU'];
    const wrapperClasses = ['registration__country-input-wrapper', 'primary-wrapper'];
    const labelClasses = ['registration__country-label', 'primary-label'];
    const selectClasses = ['registration__country-input', 'primary-input'];
    const countryAddressInputWrapper = new ElementCreator('div', wrapperClasses);
    const countryAddressInputLabel = new ElementCreator('label', labelClasses);
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
    this.form?.addInnerElement(countryAddressInputWrapper.getElement());
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
    } else {
      console.log(validationErrors);
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
