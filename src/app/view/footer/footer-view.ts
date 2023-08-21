import { ElementCreator } from '../../utils/element-creator';
import { View } from '../view';

class FooterView extends View {
  constructor() {
    super('footer', 'footer');
    this.configView();
  }

  private configView(): void {
    const footerRssLink = new ElementCreator('a', 'footer__link', '');
    footerRssLink.getElement().setAttribute('href', 'https://rs.school/js/');
    footerRssLink.getElement().setAttribute('target', '_blank');
    footerRssLink.getElement().setAttribute('rel', 'noopener noreferrer');
    this.viewElementCreator.addInnerElement(footerRssLink);
    const rssImage = new ElementCreator('img', 'footer__link-image', '');
    rssImage.getElement().setAttribute('src', '../../../../assets/images/rs_school_js.svg');
    footerRssLink.addInnerElement(rssImage);
    const teamText = new ElementCreator('div', 'footer__text-team', 'Developed by New World Disorder');
    this.viewElementCreator.addInnerElement(teamText);
    const yearText = new ElementCreator('div', 'footer__text-year', '2023');
    this.viewElementCreator.addInnerElement(yearText);
  }
}

export default FooterView;
