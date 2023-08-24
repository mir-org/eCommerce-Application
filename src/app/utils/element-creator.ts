class ElementCreator {
  private element: HTMLElement;

  constructor(tag: string, classNames: string | string[], textContent?: string) {
    this.element = document.createElement(tag);
    this.setElement(classNames, textContent);
  }

  private setElement(classNames: string | string[], textContent?: string): void {
    this.setCssClasses(classNames);
    if (textContent) this.setTextContent(textContent);
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private setCssClasses(cssClasses: string | string[]): void {
    // не нравится, можно переделать?
    if (Array.isArray(cssClasses)) {
      this.element.classList.add(...cssClasses);
    } else {
      this.element.classList.add(cssClasses);
    }
  }

  private setTextContent(text: string): void {
    this.element.textContent = text;
  }

  public addInnerElement(element: HTMLElement | ElementCreator): void {
    if (element instanceof ElementCreator) {
      this.element.append(element.getElement());
    } else {
      this.element.append(element);
    }
  }
}

export { ElementCreator };
