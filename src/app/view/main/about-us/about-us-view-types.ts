export const ABOUT_US_CLASSES = {
  ABOUT: 'about-us',
  TEXT_BLOCK: 'about-us__text-block',
  TEXT_BLOCK_TITLE: 'about-us__text-block-title',
  TEXT_BLOCK_TEXT: 'about-us__text-block-text',
  TITLE_LINK: 'about-us__title-link',
  TITLE_TEXT: 'about-us__title-text',
  DEVELOPERS_BLOCK: 'devs-block',
  DEVELOPERS_CONTENT: 'devs-block__content',
  DEVELOPER_BLOCK: 'dev-block',
  DEVELOPER_BLOCK_TOP_LINE: 'dev-block__top-line',
  DEVELOPER_PHOTO_WRAPPER: 'dev-block__photo-wrapper',
  DEVELOPER_PHOTO: 'dev-block__photo',
  DEVELOPER_NAME_POS_WRAPPER: 'dev-block__name-pos-wrap',
  DEVELOPER_BLOCK_BOTTOM_LINE: 'dev-block__bottom-line',
  DEVELOPER_NAME: 'dev-block__dev-name',
  DEVELOPER_POSITION: 'dev-block__dev-position',
  DEVELOPER_BIO_BLOCK: 'dev-block__bio-block',
  DEVELOPER_BIO_TEXT: 'dev-block__bio-text',
  DEVELOPER_CONTRIB_GH_LINK_WRAPPER: 'dev-block__contrib-gh-link-wrap',
  DEVELOPER_CONTRIB_BLOCK: 'dev-block__contrib-block',
  DEVELOPER_CONTRIB_TITLE: 'dev-block__contrib-title',
  DEVELOPER_CONTRIB_TEXT: 'dev-block__contrib-text',
  DEVELOPER_GITHUB_LINK: 'dev-block__gh-link',
  DEVELOPER_GITHUB_LOGO: 'dev-block__gh-logo',
};

export const ABOUT_US_TEXT = {
  ABOUT: 'About Us',
};

export const TEXT = {
  COLLAB_CONTRIB_BLOCK_TITLE: 'Collaboration and contribution',
  COLLAB_CONTRIB_BLOCK_TEXT:
    "Our team's interaction was based on daily communication in the Discord channel, including voice communication, which allowed us to promptly resolve any issues that arose. The use of Trello board and regular communication allowed us to effectively distribute the sprint tasks equally among the participants, and daily progress reports allowed us to clearly track the sprint process.",
  GRATITUDE_BLOCK_TITLE: 'Gratitude to',
  GRATITUDE_BLOCK_TEXT:
    'Special thanks to RSSchool and its creators for the wonderful opportunity to learn and change your life for free.',
  DEVELOPERS_TEAM_TITLE: 'Development team',
  DEVELOPER_INFO_SHORT_BIO_TITLE: 'Biography',
  DEVELOPER_INFO_DISTINCTIVE_CONTRIBUTION_TITLE: 'Distinctive contribution',
};

export const DEVELOPERS_DATA = [
  {
    IMG_LINK: './assets/images/ilya-photo.jpg',
    FIRST_NAME: 'Ilya',
    POSITION: 'Frontend developer',
    SHORT_BIO:
      "Worked in logistics for almost 2 years. Then I decided to change my life. That's how I came to RSSchool, and this is my second attempt to take this course.",
    DISTINCTIVE_CONTRIBUTION: 'CommerceTools administration',
    GITHUB_LINK: 'https://github.com/toronto-tokyo',
  },
  {
    IMG_LINK: './assets/images/vlad-photo.jpg',
    FIRST_NAME: 'Vladislav',
    POSITION: 'Team lead',
    SHORT_BIO:
      'I live by the principle: "If they give you, take it, if they don\'t give you, take it." And I\'m a genius at it!',
    DISTINCTIVE_CONTRIBUTION: 'Application architecture',
    GITHUB_LINK: 'https://github.com/GinezisNWD',
  },
  {
    IMG_LINK: './assets/images/mira-photo.jpg',
    FIRST_NAME: 'Miroslav',
    POSITION: 'Frontend developer',
    SHORT_BIO:
      "I have been working as an IT Support Technician for a few years. Right now I'm studying frontend development to challenge myself and potentially open a new career path.",
    DISTINCTIVE_CONTRIBUTION: 'Jest testing',
    GITHUB_LINK: 'https://github.com/miroslav-zarenkov',
  },
];

export type DeveloperData = {
  imgLink?: string;
  firstName?: string;
  position?: string;
  biography?: string;
  contribution?: string;
  gitHubLink?: string;
};
