import { CustomerAPI } from '../../../../api/CustomerAPI/CustomerAPI';
import { StatusCodes } from '../../../../api/CustomerAPI/customer-api-type';
import { Pages } from '../../../router/pages';
import { Router } from '../../../router/router';
import State from '../../../state/state';
import { ElementCreator } from '../../../utils/element-creator';
import InputFieldsCreator from '../../../utils/input-fields-creator';
import HeaderView from '../../header/header-view';
import { View } from '../../view';
import { CssClasses, INITIAL_VALUE, KEY_FOR_SAVE, TEXT, TYPE } from './login-view-types';

class LoginView extends View {
  private form: ElementCreator | null;

  private errorLine: HTMLElement | null;

  private emailInput: HTMLInputElement | null;

  private passwordInput: HTMLInputElement | null;

  constructor(
    private router: Router,
    private header: HeaderView | null,
    private state: State
  ) {
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
    this.emailInput = emailInputElement;
    emailInputElement.addEventListener('keydown', this.inputKeydownFn.bind(this));
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
    this.passwordInput = passwordInputElement;
    passwordInputElement.addEventListener('keydown', this.inputKeydownFn.bind(this));
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
    this.errorLine?.classList.remove('show');
  }

  private async loginButtonClickFn(event: Event): Promise<void> {
    if (!this.emailInput || !this.passwordInput) {
      throw new Error();
    }
    event.preventDefault();
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    const loginStatusCode = await CustomerAPI.loginCustomer(email, password);
    if (loginStatusCode === StatusCodes.successfulLogin) {
      this.router.navigate(Pages.INDEX);
      this.state.setValue(KEY_FOR_SAVE.LOGIN_STATUS, 'true');
      this.header?.customerLogin(this.state);
      await CustomerAPI.getCustomerInfo();
    } else {
      this.errorLine?.classList.add('show');
    }
  }

  private showHidePasswordFn(showHideIconCreator: ElementCreator): void {
    const showHideIconElement = showHideIconCreator.getElement();
    if (this.passwordInput?.getAttribute('type') === TYPE.INPUT_TYPE.PASSWORD) {
      this.passwordInput.setAttribute('type', TYPE.INPUT_TYPE.TEXT);
      showHideIconElement.textContent = TEXT.SHOW_HIDE_ICON.VISIBLE_OFF;
    } else {
      this.passwordInput?.setAttribute('type', TYPE.INPUT_TYPE.PASSWORD);
      showHideIconElement.textContent = TEXT.SHOW_HIDE_ICON.VISIBLE;
    }
  }

  private registrationLinkClickFn(event: Event): void {
    event.preventDefault();
    this.router.navigate(Pages.REGISTRATION);
  }
}

export default LoginView;
