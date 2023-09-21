import AboutView from '../app/view/main/about-us/about-us-view';

describe('AboutView', () => {
  let aboutView: AboutView;
  beforeEach(() => {
    aboutView = new AboutView();
  });
  it('should create a AboutView instance', () => {
    expect(aboutView).toBeInstanceOf(AboutView);
  });
});
