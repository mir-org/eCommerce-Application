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

  private firstNameInput: HTMLInputElement | null;

  private lastNameInput: HTMLInputElement | null;

  private emailInput: HTMLInputElement | null;

  private passwordInput: HTMLInputElement | null;

  private confirmPasswordInput: HTMLInputElement | null;

  private addressInput: HTMLInputElement | null;

  // private errorLine: HTMLElement | null;

  constructor(private router: Router) {
    super('section', SIGN_UP_CLASSES.REGISTRATION);
    this.form = null;
    this.firstNameInput = null;
    this.lastNameInput = null;
    this.emailInput = null;
    this.passwordInput = null;
    this.confirmPasswordInput = null;
    this.addressInput = null;
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
    this.viewElementCreator.addInnerElement(this.form.getElement());
  }

  private configForm(): void {
    this.addFirstNameInput();
    this.addLastNameInput();
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
    const addressInputCreator = new InputFieldsCreator(
      SIGN_UP_CLASSES.REGISTRATION,
      SIGN_UP_CLASSES.ADDRESS,
      SIGN_UP_TEXT.ADDRESS,
      '',
      'text',
      SIGN_UP_TEXT.ADDRESS
    );
    const addressInputElement = addressInputCreator.getInputElement();
    this.addressInput = addressInputElement;
    // firstNameInputElement.addEventListener('keydown', this.inputKeydownFn.bind(this));
    this.form?.addInnerElement(addressInputCreator.getElement());
  }

  private addControlButtons(): void {
    const submitBtn = new ElementCreator('button', SIGN_UP_CLASSES.BUTTON, SIGN_UP_TEXT.BUTTON);
    submitBtn.getElement().setAttribute('type', 'submit');
    this.form?.addInnerElement(submitBtn);
    this.form?.getElement().addEventListener('submit', (event: Event) => this.handleSubmit(event));
  }

  private async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    const formData = this.getFormData();
    if (Validator.passwordField(formData.password)) {
      await CustomerAPI.registerCustomer(formData);
      await AuthAPI.fetchPasswordToken(formData.email, formData.password);
      await CustomerAPI.getCustomerInfo();
      await CustomerAPI.loginCustomer(formData.email, formData.password);
      this.router.navigate(Pages.INDEX);
    } else {
      console.log('братан, твой пароль не очень');
    }
  }

  private getFormData(): MyCustomerDraft {
    const formEmail = this.emailInput?.value ?? '';
    const formPassword = this.passwordInput?.value ?? '';
    const formFirstName = this.firstNameInput?.value ?? '';
    const formLastName = this.lastNameInput?.value ?? '';
    const formAddress = this.addressInput?.value ?? '';
    const formData: MyCustomerDraft = {
      email: formEmail,
      password: formPassword,
      firstName: formFirstName,
      lastName: formLastName,
      addresses: [
        {
          country: 'RU',
          streetName: formAddress,
          postalCode: formAddress,
          city: formAddress,
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
