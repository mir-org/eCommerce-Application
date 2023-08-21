import { CustomerAPI } from '../../../../api/CustomerAPI/CustomerAPI';
import { StatusCodes } from '../../../../api/CustomerAPI/customer-api-type';
import { Pages } from '../../../router/pages';
import { Router } from '../../../router/router';
import { ElementCreator } from '../../../utils/element-creator';
import InputFieldsCreator from '../../../utils/input-fields-creator';
import { View } from '../../view';
import { CssClasses, INITIAL_VALUE, TEXT, TYPE } from './login-view-types';
import { Validator } from '../../../utils/validator';

class LoginView extends View {
  private form: ElementCreator | null;

  private errorLine: HTMLElement | null;

  private emailInput: InputFieldsCreator | null;

  private passwordInput: InputFieldsCreator | null;

  constructor(private router: Router) {
    super('section', CssClasses.LOGIN);
    this.form = null;
    this.errorLine = null;
    this.emailInput = null;
    this.passwordInput = null;
    this.configView();
  }

  private configView(): void {
    this.addTitle();
    this.addErrorLine();
    this.addForm();
    this.configForm();
    this.addRegistrationLink();
  }

  private configForm(): void {
    this.addEmailInput();
    this.addPasswordInput();
    this.addLoginButton();
  }

  private addTitle(): void {
    const titleCreator = new ElementCreator('h1', CssClasses.TITLE, TEXT.TITLE);
    this.viewElementCreator.addInnerElement(titleCreator);
  }

  private addErrorLine(): void {
    const errorLineCreator = new ElementCreator('div', CssClasses.ERROR_LINE, TEXT.ERROR_LINE);
    const errorLineElement = errorLineCreator.getElement();
    this.errorLine = errorLineElement;
    this.viewElementCreator.addInnerElement(errorLineElement);
  }

  private addForm(): void {
    const formCreator = new ElementCreator('form', CssClasses.FORM, TEXT.FORM);
    this.form = formCreator;
    this.viewElementCreator.addInnerElement(formCreator.getElement());
  }

  private addEmailInput(): void {
    const emailInputCreator = new InputFieldsCreator(
      CssClasses.LOGIN,
      CssClasses.EMAIL_INPUT,
      TEXT.EMAIL_INPUT,
      INITIAL_VALUE.INPUT_VALUE.EMAIL,
      TYPE.INPUT_TYPE.EMAIL,
      INITIAL_VALUE.PLACEHOLDER.EMAIL
    );
    const emailInputElement = emailInputCreator.getInputElement();
    this.emailInput = emailInputCreator;
    emailInputElement.addEventListener('input', () => {
      this.inputValidation(emailInputCreator, () => Validator.emailField(emailInputElement.value));
      this.inputKeydownFn();
    });
    this.form?.addInnerElement(emailInputCreator.getElement());
  }

  private addPasswordInput(): void {
    const passwordInputCreator = new InputFieldsCreator(
      CssClasses.LOGIN,
      CssClasses.PASSWORD_INPUT,
      TEXT.PASSWORD_INPUT,
      INITIAL_VALUE.INPUT_VALUE.PASSWORD,
      TYPE.INPUT_TYPE.PASSWORD,
      INITIAL_VALUE.PLACEHOLDER.PASSWORD
    );
    this.addShowHidePasswordIcon(passwordInputCreator);
    const passwordInputElement = passwordInputCreator.getInputElement();
    this.passwordInput = passwordInputCreator;
    passwordInputElement.addEventListener('input', () => {
      this.inputValidation(passwordInputCreator, () => Validator.passwordField(passwordInputElement.value));
      this.inputKeydownFn();
    });
    this.form?.addInnerElement(passwordInputCreator.getElement());
  }

  private addShowHidePasswordIcon(passwordInputCreator: InputFieldsCreator): void {
    const showHideIconCreator = new ElementCreator('span', CssClasses.SHOW_HIDE_ICON, TEXT.SHOW_HIDE_ICON.VISIBLE);
    showHideIconCreator.getElement().addEventListener('click', this.showHidePasswordFn.bind(this, showHideIconCreator));
    passwordInputCreator.addInnerElement(showHideIconCreator);
  }

  private addLoginButton(): void {
    const loginButtonCreator = new ElementCreator('button', CssClasses.LOGIN_BUTTON, TEXT.BUTTON);
    const loginButtonElement = loginButtonCreator.getElement();
    loginButtonElement.setAttribute('type', TYPE.BUTTON_TYPE);
    loginButtonElement.addEventListener('click', (e) => this.loginButtonClickFn.call(this, e));
    this.form?.addInnerElement(loginButtonElement);
  }

  private addRegistrationLink(): void {
    const registrationLinkCreator = new ElementCreator('a', CssClasses.REGISTRATION_LINK, TEXT.REGISTRATION_LINK);
    const registrationLinkElement = registrationLinkCreator.getElement();
    registrationLinkElement.addEventListener('click', (e) => this.registrationLinkClickFn.call(this, e));
    this.viewElementCreator.addInnerElement(registrationLinkElement);
  }

  private inputKeydownFn(): void {
    this.errorLine?.classList.remove(CssClasses.ERROR_LINE_SHOW);
  }

  private inputValidation(inputCreator: InputFieldsCreator, validatorFn: () => string): boolean {
    const inputElement = inputCreator.getInputElement();
    const errorLineElement = inputCreator.getErrorLine();
    const error = validatorFn();
    if (error) {
      inputElement.classList.add(CssClasses.INPUT_INVALID);
      errorLineElement.textContent = `${error}`;
      return false;
    }
    inputElement.classList.remove(CssClasses.INPUT_INVALID);
    errorLineElement.textContent = INITIAL_VALUE.ERROR_LINE;
    return true;
  }

  private async loginButtonClickFn(event: Event): Promise<void> {
    if (!this.emailInput || !this.passwordInput) {
      throw new Error();
    }
    event.preventDefault();
    const isFormsValid = this.isFormsValid.call(this, this.emailInput, this.passwordInput);
    if (!isFormsValid) return;
    const email = this.emailInput.getInputElement().value;
    const password = this.passwordInput.getInputElement().value;
    const loginStatusCode = await CustomerAPI.loginCustomer(email, password);
    if (loginStatusCode === StatusCodes.successfulLogin) {
      this.router.navigate(Pages.INDEX);
      await CustomerAPI.getCustomerInfo();
    } else {
      this.errorLine?.classList.add(CssClasses.ERROR_LINE_SHOW);
    }
  }

  private isFormsValid(emailInputCreator: InputFieldsCreator, passwordInputCreator: InputFieldsCreator): boolean {
    const isEmailValid = this.inputValidation.call(this, emailInputCreator, () =>
      Validator.emailField(emailInputCreator.getInputElement().value)
    );
    const isPasswordValid = this.inputValidation.call(this, passwordInputCreator, () =>
      Validator.passwordField(passwordInputCreator.getInputElement().value)
    );
    if (isEmailValid && isPasswordValid) {
      return true;
    }
    return false;
  }

  private showHidePasswordFn(showHideIconCreator: ElementCreator): void {
    const showHideIconElement = showHideIconCreator.getElement();
    if (this.passwordInput?.getInputElement().getAttribute('type') === TYPE.INPUT_TYPE.PASSWORD) {
      this.passwordInput.getInputElement().setAttribute('type', TYPE.INPUT_TYPE.TEXT);
      showHideIconElement.textContent = TEXT.SHOW_HIDE_ICON.VISIBLE_OFF;
    } else {
      this.passwordInput?.getInputElement().setAttribute('type', TYPE.INPUT_TYPE.PASSWORD);
      showHideIconElement.textContent = TEXT.SHOW_HIDE_ICON.VISIBLE;
    }
  }

  private registrationLinkClickFn(event: Event): void {
    event.preventDefault();
    this.router.navigate(Pages.REGISTRATION);
  }
}

export default LoginView;
