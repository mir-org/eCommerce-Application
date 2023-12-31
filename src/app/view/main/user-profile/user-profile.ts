import { CustomerAPI } from '../../../../api/customer-api/customer-api';
import { Address, CustomerInfo } from '../../../../api/customer-api/customer-api-types';
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

  private currentPasswordInput: HTMLInputElement | null;

  private shippingAddressFieldSet: ElementCreator | null;

  private billingAddressFieldSet: ElementCreator | null;

  private addressesWrapper: ElementCreator | null;

  private cityShippingAddressInput: HTMLInputElement | null;

  private cityBillingAddressInput: HTMLInputElement | null;

  private passwordWrapper: InputFieldsCreator | null;

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
    this.currentPasswordInput = null;
    this.passwordWrapper = null;
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
    this.addressesWrapper = null;
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
    this.form = new ElementCreator('form', 'user-profile__form');
    this.viewElementCreator.addInnerElement(this.form.getElement());
    this.addFirstNameInput();
    this.addLastNameInput();
    this.addDateOfBirthInput();
    this.addEmailInput();
    this.addPasswordInput();
    this.addAddressesWrapper();
    this.createAddresses();
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
    const handleFirstNameInputChange = (): void => {
      this.inputValidation(firstNameInputCreator, () => Validator.nameField(firstNameInputElement.value));
      this.inputKeydownFn();
    };
    firstNameInputElement.addEventListener('input', handleFirstNameInputChange);
    firstNameInputElement.addEventListener('focusin', handleFirstNameInputChange);
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
    const handleLastNameInputChange = (): void => {
      this.inputValidation(lastNameInputCreator, () => Validator.nameField(lastNameInputElement.value));
      this.inputKeydownFn();
    };
    lastNameInputElement.addEventListener('input', handleLastNameInputChange);
    lastNameInputElement.addEventListener('focusin', handleLastNameInputChange);
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
    const handleDateOfBirthInputChange = (): void => {
      this.inputValidation(dateOfBirthInputCreator, () => Validator.birthField(dateOfBirthInputElement.value));
      this.inputKeydownFn();
    };
    dateOfBirthInputElement.addEventListener('input', handleDateOfBirthInputChange);
    dateOfBirthInputElement.addEventListener('focusin', handleDateOfBirthInputChange);
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
    const handleEmailInputChange = (): void => {
      this.inputValidation(emailInputCreator, () => Validator.emailField(emailInputElement.value));
      this.inputKeydownFn();
    };
    emailInputElement.addEventListener('input', handleEmailInputChange);
    emailInputElement.addEventListener('focusin', handleEmailInputChange);
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
    this.passwordWrapper = passwordInputCreator;
    const passwordInputElement = passwordInputCreator.getInputElement();
    passwordInputCreator.getInputElement().setAttribute('required', '');
    passwordInputElement.setAttribute('disabled', '');
    this.passwordInput = passwordInputElement;
    this.addShowHidePasswordIcon(this.passwordInput, passwordInputCreator);
    const handlePasswordInputChange = (): void => {
      this.inputValidation(passwordInputCreator, () => Validator.passwordField(passwordInputElement.value));
      this.inputKeydownFn();
    };
    passwordInputElement.addEventListener('input', handlePasswordInputChange);
    passwordInputElement.addEventListener('focusin', handlePasswordInputChange);
    this.addCurrentPasswordInput();
    passwordInputCreator.addInnerElement(this.addControlButtons('password').getElement());
    this.form?.addInnerElement(passwordInputCreator.getElement());
  }

  private addCurrentPasswordInput(): void {
    const currentPasswordInputCreator = new InputFieldsCreator(
      PROFILE_CLASSES.PROFILE,
      PROFILE_CLASSES.CURRENT_PASSWORD,
      PROFILE_TEXT.CURRENT_PASSWORD,
      '',
      'password',
      ''
    );
    const currentPasswordInputElement = currentPasswordInputCreator.getInputElement();
    currentPasswordInputCreator.getInputElement().setAttribute('required', '');
    currentPasswordInputElement.setAttribute('disabled', '');
    this.currentPasswordInput = currentPasswordInputElement;
    this.addShowHidePasswordIcon(this.currentPasswordInput, currentPasswordInputCreator);
    const handleConfirmPasswordInputChange = (): void => {
      const passwordValue = this.passwordInput?.value;
      if (passwordValue !== undefined) {
        this.inputValidation(currentPasswordInputCreator, () =>
          Validator.passwordField(currentPasswordInputElement.value)
        );
        this.inputKeydownFn();
      }
    };
    currentPasswordInputElement.addEventListener('input', handleConfirmPasswordInputChange);
    currentPasswordInputElement.addEventListener('focusin', handleConfirmPasswordInputChange);
    this.passwordWrapper?.addInnerElement(currentPasswordInputCreator.getElement());
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

  private addAddressesWrapper(): void {
    const addressesWrapper = new ElementCreator('div', ['user-profile__addresses-input-wrapper', 'primary-wrapper']);
    this.addressesWrapper = addressesWrapper;
    this.form?.addInnerElement(addressesWrapper);
  }

  private createAddresses(): void {
    const addresses = this.data?.addresses;
    addresses?.forEach((address) => {
      this.addressesWrapper?.addInnerElement(this.createAddress(address));
    });
    // console.log(addresses);
    // console.log(this.data?.shippingAddressIds);
    // console.log(this.data?.billingAddressIds);
    // console.log(this.data?.defaultBillingAddressId);
    // console.log(this.data?.defaultShippingAddressId);
  }

  private createAddress(address: Address): ElementCreator {
    const addressWrapper = new ElementCreator('div', PROFILE_CLASSES.ADDRESS);
    const { id } = address;
    addressWrapper.addInnerElement(this.addAddressInfo(address).getElement());
    addressWrapper.addInnerElement(this.addCityAddressInput(address).getElement());
    addressWrapper.addInnerElement(this.addStreetAddressInput(address).getElement());
    addressWrapper.addInnerElement(this.addPostalCodeAddressInput(address).getElement());
    addressWrapper.addInnerElement(this.addCountryAddressInput(address).getElement());
    if (id) {
      addressWrapper.addInnerElement(this.addControlButtons(id));
      addressWrapper.getElement().dataset.id = id;
    }
    return addressWrapper;
  }

  private addAddressInfo(address: Address): ElementCreator {
    const addressInfoWrapper = new ElementCreator('div', 'user-profile__addresses-wrapper');
    const defaultBillingAddressId = this.data?.defaultBillingAddressId;
    const defaultShippingAddressId = this.data?.defaultShippingAddressId;
    const billingAddressIds = this.data?.billingAddressIds;
    const shippingAddressIds = this.data?.shippingAddressIds;
    let text = '';
    if (address.id) {
      if (address.id === defaultBillingAddressId) text += 'Default ';
      if (address.id === defaultShippingAddressId) text += 'Default ';
      if (billingAddressIds?.includes(address.id)) text += 'Billing Address';
      if (shippingAddressIds?.includes(address.id)) text += 'Shipping Address';
    }
    addressInfoWrapper.getElement().textContent = text;
    return addressInfoWrapper;
  }

  private addCityAddressInput(address: Address): InputFieldsCreator {
    const cityAddressInputCreator = new InputFieldsCreator(
      PROFILE_CLASSES.PROFILE,
      PROFILE_CLASSES.CITY,
      PROFILE_TEXT.CITY,
      address.city ?? '',
      'text',
      ''
    );
    const cityAddressInputElement = cityAddressInputCreator.getInputElement();
    cityAddressInputElement.setAttribute('disabled', '');
    const handleCityAddressInputChange = (): void => {
      this.inputValidation(cityAddressInputCreator, () => Validator.cityField(cityAddressInputElement.value));
      this.inputKeydownFn();
    };
    cityAddressInputElement.addEventListener('input', handleCityAddressInputChange);
    cityAddressInputElement.addEventListener('focusin', handleCityAddressInputChange);
    return cityAddressInputCreator;
  }

  private addStreetAddressInput(address: Address): InputFieldsCreator {
    const streetAddressInputCreator = new InputFieldsCreator(
      PROFILE_CLASSES.PROFILE,
      PROFILE_CLASSES.STREET,
      PROFILE_TEXT.STREET,
      address.streetName ?? '',
      'text',
      ''
    );
    const streetAddressInputElement = streetAddressInputCreator.getInputElement();
    streetAddressInputElement.setAttribute('disabled', '');
    const handleStreetAddressInputChange = (): void => {
      this.inputValidation(streetAddressInputCreator, () => Validator.streetField(streetAddressInputElement.value));
      this.inputKeydownFn();
    };
    streetAddressInputElement.addEventListener('input', handleStreetAddressInputChange);
    streetAddressInputElement.addEventListener('focusin', handleStreetAddressInputChange);
    return streetAddressInputCreator;
  }

  private addPostalCodeAddressInput(address: Address): InputFieldsCreator {
    const postalCodeAddressInputCreator = new InputFieldsCreator(
      PROFILE_CLASSES.PROFILE,
      PROFILE_CLASSES.POSTAL_CODE,
      PROFILE_TEXT.POSTAL_CODE,
      address.postalCode ?? '',
      'text',
      ''
    );
    const postalCodeAddressInputElement = postalCodeAddressInputCreator.getInputElement();
    postalCodeAddressInputElement.setAttribute('disabled', '');
    const handlePostalCodeInputChange = (): void => {
      const id = postalCodeAddressInputElement.parentElement?.parentElement?.parentElement?.dataset.id;
      const selectElement = document.querySelector(`div[data-id="${id}"] select`) as HTMLSelectElement;
      this.inputValidation(postalCodeAddressInputCreator, () =>
        Validator.postalCodeField(postalCodeAddressInputElement.value, selectElement?.value ?? '')
      );
      this.inputKeydownFn();
    };
    postalCodeAddressInputElement.addEventListener('input', () => handlePostalCodeInputChange());
    postalCodeAddressInputElement.addEventListener('focusin', () => handlePostalCodeInputChange());
    return postalCodeAddressInputCreator;
  }

  private addCountryAddressInput(address: Address): ElementCreator {
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
    countryAddressInputElement.value = address.country ?? '';
    const handleCountryAddressInputChange = (): void => {
      const postCodeInputWrapper = countryAddressInputCreator.getElement().parentElement?.parentElement
        ?.previousSibling as HTMLElement;
      const postCodeInput = postCodeInputWrapper?.firstChild?.firstChild;
      postCodeInput?.dispatchEvent(new Event('input'));
    };
    countryAddressInputElement.addEventListener('change', () => handleCountryAddressInputChange());
    return countryAddressInputWrapper;
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
    const editButton = event.target as HTMLButtonElement;
    const saveButton = editButton.nextSibling as HTMLButtonElement;
    saveButton.disabled = false;
    editButton.disabled = true;
    const inputs = editButton.parentElement?.parentElement?.querySelectorAll(
      '.primary-input'
    ) as NodeListOf<HTMLInputElement>;
    inputs.forEach((input) => {
      const inputCopy = input as HTMLInputElement;
      inputCopy.disabled = false;
    });
  }

  // TODO REFACTOR THIS
  // eslint-disable-next-line max-lines-per-function
  private saveButtonCallback(event: Event): void {
    const saveButton = event.target as HTMLButtonElement;
    const field = saveButton?.dataset?.btnType;
    const editButton = saveButton.previousSibling as HTMLButtonElement;
    const inputs = saveButton.parentElement?.parentElement?.querySelectorAll(
      '.primary-input'
    ) as NodeListOf<HTMLInputElement>;
    const newInfo = inputs[0]?.value ?? '';
    // console.log(newInfo);
    const current = inputs[1]?.value ?? '';
    let valid = true;
    inputs.forEach((input) => {
      if (input.classList.contains('invalid')) {
        valid = false;
      }
    });
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
        case 'password':
          CustomerAPI.updateCustomerPassword(newInfo, current);
          break;
        default:
          break;
      }
      inputs.forEach((input) => {
        const inputCopy = input as HTMLInputElement;
        inputCopy.disabled = true;
        // inputCopy.value = '';
        inputCopy.focus();
        inputCopy.blur();
      });
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
        case 'password':
          createPopupWithText('Wrong format of password.');
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
