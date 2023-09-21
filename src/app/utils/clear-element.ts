export function clearElement(myElement: HTMLElement | undefined): void {
  if (myElement) {
    while (myElement.firstChild) {
      myElement.removeChild(myElement.firstChild);
    }
  }
}
