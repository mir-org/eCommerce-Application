import { CustomerAPI } from '../../../../api/customer-api/customer-api';
import { CustomerInfo } from '../../../../api/customer-api/customer-api-types';
import { createPopupWithText } from '../../../utils/create-popup-with-text';
import { ElementCreator } from '../../../utils/element-creator';
import InputFieldsCreator from '../../../utils/input-fields-creator';
import { Validator } from '../../../utils/validator';
import { View } from '../../view';
import { INITIAL_VALUE, PROFILE_CLASSES, PROFILE_TEXT, TYPE } from './user-profile-types';

class UserProfileView extends View {
  private form: ElementCreator | null;

  private data: CustomerInfo | null;

  private firstNameInput: HTMLInputElement | null;

  private lastNameInput: HTMLInputElement | null;

  private emailInput: HTMLInputElement | null;

  private dateOfBirthInput: HTMLInputElement | null;

  private passwordInput: HTMLInputElement | null;

  private confirmPasswordInput: HTMLInputElement | null;

  private shippingAddressFieldSet: ElementCreator | null;

  private billingAddressFieldSet: ElementCreator | null;

  private cityShippingAddressInput: HTMLInputElement | null;

  private cityBillingAddressInput: HTMLInputElement | null;

  private streetShippingAddressInput: HTMLInputElement | null;

  private streetBillingAddressInput: HTMLInputElement | null;

  private postalCodeShippingAddressInput: HTMLInputElement | null;

  private postalCodeBillingAddressInput: HTMLInputElement | null;

  private countryShippingAddressInput: HTMLSelectElement | null;

  private countryBillingAddressInput: HTMLSelectElement | null;

  private errorLine: HTMLElement | null;

  constructor() {
    super('section', PROFILE_CLASSES.PROFILE);
    this.form = null;
    this.data = null;
    this.firstNameInput = null;
    this.lastNameInput = null;
    this.emailInput = null;
    this.dateOfBirthInput = null;
    this.passwordInput = null;
    this.confirmPasswordInput = null;
    this.shippingAddressFieldSet = null;
    this.billingAddressFieldSet = null;
    this.cityShippingAddressInput = null;
    this.cityBillingAddressInput = null;
    this.streetShippingAddressInput = null;
    this.streetBillingAddressInput = null;
    this.postalCodeShippingAddressInput = null;
    this.postalCodeBillingAddressInput = null;
    this.countryShippingAddressInput = null;
    this.countryBillingAddressInput = null;
    this.errorLine = null;
    this.configView();
  }

  private async configView(): Promise<void> {
    await this.getCustomerData();
    this.addTitle();
    this.addForm();
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
    this.addPasswordInput();
    this.addConfirmPasswordInput();
    this.addShippingFieldSet();
    this.addAddressInput(this.shippingAddressFieldSet, 'shipping');
    this.addBillingFieldSet();
    this.addAddressInput(this.billingAddressFieldSet, 'billing');
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
    const firstNameInputElement = firstNameInputCreator.getInputElement();
    firstNameInputCreator.getInputElement().setAttribute('required', '');
    firstNameInputCreator.getInputElement().setAttribute('disabled', '');
    this.firstNameInput = firstNameInputElement;
    firstNameInputElement.addEventListener('input', () => {
      this.inputValidation(firstNameInputCreator, () => Validator.nameField(firstNameInputElement.value));
      this.inputKeydownFn();
    });
    firstNameInputCreator.addInnerElement(this.addControlButtons('firstName'));
    this.form?.addInnerElement(firstNameInputCreator.getElement());
  }

  private addControlButtons(btnType: string): ElementCreator {
    const buttonsWrapper = new ElementCreator('div', 'controls');
    buttonsWrapper.addInnerElement(this.addEditButton(btnType));
    buttonsWrapper.addInnerElement(this.addSaveButton(btnType));
    return buttonsWrapper;
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
    const lastNameInputElement = lastNameInputCreator.getInputElement();
    lastNameInputCreator.getInputElement().setAttribute('required', '');
    lastNameInputCreator.getInputElement().setAttribute('disabled', '');
    this.lastNameInput = lastNameInputElement;
    lastNameInputElement.addEventListener('input', () => {
      this.inputValidation(lastNameInputCreator, () => Validator.nameField(lastNameInputElement.value));
      this.inputKeydownFn();
    });
    lastNameInputCreator.addInnerElement(this.addControlButtons('lastName'));
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
    const dateOfBirthInputElement = dateOfBirthInputCreator.getInputElement();
    dateOfBirthInputCreator.getInputElement().setAttribute('required', '');
    dateOfBirthInputCreator.getInputElement().setAttribute('disabled', '');
    this.dateOfBirthInput = dateOfBirthInputElement;
    dateOfBirthInputElement.addEventListener('input', () => {
      this.inputValidation(dateOfBirthInputCreator, () => Validator.birthField(dateOfBirthInputElement.value));
      this.inputKeydownFn();
    });
    dateOfBirthInputCreator.addInnerElement(this.addControlButtons('birthDay'));
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
    const emailInputElement = emailInputCreator.getInputElement();
    emailInputCreator.getInputElement().setAttribute('required', '');
    emailInputCreator.getInputElement().setAttribute('disabled', '');
    this.emailInput = emailInputElement;
    emailInputElement.addEventListener('input', () => {
      this.inputValidation(emailInputCreator, () => Validator.emailField(emailInputElement.value));
      this.inputKeydownFn();
    });
    emailInputCreator.addInnerElement(this.addControlButtons('email'));
    this.form?.addInnerElement(emailInputCreator.getElement());
  }

  private addPasswordInput(): void {
    const passwordInputCreator = new InputFieldsCreator(
      PROFILE_CLASSES.PROFILE,
      PROFILE_CLASSES.PASSWORD,
      PROFILE_TEXT.PASSWORD,
      '',
      'password',
      ''
    );
    const passwordInputElement = passwordInputCreator.getInputElement();
    passwordInputCreator.getInputElement().setAttribute('required', '');
    passwordInputElement.setAttribute('disabled', '');
    this.passwordInput = passwordInputElement;
    this.addShowHidePasswordIcon(this.passwordInput, passwordInputCreator);
    passwordInputElement.addEventListener('input', () => {
      this.inputValidation(passwordInputCreator, () => Validator.passwordField(passwordInputElement.value));
      this.inputKeydownFn();
    });
    passwordInputCreator.addInnerElement(this.addControlButtons('password').getElement());
    this.form?.addInnerElement(passwordInputCreator.getElement());
  }

  private addConfirmPasswordInput(): void {
    const confirmPasswordInputCreator = new InputFieldsCreator(
      PROFILE_CLASSES.PROFILE,
      PROFILE_CLASSES.CONFIRM_PASSWORD,
      PROFILE_TEXT.CONFIRM_PASSWORD,
      '',
      'password',
      ''
    );
    const confirmPasswordInputElement = confirmPasswordInputCreator.getInputElement();
    confirmPasswordInputCreator.getInputElement().setAttribute('required', '');
    confirmPasswordInputElement.setAttribute('disabled', '');
    this.confirmPasswordInput = confirmPasswordInputElement;
    this.addShowHidePasswordIcon(this.confirmPasswordInput, confirmPasswordInputCreator);
    confirmPasswordInputElement.addEventListener('input', () => {
      const passwordValue = this.passwordInput?.value;
      if (passwordValue !== undefined) {
        this.inputValidation(confirmPasswordInputCreator, () =>
          Validator.confirmPasswordField(confirmPasswordInputElement.value, passwordValue)
        );
        this.inputKeydownFn();
      }
    });
    this.form?.addInnerElement(confirmPasswordInputCreator.getElement());
  }

  private addShowHidePasswordIcon(passwordInput: HTMLInputElement, passwordInputCreator: InputFieldsCreator): void {
    const showHideIconCreator = new ElementCreator(
      'span',
      PROFILE_CLASSES.SHOW_HIDE_ICON,
      PROFILE_TEXT.SHOW_HIDE_ICON.VISIBLE
    );
    showHideIconCreator
      .getElement()
      .addEventListener('click', this.showHidePasswordFn.bind(this, passwordInput, showHideIconCreator));
    passwordInputCreator.addInnerElement(showHideIconCreator);
  }

  private showHidePasswordFn(passwordInput: HTMLInputElement, showHideIconCreator: ElementCreator): void {
    const showHideIconElement = showHideIconCreator.getElement();
    if (passwordInput.getAttribute('type') === TYPE.INPUT_TYPE.PASSWORD) {
      passwordInput.setAttribute('type', TYPE.INPUT_TYPE.TEXT);
      showHideIconElement.textContent = PROFILE_TEXT.SHOW_HIDE_ICON.VISIBLE_OFF;
    } else {
      passwordInput.setAttribute('type', TYPE.INPUT_TYPE.PASSWORD);
      showHideIconElement.textContent = PROFILE_TEXT.SHOW_HIDE_ICON.VISIBLE;
    }
  }

  private addShippingFieldSet(): void {
    const fieldSet = new ElementCreator('fieldset', 'fieldset');
    this.shippingAddressFieldSet = fieldSet;
    const legendFieldSet = new ElementCreator('legend', 'legend');
    legendFieldSet.getElement().textContent = 'Shipping Addresses';
    fieldSet.addInnerElement(legendFieldSet);
    this.form?.addInnerElement(fieldSet);
  }

  private addBillingFieldSet(): void {
    const fieldSet = new ElementCreator('fieldset', 'fieldset');
    this.billingAddressFieldSet = fieldSet;
    const legendFieldSet = new ElementCreator('legend', 'legend');
    legendFieldSet.getElement().textContent = 'Billing Addresses';
    fieldSet.addInnerElement(legendFieldSet);
    this.form?.addInnerElement(fieldSet);
  }

  private addAddressInput(wrapper: ElementCreator | null, type: string): void {
    if (wrapper) {
      this.addCityAddressInput(wrapper, type);
      this.addStreetAddressInput(wrapper, type);
      this.addPostalCodeAddressInput(wrapper, type);
      this.addCountryAddressInput(wrapper, type);
      // this.addDefaultCheckbox(wrapper, type);
    }
  }

  private addCityAddressInput(wrapper: ElementCreator, type: string): void {
    const cityAddressInputCreator = new InputFieldsCreator(
      PROFILE_CLASSES.PROFILE,
      PROFILE_CLASSES.CITY,
      PROFILE_TEXT.CITY,
      this.data?.addresses[0].city ?? '',
      'text',
      ''
    );
    const cityAddressInputElement = cityAddressInputCreator.getInputElement();
    cityAddressInputElement.setAttribute('disabled', '');
    if (type === 'shipping') {
      this.cityShippingAddressInput = cityAddressInputElement;
    } else if (type === 'billing') {
      this.cityBillingAddressInput = cityAddressInputElement;
    }
    cityAddressInputElement.addEventListener('input', () => {
      this.inputValidation(cityAddressInputCreator, () => Validator.cityField(cityAddressInputElement.value));
      this.inputKeydownFn();
    });
    wrapper?.addInnerElement(cityAddressInputCreator.getElement());
  }

  private addStreetAddressInput(wrapper: ElementCreator, type: string): void {
    const streetAddressInputCreator = new InputFieldsCreator(
      PROFILE_CLASSES.PROFILE,
      PROFILE_CLASSES.STREET,
      PROFILE_TEXT.STREET,
      this.data?.addresses[0].streetName ?? '',
      'text',
      ''
    );
    const streetAddressInputElement = streetAddressInputCreator.getInputElement();
    streetAddressInputElement.setAttribute('disabled', '');
    if (type === 'shipping') {
      this.streetShippingAddressInput = streetAddressInputElement;
    } else if (type === 'billing') {
      this.streetBillingAddressInput = streetAddressInputElement;
    }
    streetAddressInputElement.addEventListener('input', () => {
      this.inputValidation(streetAddressInputCreator, () => Validator.streetField(streetAddressInputElement.value));
      this.inputKeydownFn();
    });
    wrapper?.addInnerElement(streetAddressInputCreator.getElement());
  }

  private addPostalCodeAddressInput(wrapper: ElementCreator, type: string): void {
    const postalCodeAddressInputCreator = new InputFieldsCreator(
      PROFILE_CLASSES.PROFILE,
      PROFILE_CLASSES.POSTAL_CODE,
      PROFILE_TEXT.POSTAL_CODE,
      this.data?.addresses[0].postalCode ?? '',
      'text',
      ''
    );
    const postalCodeAddressInputElement = postalCodeAddressInputCreator.getInputElement();
    postalCodeAddressInputElement.setAttribute('disabled', '');
    if (type === 'shipping') {
      this.postalCodeShippingAddressInput = postalCodeAddressInputElement;
    } else if (type === 'billing') {
      this.postalCodeBillingAddressInput = postalCodeAddressInputElement;
    }
    postalCodeAddressInputElement.addEventListener('input', () => {
      let country = '';
      this.inputValidation(postalCodeAddressInputCreator, () => {
        if (type === 'shipping') {
          country = this.countryShippingAddressInput?.value ?? '';
        } else if (type === 'billing') {
          country = this.countryBillingAddressInput?.value ?? '';
        }
        return Validator.postalCodeField(postalCodeAddressInputElement.value, country);
      });
      this.inputKeydownFn();
    });
    wrapper?.addInnerElement(postalCodeAddressInputCreator.getElement());
  }

  private addCountryAddressInput(wrapper: ElementCreator, type: string): void {
    // TODO refactor to separate createSelect method
    const countryOptions = ['USA', 'Russia'];
    const countryValues = ['US', 'RU'];
    const wrapperClasses = ['user-profile__country-input-wrapper', 'primary-wrapper'];
    const labelClasses = ['user-profile__country-label', 'primary-label'];
    const selectClasses = ['user-profile__country-input', 'primary-input'];
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
    countryAddressInputElement.setAttribute('disabled', '');
    if (type === 'shipping') {
      this.countryShippingAddressInput = countryAddressInputElement;
    } else if (type === 'billing') {
      this.countryBillingAddressInput = countryAddressInputElement;
    }
    wrapper?.addInnerElement(countryAddressInputWrapper.getElement());
  }

  private addEditButton(btnType: string): ElementCreator {
    const editButton = new ElementCreator('button', 'edit');
    editButton.getElement().textContent = 'Edit';
    editButton.getElement().setAttribute('type', 'button');
    editButton.getElement().addEventListener('click', (event) => this.editButtonCallback(event));
    editButton.getElement().dataset.btnType = btnType;
    return editButton;
  }

  private addSaveButton(btnType: string): ElementCreator {
    const saveButton = new ElementCreator('button', 'save');
    saveButton.getElement().textContent = 'Save';
    saveButton.getElement().setAttribute('type', 'button');
    saveButton.getElement().setAttribute('disabled', '');
    saveButton.getElement().addEventListener('click', (event) => this.saveButtonCallback(event));
    saveButton.getElement().dataset.btnType = btnType;
    return saveButton;
  }

  private editButtonCallback(event: Event): void {
    console.log(event.target);
    const editButton = event.target as HTMLButtonElement;
    const saveButton = editButton.nextSibling as HTMLButtonElement;
    saveButton.disabled = false;
    editButton.disabled = true;
    const input = editButton.parentElement?.parentElement?.querySelector('.primary-input') as HTMLInputElement;
    input.disabled = false;
  }

  // TODO REFACTOR THIS
  // eslint-disable-next-line max-lines-per-function
  private saveButtonCallback(event: Event): void {
    console.log(event.target);
    const saveButton = event.target as HTMLButtonElement;
    const field = saveButton?.dataset?.btnType;
    const editButton = saveButton.previousSibling as HTMLButtonElement;
    const input = saveButton.parentElement?.parentElement?.querySelector('.primary-input') as HTMLInputElement;
    const newInfo = input.value ?? '';
    const valid = !input.classList.contains('invalid');
    if (valid) {
      switch (field) {
        case 'firstName':
          CustomerAPI.updateCustomerFirstName(newInfo);
          break;
        case 'lastName':
          CustomerAPI.updateCustomerLastName(newInfo);
          break;
        case 'birthDay':
          CustomerAPI.updateCustomerBirthDay(newInfo);
          break;
        case 'email':
          CustomerAPI.updateCustomerEmail(newInfo);
          break;
        default:
          break;
      }
      input.disabled = true;
      editButton.disabled = false;
      saveButton.disabled = true;
    } else {
      switch (field) {
        case 'firstName':
          createPopupWithText('Wrong format of first name.');
          break;
        case 'lastName':
          createPopupWithText('Wrong format of last name.');
          break;
        case 'birthDay':
          createPopupWithText('Wrong format of birthday.');
          break;
        case 'email':
          createPopupWithText('Wrong format of email.');
          break;
        default:
          break;
      }
    }
  }

  private inputValidation(inputCreator: InputFieldsCreator, validatorFn: () => string): boolean {
    const inputElement = inputCreator.getInputElement();
    const errorLineElement = inputCreator.getErrorLine();
    const error = validatorFn();
    if (error) {
      inputElement.classList.add(PROFILE_CLASSES.INPUT_INVALID);
      errorLineElement.textContent = `${error}`;
      return false;
    }
    inputElement.classList.remove(PROFILE_CLASSES.INPUT_INVALID);
    errorLineElement.textContent = INITIAL_VALUE.ERROR_LINE;
    return true;
  }

  private inputKeydownFn(): void {
    this.errorLine?.classList.remove(PROFILE_CLASSES.ERROR_LINE_SHOW);
  }
}

export default UserProfileView;
