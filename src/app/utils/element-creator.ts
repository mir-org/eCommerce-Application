class ElementCreator {
  element: HTMLElement;

  constructor(tag: string, classNames: string | string[], textContent?: string) {
    this.element = document.createElement(tag);
    this.setElement(classNames, textContent);
  }

  setElement(classNames: string | string[], textContent?: string) {
    this.setCssClasses(classNames);
    if (textContent) this.setTextContent(textContent);
  }

  getElement(): HTMLElement {
    return this.element;
  }

  setCssClasses(cssClasses: string | string[]) {
    // не нравится, можно переделать?
    if (Array.isArray(cssClasses)) {
      this.element.classList.add(...cssClasses);
    } else {
      this.element.classList.add(cssClasses);
    }
  }

  setTextContent(text: string) {
    this.element.textContent = text;
  }

  addInnerElement(element: HTMLElement | ElementCreator) {
    if (element instanceof ElementCreator) {
      this.element.append(element.getElement());
    } else {
      this.element.append(element);
    }
  }
}

export { ElementCreator };
