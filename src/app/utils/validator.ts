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
}

export { Validator };
