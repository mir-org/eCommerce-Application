import State from '../../../state/state';
import { ElementCreator } from '../../../utils/element-creator';
import InputFieldsCreator from '../../../utils/input-fields-creator';
import { View } from '../../view';
import { SIGN_UP_CLASSES, SIGN_UP_TEXT, SIGN_UP_KEY } from '../../../enums/enums';

class RegistrationView extends View {
  state: State;

  form: HTMLFormElement | ElementCreator;

  constructor(state: State) {
    super('section', SIGN_UP_CLASSES.REGISTRATION);
    this.state = state;
    this.form = new ElementCreator('form', 'registration-form');
    this.configView();
  }

  // пофиксить длину функции, вынести типы в енум
  // eslint-disable-next-line max-lines-per-function
  configView(): void {
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
  }

  configInputFields(firstClass: string, secondClass: string, text: string, key: string, type: string) {
    const inputField = new InputFieldsCreator(firstClass, secondClass, text, this.state.getValue(key), (event) =>
      this.keyupHandler(event, key)
    );
    inputField.setType(type);
    this.form.addInnerElement(inputField.getElement());
  }

  keyupHandler(event: KeyboardEvent, fieldName: string) {
    if (event.target instanceof HTMLInputElement) {
      this.state.setValue(fieldName, event.target.value);
    }
  }
}

export default RegistrationView;
