import { ElementCreator } from './element-creator';

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

  private setElement(classNames: string, subClassNames: string, labelTextContent: string, type: string): void {
    this.setLabelTextContent(labelTextContent);
    this.setCssClasses(classNames, subClassNames);
    this.labelElement.prepend(this.inputElement);
    this.element.append(this.labelElement);
    this.setType(type);
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private setValue(inputValue: string): void {
    this.inputElement.value = inputValue;
  }

  private setCssClasses(classNames: string, subClassNames: string): void {
    this.element.classList.add(`${classNames}__${subClassNames}-input-wrapper`);
    this.inputElement.classList.add(`${classNames}__${subClassNames}-input`);
    this.labelElement.classList.add(`${classNames}__${subClassNames}-label`);
  }

  private setLabelTextContent(text: string): void {
    if (this.labelElement) this.labelElement.textContent = text;
  }

  private setType(type: string): void {
    this.inputElement.setAttribute('type', type);
  }

  private setPlaceholder(placeholder: string): void {
    this.inputElement.setAttribute('placeholder', placeholder);
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
