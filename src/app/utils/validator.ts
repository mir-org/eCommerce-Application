class Validator {
  public static nameField(name: string): string {
    let error = '';
    const nameRegex = /^[a-zA-Z-\s]+$/;
    if (!name) {
      error = 'Name is empty.';
    } else if (!nameRegex.test(name)) {
      error = 'Name must contain only letters and spaces.';
    }
    return error;
  }

  public static emailField(email: string): string {
    let error = '';
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!email) {
      error = 'Email is empty.';
    } else if (!emailRegex.test(email)) {
      error = 'Please enter a valid email address in the format: name@example.com';
    }
    return error;
  }

  public static passwordField(password: string): string {
    let error = '';
    if (password.length < 8) {
      error += 'Password must be at least 8 characters long.\n';
    }
    if (!/[A-Z]/.test(password)) {
      error += 'Password must contain at least one uppercase letter (A-Z).\n';
    }
    if (!/[a-z]/.test(password)) {
      error += 'Password must contain at least one lowercase letter (a-z).\n';
    }
    if (!/\d/.test(password)) {
      error += 'Password must contain at least one digit (0-9).\n';
    }
    if (/\s/.test(password)) {
      error += 'Password must not contain leading or trailing whitespace.\n';
    }
    return error;
  }

  public static confirmPasswordField(confirmPassword: string, password: string): string {
    let error = '';
    if (!confirmPassword) {
      error = 'Password is empty.';
    } else if (confirmPassword !== password) {
      error = 'Passwords do not match.';
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
    if (!street.trim()) {
      error = 'Street is empty.';
    }
    return error;
  }

  public static cityField(city: string): string {
    const cityRegex = /^[a-zA-Z-\s]+$/;
    let error = '';
    if (!city) {
      error = 'City is empty.';
    } else if (!cityRegex.test(city)) {
      error = 'City must contain only letters and spaces.';
    }
    return error;
  }

  public static postalCodeField(postalCode: string, selectedCountry: string): string {
    // console.log(selectedCountry);
    const usaPostalCodeRegex = /^\d{5}(-\d{4})?$/;
    const russiaPostalCodeRegex = /^[0-9]{6}$/;
    let error = '';
    if (!postalCode) {
      error = 'Postal code is empty.';
    } else {
      const countrySpecificRegex = selectedCountry === 'US' ? usaPostalCodeRegex : russiaPostalCodeRegex;
      if (!countrySpecificRegex.test(postalCode)) {
        error =
          selectedCountry === 'US'
            ? 'Please enter a valid USA postal code in the format: 12345 or 12345-1234'
            : 'Please enter a valid russian postal code in the format: 123456';
      }
    }
    return error;
  }
}

export { Validator };
