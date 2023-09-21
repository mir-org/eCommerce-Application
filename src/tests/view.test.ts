import { View } from '../app/view/view';

describe('View', () => {
  let view: View;
  beforeEach(() => {
    view = new View('div', 'class-name', 'Text');
  });
  it('should create an instance of WrapperView', () => {
    expect(view).toBeInstanceOf(View);
  });
  it('should setContent with another View', () => {
    const newView = new View('p', 'new-class-name', 'New Text');
    view.setContent(newView);
    const element = view.getHTMLElement();
    expect(element.querySelector('p.new-class-name')).toBeTruthy();
    expect(element.textContent).toBe('New Text');
  });
});
