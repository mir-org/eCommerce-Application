const KEY_FOR_SAVE = 'spaApp';

class State {
  private fields: Map<string, string>;

  constructor() {
    this.fields = this.loadState();

    window.addEventListener('beforeunload', this.saveState.bind(this));
  }

  public setValue(name: string, value: string): void {
    this.fields.set(name, value);
  }

  public getValue(name: string): string {
    const value = this.fields.get(name);
    if (value) return value;
    return '';
  }

  private saveState(): void {
    const fields = Object.fromEntries(this.fields.entries());
    localStorage.setItem(KEY_FOR_SAVE, JSON.stringify(fields));
  }

  private loadState(): Map<string, string> {
    const fields = localStorage.getItem(KEY_FOR_SAVE);
    if (fields) {
      const fieldsArr = JSON.parse(fields);
      return new Map(Object.entries(fieldsArr));
    }
    return new Map();
  }
}

export default State;
