import State from '../../../state/state';
import { ElementCreator } from '../../../utils/element-creator';
import InputFieldsCreator from '../../../utils/input-fields-creator';
import { View } from '../../view';

const CssClasses = {
  REGISTRATION: 'registration',
  TITLE: 'registration__title',
  EMAIL: 'email',
  PASSWORD: 'password',
};

const TEXT = {
  FIELD_TEXT_ONE: 'Ваш мейл',
  FIELD_TEXT_TWO: 'Ваш пароль',
  TITLE: 'ЭТО СТРАНИЦА РЕГИСТРАЦИИ',
};

const KEY_FOR_SAVE = {
  email: 'registration__email-input',
  password: 'registration__password-input',
};

class RegistrationView extends View {
  private state: State;

  constructor(state: State) {
    super('section', CssClasses.REGISTRATION);
    this.state = state;
    this.configView();
  }

  private configView(): void {
    const title = new ElementCreator('h1', CssClasses.TITLE, TEXT.TITLE);
    this.viewElementCreator.addInnerElement(title);
    const emailInput = new InputFieldsCreator(
      CssClasses.REGISTRATION,
      CssClasses.EMAIL,
      TEXT.FIELD_TEXT_ONE,
      this.state.getValue(KEY_FOR_SAVE.email),
      (event) => this.keyupHandler(event, KEY_FOR_SAVE.email)
    );
    this.viewElementCreator.addInnerElement(emailInput.getElement());
    const passwordInput = new InputFieldsCreator(
      CssClasses.REGISTRATION,
      CssClasses.PASSWORD,
      TEXT.FIELD_TEXT_TWO,
      this.state.getValue(KEY_FOR_SAVE.password),
      (event) => this.keyupHandler(event, KEY_FOR_SAVE.password)
    );
    this.viewElementCreator.addInnerElement(passwordInput.getElement());
  }

  private keyupHandler(event: KeyboardEvent, fieldName: string): void {
    if (event.target instanceof HTMLInputElement) {
      this.state.setValue(fieldName, event.target.value);
    }
  }
}

export default RegistrationView;
