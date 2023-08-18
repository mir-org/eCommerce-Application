import { CustomerAPI } from '../../../../api/CustomerAPI/CustomerAPI';
import { AuthAPI } from '../../../../api/authAPI/authAPI';
import State from '../../../state/state';
import { ElementCreator } from '../../../utils/element-creator';
import InputFieldsCreator from '../../../utils/input-fields-creator';
import { Validator } from '../../../utils/validator';
import { View } from '../../view';
import { SIGN_UP_CLASSES, SIGN_UP_TEXT, SIGN_UP_KEY } from './enums';

class RegistrationView extends View {
  private state: State;

  private form: HTMLFormElement | ElementCreator;

  constructor(state: State) {
    super('section', SIGN_UP_CLASSES.REGISTRATION);
    this.state = state;
    this.form = new ElementCreator('form', 'registration-form');
    this.configView();
  }

  // пофиксить длину функции, вынести типы в енум
  // eslint-disable-next-line max-lines-per-function
  private configView(): void {
    const title = new ElementCreator('h1', SIGN_UP_CLASSES.TITLE, SIGN_UP_TEXT.TITLE);
    this.viewElementCreator.addInnerElement(title);
    this.viewElementCreator.addInnerElement(this.form);
    this.configInputFields(
      SIGN_UP_CLASSES.REGISTRATION,
      SIGN_UP_CLASSES.FIRST_NAME,
      SIGN_UP_TEXT.FIRST_NAME,
      SIGN_UP_KEY.FIRST_NAME,
      'text'
    );
    this.configInputFields(
      SIGN_UP_CLASSES.REGISTRATION,
      SIGN_UP_CLASSES.LAST_NAME,
      SIGN_UP_TEXT.LAST_NAME,
      SIGN_UP_KEY.LAST_NAME,
      'text'
    );
    this.configInputFields(
      SIGN_UP_CLASSES.REGISTRATION,
      SIGN_UP_CLASSES.ADDRESS,
      SIGN_UP_TEXT.ADDRESS,
      SIGN_UP_KEY.ADDRESS,
      'text'
    );
    this.configInputFields(
      SIGN_UP_CLASSES.REGISTRATION,
      SIGN_UP_CLASSES.EMAIL,
      SIGN_UP_TEXT.EMAIL,
      SIGN_UP_KEY.EMAIL,
      'email'
    );
    this.configInputFields(
      SIGN_UP_CLASSES.REGISTRATION,
      SIGN_UP_CLASSES.PASSWORD,
      SIGN_UP_TEXT.PASSWORD,
      SIGN_UP_KEY.PASSWORD,
      'password'
    );
    this.configInputFields(
      SIGN_UP_CLASSES.REGISTRATION,
      SIGN_UP_CLASSES.CONFIRM_PASSWORD,
      SIGN_UP_TEXT.CONFIRM_PASSWORD,
      SIGN_UP_KEY.CONFIRM_PASSWORD,
      'password'
    );
    const submitBtn = new ElementCreator('button', SIGN_UP_CLASSES.BUTTON, SIGN_UP_TEXT.BUTTON);
    submitBtn.getElement().setAttribute('type', 'submit');
    this.form.addInnerElement(submitBtn);
    this.form.getElement().addEventListener('submit', (event: Event) => this.handleSubmit(event));
  }

  private configInputFields(firstClass: string, secondClass: string, text: string, key: string, type: string): void {
    const inputField = new InputFieldsCreator(firstClass, secondClass, text, this.state.getValue(key), (event) =>
      this.keyupHandler(event, key)
    );
    inputField.setType(type);
    this.form.addInnerElement(inputField.getElement());
  }

  private async handleSubmit(event: Event): Promise<void> {
    console.log('handled');
    event.preventDefault();
    const formPasswordInput = this.form.getElement().querySelector('.registration__password-input');
    Validator.passwordField(formPasswordInput.value);
    await CustomerAPI.registerCustomer({
      email: formPasswordInput.value,
      password: formPasswordInput.value,
      firstName: formPasswordInput.value,
      lastName: formPasswordInput.value,
      addresses: [
        {
          country: 'RU',
          streetName: formPasswordInput.value,
          postalCode: formPasswordInput.value,
          city: formPasswordInput.value,
        },
      ],
    });
    await AuthAPI.fetchPasswordToken(formPasswordInput.value, formPasswordInput.value);
    await CustomerAPI.getCustomerInfo();
  }

  private keyupHandler(event: KeyboardEvent, fieldName: string): void {
    if (event.target instanceof HTMLInputElement) {
      this.state.setValue(fieldName, event.target.value);
    }
  }
}

export default RegistrationView;
