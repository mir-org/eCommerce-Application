import { ElementCreator } from './element-creator';

class InputFieldsCreator {
  element: HTMLElement;

  inputElement: HTMLInputElement;

  labelElement: HTMLLabelElement;

  constructor(
    classNames: string,
    subClassNames: string,
    labelTextContent: string,
    inputValue: string,
    callback: (event: KeyboardEvent) => void,
    type: string = 'text'
  ) {
    this.element = document.createElement('div');
    this.inputElement = document.createElement('input');
    this.labelElement = document.createElement('label');
    this.setElement(classNames, subClassNames, labelTextContent, type);
    this.setCallback(callback);
    this.setValue(inputValue);
  }

  setElement(classNames: string, subClassNames: string, labelTextContent: string, type: string) {
    this.setLabelTextContent(labelTextContent);
    this.setCssClasses(classNames, subClassNames);
    this.labelElement.prepend(this.inputElement);
    this.element.append(this.labelElement);
    this.setType(type);
  }

  getElement(): HTMLElement {
    return this.element;
  }

  setValue(inputValue: string) {
    this.inputElement.value = inputValue;
  }

  setCssClasses(classNames: string, subClassNames: string) {
    this.element.classList.add(`${classNames}__${subClassNames}-input-wrapper`);
    this.inputElement.classList.add(`${classNames}__${subClassNames}-input`);
    this.labelElement.classList.add(`${classNames}__${subClassNames}-label`);
  }

  setLabelTextContent(text: string) {
    if (this.labelElement) this.labelElement.textContent = text;
  }

  setCallback(callback: (event: KeyboardEvent) => void) {
    this.inputElement.addEventListener('keyup', (event) => callback(event));
  }

  setType(type: string) {
    this.inputElement.setAttribute('type', type);
  }

  addInnerElement(element: HTMLElement | ElementCreator) {
    if (element instanceof ElementCreator) {
      this.element.append(element.getElement());
    } else {
      this.element.append(element);
    }
  }
}

export default InputFieldsCreator;
