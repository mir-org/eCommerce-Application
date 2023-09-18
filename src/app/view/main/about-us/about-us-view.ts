import { ElementCreator } from '../../../utils/element-creator';
import { View } from '../../view';
import { ABOUT_US_CLASSES, DEVELOPERS_DATA, DeveloperData, TEXT } from './about-us-view-types';

class AboutView extends View {
  constructor() {
    super('section', ABOUT_US_CLASSES.ABOUT);
    this.configureView();
  }

  private configureView(): void {
    this.addCollabContribBlock();
    this.addDevelopersBlock();
    this.addGratitudeBlock();
  }

  private addCollabContribBlock(): void {
    const blockCreator = new ElementCreator('div', ABOUT_US_CLASSES.TEXT_BLOCK);
    const titleCreator = new ElementCreator('h2', ABOUT_US_CLASSES.TEXT_BLOCK_TITLE, TEXT.COLLAB_CONTRIB_BLOCK_TITLE);
    const textContentCreator = new ElementCreator(
      'div',
      ABOUT_US_CLASSES.TEXT_BLOCK_TEXT,
      TEXT.COLLAB_CONTRIB_BLOCK_TEXT
    );
    blockCreator.addInnerElement(titleCreator);
    blockCreator.addInnerElement(textContentCreator);
    this.viewElementCreator.addInnerElement(blockCreator);
  }

  private addGratitudeBlock(): void {
    const blockCreator = new ElementCreator('div', ABOUT_US_CLASSES.TEXT_BLOCK);
    const titleCreator = new ElementCreator('h2', ABOUT_US_CLASSES.TEXT_BLOCK_TITLE);
    const titleTextCreator = new ElementCreator('span', ABOUT_US_CLASSES.TITLE_TEXT, TEXT.GRATITUDE_BLOCK_TITLE);
    titleCreator.addInnerElement(titleTextCreator);
    const titleLinkCreator = new ElementCreator('a', ABOUT_US_CLASSES.TITLE_LINK);
    titleLinkCreator.getElement().setAttribute('href', 'https://rs.school/js/');
    const rssImage = new ElementCreator('img', 'mkl');
    rssImage.getElement().setAttribute('src', './assets/images/rs_school_js.svg');
    titleLinkCreator.addInnerElement(rssImage);
    titleCreator.addInnerElement(titleLinkCreator);
    const textContentCreator = new ElementCreator('div', ABOUT_US_CLASSES.TEXT_BLOCK_TEXT, TEXT.GRATITUDE_BLOCK_TEXT);
    blockCreator.addInnerElement(titleCreator);
    blockCreator.addInnerElement(textContentCreator);
    this.viewElementCreator.addInnerElement(blockCreator);
  }

  private addDevelopersBlock(): void {
    const developersBlockCreator = new ElementCreator('div', ABOUT_US_CLASSES.DEVELOPERS_BLOCK);
    const titleTextCreator = new ElementCreator('h2', ABOUT_US_CLASSES.TEXT_BLOCK_TITLE, TEXT.DEVELOPERS_TEAM_TITLE);
    const developersContentCreator = new ElementCreator('div', ABOUT_US_CLASSES.DEVELOPERS_CONTENT);
    developersBlockCreator.addInnerElement(titleTextCreator);
    developersBlockCreator.addInnerElement(developersContentCreator);

    DEVELOPERS_DATA.forEach((developerData) => {
      const devBlockCreator = new ElementCreator('div', ABOUT_US_CLASSES.DEVELOPER_BLOCK);

      const devBlockTopCreator = this.getDevBlockTopCreator({
        imgLink: developerData.IMG_LINK,
        firstName: developerData.FIRST_NAME,
        position: developerData.POSITION,
      });

      const devBlockBottomCreator = this.getDevBlockBottomCreator({
        biography: developerData.SHORT_BIO,
        contribution: developerData.DISTINCTIVE_CONTRIBUTION,
        gitHubLink: developerData.GITHUB_LINK,
      });

      devBlockCreator.addInnerElement(devBlockTopCreator);
      devBlockCreator.addInnerElement(devBlockBottomCreator);
      developersContentCreator.addInnerElement(devBlockCreator);
    });
    this.viewElementCreator.addInnerElement(developersBlockCreator);
  }

  private getDevBlockTopCreator(developerData: DeveloperData): ElementCreator {
    const devBlockTopCreator = new ElementCreator('div', ABOUT_US_CLASSES.DEVELOPER_BLOCK_TOP_LINE);
    const devPhotoWrapperCreator = new ElementCreator('div', ABOUT_US_CLASSES.DEVELOPER_PHOTO_WRAPPER);
    const devPhotoCreator = new ElementCreator('img', ABOUT_US_CLASSES.DEVELOPER_PHOTO);
    devPhotoCreator.getElement().setAttribute('src', `${developerData.imgLink}`);
    devPhotoWrapperCreator.addInnerElement(devPhotoCreator);
    devBlockTopCreator.addInnerElement(devPhotoWrapperCreator);
    const devNamePosCreator = new ElementCreator('div', ABOUT_US_CLASSES.DEVELOPER_NAME_POS_WRAPPER);
    const devNameCreator = new ElementCreator('div', ABOUT_US_CLASSES.DEVELOPER_NAME, `${developerData.firstName}`);
    const devPositionCreator = new ElementCreator(
      'div',
      ABOUT_US_CLASSES.DEVELOPER_POSITION,
      `${developerData.position}`
    );
    devNamePosCreator.addInnerElement(devNameCreator);
    devNamePosCreator.addInnerElement(devPositionCreator);
    devBlockTopCreator.addInnerElement(devNamePosCreator);
    return devBlockTopCreator;
  }

  private getDevBlockBottomCreator(developerData: DeveloperData): ElementCreator {
    const devBlockBottomCreator = new ElementCreator('div', ABOUT_US_CLASSES.DEVELOPER_BLOCK_BOTTOM_LINE);
    const devBioTextCreator = new ElementCreator('div', ABOUT_US_CLASSES.DEVELOPER_BIO_TEXT, developerData.biography);
    const devContribGHLinkCreator = new ElementCreator('div', ABOUT_US_CLASSES.DEVELOPER_CONTRIB_GH_LINK_WRAPPER);
    const devContribBlockCreator = new ElementCreator('div', ABOUT_US_CLASSES.DEVELOPER_CONTRIB_BLOCK);
    const devContribTitleCreator = new ElementCreator(
      'div',
      ABOUT_US_CLASSES.DEVELOPER_CONTRIB_TITLE,
      TEXT.DEVELOPER_INFO_DISTINCTIVE_CONTRIBUTION_TITLE
    );
    const devContribTextCreator = new ElementCreator(
      'div',
      ABOUT_US_CLASSES.DEVELOPER_CONTRIB_TEXT,
      developerData.contribution
    );
    devContribBlockCreator.addInnerElement(devContribTitleCreator);
    devContribBlockCreator.addInnerElement(devContribTextCreator);
    const devGHLinkCreator = new ElementCreator('a', ABOUT_US_CLASSES.DEVELOPER_GITHUB_LINK);
    devGHLinkCreator.getElement().setAttribute('href', `${developerData.gitHubLink}`);
    devGHLinkCreator.getElement().setAttribute('target', '_blanc');
    const devGHImgCreator = new ElementCreator('img', ABOUT_US_CLASSES.DEVELOPER_GITHUB_LOGO);
    devGHImgCreator.getElement().setAttribute('src', './assets/images/github-logo.svg');
    devGHLinkCreator.addInnerElement(devGHImgCreator);
    devContribGHLinkCreator.addInnerElement(devContribBlockCreator);
    devContribGHLinkCreator.addInnerElement(devGHLinkCreator);
    devBlockBottomCreator.addInnerElement(devBioTextCreator);
    devBlockBottomCreator.addInnerElement(devContribGHLinkCreator);
    return devBlockBottomCreator;
  }
}

export default AboutView;
