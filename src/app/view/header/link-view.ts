import { View } from '../view';

const CssClasses = {
  ITEM: 'nav-item',
  ITEM_SELECTED: 'nav-item__selected',
};

class LinkView extends View {
  private linkElements: Map<string, LinkView>;

  private pageCallback: () => void;

  constructor(text: string, pageCallback: () => void, linkElements: Map<string, LinkView>) {
    super('a', CssClasses.ITEM, text);
    this.linkElements = linkElements;
    this.pageCallback = pageCallback;
    this.configView();
  }

  // TODO дробануть
  public setSelectedStatus(): void {
    this.linkElements.forEach((link) => link.setNotSelectedStatus());

    const element = this.viewElementCreator.getElement();
    element.classList.add(CssClasses.ITEM_SELECTED);
    this.pageCallback();
  }

  private setNotSelectedStatus(): void {
    const element = this.viewElementCreator.getElement();
    element.classList.remove(CssClasses.ITEM_SELECTED);
  }

  private configView(): void {
    const element = this.viewElementCreator.getElement();
    element.addEventListener('click', this.setSelectedStatus.bind(this));
  }
}

export default LinkView;
