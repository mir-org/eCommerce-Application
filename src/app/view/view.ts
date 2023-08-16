import { ElementCreator } from '../utils/element-creator';

class View {
  public viewElementCreator: ElementCreator;

  constructor(tag: string, classNames: string | string[], textContent?: string) {
    this.viewElementCreator = this.createView(tag, classNames, textContent);
  }

  private createView(tag: string, classNames: string | string[], textContent?: string): ElementCreator {
    const elementCreator = new ElementCreator(tag, classNames, textContent);
    return elementCreator;
  }

  public getHTMLElement(): HTMLElement {
    return this.viewElementCreator.getElement();
  }

  public setContent(view: View): void {
    const currentElement = this.viewElementCreator.getElement();
    const element = view.getHTMLElement();
    this.removeContent(currentElement);

    this.viewElementCreator.addInnerElement(element);
  }

  // добавить addContent

  private removeContent(element: HTMLElement): void {
    while (element.firstChild) {
      element.firstChild.remove();
    }
  }
}

export { View };
