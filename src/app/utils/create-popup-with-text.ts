import { ElementCreator } from './element-creator';

export function createPopupWithText(message: string): void {
  const popup = new ElementCreator('div', 'popup-with-text', message);
  const closeButton = new ElementCreator('button', 'primary-button', 'Close');
  closeButton.getElement().addEventListener('click', () => {
    document.body.removeChild(popup.getElement());
  });
  popup.addInnerElement(closeButton);
  document.body.appendChild(popup.getElement());
  const popupTimeout = setTimeout(() => {
    document.body.removeChild(popup.getElement());
  }, 2000);
  closeButton.getElement().addEventListener('click', () => {
    clearTimeout(popupTimeout);
  });
}
