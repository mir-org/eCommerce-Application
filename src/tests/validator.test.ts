import { Validator } from '../app/utils/validator';

// eslint-disable-next-line max-lines-per-function
describe('Validator', () => {
  describe('nameField', () => {
    it('should return an error message for an empty name', () => {
      const emptyName = '';
      const result = Validator.nameField(emptyName);
      expect(result).toBe('Name is empty.');
    });
    it('should return an error message for an invalid name', () => {
      const invalidName = 'Test123';
      const result = Validator.nameField(invalidName);
      expect(result).toBe('Name must contain only letters and spaces.');
    });
  });
  describe('emailField', () => {
    it('should return an error message for an empty confirm password', () => {
      const invalidEmail = '';
      const result = Validator.emailField(invalidEmail);
      expect(result).toBe('Email is empty.');
    });
  });
  // eslint-disable-next-line max-lines-per-function
  describe('passwordField', () => {
    it('should return an empty string for a valid password', () => {
      const validPassword = 'ValidPassword1';
      const result = Validator.passwordField(validPassword);
      expect(result).toBe('');
    });
    it('should return an error message for a password with less than 8 characters', () => {
      const invalidPassword = 'Short1';
      const result = Validator.passwordField(invalidPassword);
      expect(result).toContain('Password must be at least 8 characters long.');
    });
    it('should return an error message for a password without an uppercase letter', () => {
      const invalidPassword = 'lowercase1';
      const result = Validator.passwordField(invalidPassword);
      expect(result).toContain('Password must contain at least one uppercase letter (A-Z).');
    });
    it('should return an error message for a password without a lowercase letter', () => {
      const invalidPassword = 'UPPERCASE1';
      const result = Validator.passwordField(invalidPassword);
      expect(result).toContain('Password must contain at least one lowercase letter (a-z).');
    });
    it('should return an error message for a password without a digit', () => {
      const invalidPassword = 'NoDigits';
      const result = Validator.passwordField(invalidPassword);
      expect(result).toContain('Password must contain at least one digit (0-9).');
    });
    it('should return an error message for a password with leading whitespace', () => {
      const invalidPassword = ' LeadingWhitespace1';
      const result = Validator.passwordField(invalidPassword);
      expect(result).toContain('Password must not contain leading or trailing whitespace.');
    });
    it('should return an error message for a password with trailing whitespace', () => {
      const invalidPassword = 'TrailingWhitespace1 ';
      const result = Validator.passwordField(invalidPassword);
      expect(result).toContain('Password must not contain leading or trailing whitespace.');
    });
    it('should return multiple error messages for a password with multiple issues', () => {
      const invalidPassword = 'short';
      const result = Validator.passwordField(invalidPassword);
      expect(result).toContain('Password must be at least 8 characters long.');
      expect(result).toContain('Password must contain at least one uppercase letter (A-Z).');
      expect(result).toContain('Password must contain at least one digit (0-9).');
    });
  });

  describe('confirmPasswordField', () => {
    const validPassword = 'Qwerty123';
    it('should return an error message for an empty confirm password', () => {
      const invalidConfirmPassword = '';
      const result = Validator.confirmPasswordField(invalidConfirmPassword, validPassword);
      expect(result).toBe('Password is empty.');
    });
    it('should return an error message for a not matching confirm password', () => {
      const invalidConfirmPassword = 'qwerty123';
      const result = Validator.confirmPasswordField(invalidConfirmPassword, validPassword);
      expect(result).toBe('Passwords do not match.');
    });
  });
  describe('streetNameField', () => {
    it('should return an error message for an empty street name', () => {
      const invalidStreetName = '';
      const result = Validator.streetField(invalidStreetName);
      expect(result).toBe('Street is empty.');
    });
  });
  describe('cityField', () => {
    it('should return an error message for an empty city', () => {
      const emptyCity = '';
      const result = Validator.cityField(emptyCity);
      expect(result).toBe('City is empty.');
    });
    it('should return an error message for an invalid city', () => {
      const invalidCity = 'Test123';
      const result = Validator.cityField(invalidCity);
      expect(result).toBe('City must contain only letters and spaces.');
    });
  });
  describe('postalCodeField', () => {
    it('should return an empty string for a valid Russian postal code', () => {
      const validRussianPostalCode = '123456';
      const result = Validator.postalCodeField(validRussianPostalCode, 'RU');
      expect(result).toBe('');
    });
    it('should return an error message for an empty postal code', () => {
      const emptyPostalCode = '';
      const result = Validator.postalCodeField(emptyPostalCode, 'US');
      expect(result).toBe('Postal code is empty.');
    });
    it('should return an error message for an invalid US postal code', () => {
      const invalidUSPostalCode = '1234';
      const result = Validator.postalCodeField(invalidUSPostalCode, 'US');
      expect(result).toBe('Please enter a valid USA postal code in the format: 12345 or 12345-1234');
    });
    it('should return an error message for an invalid Russian postal code', () => {
      const invalidRussianPostalCode = '1234';
      const result = Validator.postalCodeField(invalidRussianPostalCode, 'RU');
      expect(result).toBe('Please enter a valid russian postal code in the format: 123456');
    });
  });
});
