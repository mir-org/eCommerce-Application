import { clearElement } from '../app/utils/clear-element';

const createMockElement = (): HTMLDivElement => {
  const element = document.createElement('div');
  element.appendChild(document.createElement('span'));
  element.appendChild(document.createElement('p'));
  return element;
};

describe('clearElement', () => {
  it('should clear child elements of an HTML element', () => {
    const myElement = createMockElement();
    clearElement(myElement);
    expect(myElement.childNodes.length).toBe(0);
  });
});
