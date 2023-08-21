class Validator {
  public static nameField(name: string): string {
    let error = '';
    const nameRegex = /^[a-zA-Z]+$/;
    if (!name) {
      error = 'Name is empty.';
    }
    if (!nameRegex.test(name)) {
      error = 'Wrong format of Name.';
    }
    return error;
  }

  public static emailField(email: string): string {
    let error = '';
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!email) {
      error = 'Email is empty.';
    } else if (!emailRegex.test(email)) {
      error = 'Wrong format of email.';
    }
    return error;
  }

  public static passwordField(password: string): string {
    let error = '';
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (!password) {
      error = 'Password is empty.';
    } else if (!passwordRegex.test(password)) {
      error =
        'Password must be at least 8 characters long; must contain at least one uppercase letter (A-Z),  at least one lowercase letter (a-z), at least one digit (0-9), must not contain leading or trailing whitespace ';
    }
    return error;
  }
  
  public static confirmPasswordField(confirmPassword: string, password: string): string {
    let error = '';
    if (!confirmPassword) {
      error = 'Password is empty.';
    } else if (confirmPassword !== password) {
      error = 'Passwords do not match';
    }
    return error;
  }

  public static birthField(dateOfBirth: string): string {
    let error = '';
    const MIN_AGE = 13;
    if (!dateOfBirth) {
      error = 'Date of birth is empty.';
    } else {
      const birthDate = new Date(dateOfBirth);
      const currentDate = new Date();
      let age = currentDate.getFullYear() - birthDate.getFullYear();

      if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
      ) {
        age -= 1;
      }

      if (age < MIN_AGE) {
        error = `You must be at least ${MIN_AGE} years old.`;
      }
    }

    return error;
  }

  public static streetField(street: string): string {
    let error = '';
    if (!street) {
      error = 'Street is empty.';
    }
    return error;
  }

  public static cityField(city: string): string {
    const cityRegex = /^[a-zA-Z\s]+$/;
    let error = '';
    if (!city) {
      error = 'City is empty.';
    } else if (!cityRegex.test(city)) {
      error = 'City must contain only letters and spaces.';
    }
    return error;
  }

  public static postalCodeField(postalCode: string, selectedCountry: string): string {
    const usaPostalCodeRegex = /^\d{5}(-\d{4})?$/;
    const russiaPostalCodeRegex = /^[0-9]{6}$/;
    let error = '';
    if (!postalCode) {
      error = 'Postal code is empty.';
    } else {
      const countrySpecificRegex = selectedCountry === 'US' ? usaPostalCodeRegex : russiaPostalCodeRegex;
      if (!countrySpecificRegex.test(postalCode)) {
        error = selectedCountry === 'US' ? 'Invalid USA postal code format.' : 'Invalid Russian postal code format.';
      }
    }
    return error;
  }
}

export { Validator };
