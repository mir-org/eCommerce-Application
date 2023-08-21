import { View } from '../../view';
import { ElementCreator } from '../../../utils/element-creator';
import { Pages } from '../../../router/pages';
import { Router } from '../../../router/router';

class NotFoundView extends View {
  constructor(private router: Router) {
    super('section', 'not-found');
    this.configView();
  }

  private configView(): void {
    this.addImageBlock();
    this.addTextBlock();
  }

  private addImageBlock(): void {
    const imageBlock = new ElementCreator('div', 'not-found__image-block', '');
    this.viewElementCreator.addInnerElement(imageBlock);
    const image = new ElementCreator('img', 'not-found__image-block-img', '');
    image.getElement().setAttribute('src', '../../../../assets/images/error-404.png');
    imageBlock.addInnerElement(image);
  }

  private addTextBlock(): void {
    const textBlock = new ElementCreator('div', 'not-found__text', '');
    this.viewElementCreator.addInnerElement(textBlock);
    const header = new ElementCreator('h1', 'not-found__text__head', 'Error 404');
    textBlock.addInnerElement(header);
    const textL = new ElementCreator('div', 'not-found__text-l', 'Page Not Found');
    textBlock.addInnerElement(textL);
    const textM = new ElementCreator('div', 'not-found__text-m', 'We broke something!');
    textBlock.addInnerElement(textM);
    const textS = new ElementCreator('div', 'not-found__text-s', 'Or you did...');
    textBlock.addInnerElement(textS);
    const registrationLinkCreator = new ElementCreator('a', 'not-found__text-link', 'Back to main');
    const registrationLinkElement = registrationLinkCreator.getElement();
    registrationLinkElement.addEventListener('click', (e) => this.registrationLinkClickFn.call(this, e));
    textBlock.addInnerElement(registrationLinkElement);
  }

  private registrationLinkClickFn(event: Event): void {
    event.preventDefault();
    this.router.navigate(Pages.INDEX);
  }
}

export default NotFoundView;
