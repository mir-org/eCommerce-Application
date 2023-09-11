import { createPopupWithText } from '../app/utils/create-popup-with-text';

describe('createPopupWithText', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });
  test('should create a div element, with a div element and a button inside', () => {
    createPopupWithText('Hello World');
    const popupElement = document.body.querySelector('.popup-with-text');
    const popupText = popupElement?.querySelector('.popup-text-block');
    const popupButton = popupElement?.querySelector('.primary-button');
    expect(popupElement).not.toBeNull();
    expect(popupText).not.toBeNull();
    expect(popupButton).not.toBeNull();
    expect(popupElement).toBeInstanceOf(HTMLDivElement);
    expect(popupText).toBeInstanceOf(HTMLDivElement);
    expect(popupButton).toBeInstanceOf(HTMLButtonElement);
    expect(popupElement?.classList.contains('popup-with-text')).toBe(true);
    expect(popupText?.classList.contains('popup-text-block')).toBe(true);
    expect(popupButton?.classList.contains('primary-button')).toBe(true);
    expect(popupText?.textContent).toBe('Hello World');
    expect(popupButton?.textContent).toBe('Close');
  });
  test('should close a div element when clicking a button', () => {
    createPopupWithText('Hello World');
    const popupElement = document.body.querySelector('.popup-with-text');
    const closeButton = popupElement?.querySelector('.primary-button');
    expect(popupElement).not.toBeNull();
    closeButton?.dispatchEvent(new Event('click'));
    const popupElementAfterClosing = document.body.querySelector('.popup-with-text');
    expect(popupElementAfterClosing).toBeNull();
  });
  test('should close a div element after 2 seconds', () => {
    jest.useFakeTimers();
    createPopupWithText('Hello World');
    const popupElement = document.body.querySelector('.popup-with-text');
    expect(popupElement).not.toBeNull();
    jest.advanceTimersByTime(2000);
    const popupElementAfterClosing = document.body.querySelector('.popup-with-text');
    expect(popupElementAfterClosing).toBeNull();
  });
});
