import InputFieldsCreator from '../app/utils/input-fields-creator';

describe('InputFieldsCreator', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });
  test('should create div with label and input', () => {
    const instance = new InputFieldsCreator(
      'class-name',
      'subclass-name',
      'label',
      'input-value',
      'text',
      'placeholder'
    );
    document.body.appendChild(instance.getElement());
    const wrapper = document.body.querySelector('div');
    const label = document.body.querySelector('label');
    const input = document.body.querySelector('input');
    const errorLine = document.body.querySelector('.primary-error-line');
    // TODO FINISH THOSE TESTS
    expect(wrapper).not.toBeNull();
    expect(wrapper?.classList.contains('class-name__subclass-name-input-wrapper')).toBe(true);
    expect(wrapper?.classList.contains('primary-wrapper')).toBe(true);
    expect(label).not.toBeNull();
    expect(input).not.toBeNull();
    expect(input?.value)?.toBe('input-value');
    expect(errorLine).not.toBeNull();
  });
});
