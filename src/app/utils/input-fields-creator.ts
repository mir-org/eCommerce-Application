import { ElementCreator } from './element-creator';

const CssClasses = {
  wrapper: 'primary-wrapper',
  input: 'primary-input',
  label: 'primary-label',
};

class InputFieldsCreator {
  private element: HTMLElement;

  private inputElement: HTMLInputElement;

  private labelElement: HTMLLabelElement;

  constructor(
    classNames: string,
    subClassNames: string,
    labelTextContent: string,
    inputValue: string,
    type: string = 'text',
    placeholder: string = ''
  ) {
    this.element = document.createElement('div');
    this.inputElement = document.createElement('input');
    this.labelElement = document.createElement('label');
    this.setElement(classNames, subClassNames, labelTextContent, type);
    this.setValue(inputValue);
    this.setPlaceholder(placeholder);
  }

  public setElement(classNames: string, subClassNames: string, labelTextContent: string, type: string): void {
    this.setLabelTextContent(labelTextContent);
    this.setCssClasses(classNames, subClassNames);
    this.labelElement.prepend(this.inputElement);
    this.element.append(this.labelElement);
    this.setType(type);
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public setValue(inputValue: string): void {
    this.inputElement.value = inputValue;
  }

  public getInputElement(): HTMLInputElement {
    return this.inputElement;
  }

  public setCssClasses(classNames: string, subClassNames: string): void {
    this.element.classList.add(`${classNames}__${subClassNames}-input-wrapper`, CssClasses.wrapper);
    this.inputElement.classList.add(`${classNames}__${subClassNames}-input`, CssClasses.input);
    this.labelElement.classList.add(`${classNames}__${subClassNames}-label`, CssClasses.label);
  }

  public setLabelTextContent(text: string): void {
    if (this.labelElement) this.labelElement.textContent = text;
  }

  private setPlaceholder(placeholder: string): void {
    this.inputElement.setAttribute('placeholder', placeholder);
  }

  public setType(type: string): void {
    this.inputElement.setAttribute('type', type);
  }

  public addInnerElement(element: HTMLElement | ElementCreator): void {
    if (element instanceof ElementCreator) {
      this.element.append(element.getElement());
    } else {
      this.element.append(element);
    }
  }
}

export default InputFieldsCreator;
