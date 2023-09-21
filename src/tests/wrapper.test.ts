import WrapperView from '../app/view/wrapper';

describe('WrapperView', () => {
  let wrapperView: WrapperView;
  beforeEach(() => {
    wrapperView = new WrapperView();
  });
  it('should create an instance of WrapperView', () => {
    expect(wrapperView).toBeInstanceOf(WrapperView);
  });
  it('should create a <div> element with the correct CSS class', () => {
    const element = wrapperView.getHTMLElement();
    expect(element).toBeInstanceOf(HTMLDivElement);
    expect(element.classList.contains('wrapper')).toBe(true);
  });
  it('should have the correct element tag name', () => {
    const element = wrapperView.getHTMLElement();
    expect(element.tagName.toLowerCase()).toBe('div');
  });
});
