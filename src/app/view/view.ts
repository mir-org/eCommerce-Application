import { ElementCreator } from '../utils/element-creator';

class View {
  viewElementCreator: ElementCreator;

  constructor(tag: string, classNames: string | string[], textContent?: string) {
    this.viewElementCreator = this.createWiew(tag, classNames, textContent);
  }

  createWiew(tag: string, classNames: string | string[], textContent?: string) {
    const elementCreator = new ElementCreator(tag, classNames, textContent);
    return elementCreator;
  }

  getHTMLElement(): HTMLElement {
    return this.viewElementCreator.getElement();
  }

  setContent(view: View) {
    const currentElement = this.viewElementCreator.getElement();
    const element = view.getHTMLElement();
    this.removeContent(currentElement);

    this.viewElementCreator.addInnerElement(element);
  }

  // добавить addContent

  removeContent(element: HTMLElement) {
    while (element.firstChild) {
      element.firstChild.remove();
    }
  }
}

export { View };
