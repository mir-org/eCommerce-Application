import FooterView from '../app/view/footer/footer-view';

describe('FooterView', () => {
  let footerView: FooterView;
  beforeEach(() => {
    footerView = new FooterView();
  });
  it('should create a NotFoundView instance', () => {
    expect(footerView).toBeInstanceOf(FooterView);
  });
});
