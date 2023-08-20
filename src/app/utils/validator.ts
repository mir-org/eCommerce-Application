class Validator {
  public static nameField(name: string): string[] {
    const errors: string[] = [];
    const nameRegex = /^[a-zA-Z]+$/;
    if (!name) {
      errors.push('Name не может быть пустым.');
    }
    if (!nameRegex.test(name)) {
      errors.push('Введите корректный Name.');
    }
    return errors;
  }

  public static emailField(email: string): string[] {
    const errors: string[] = [];
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!email) {
      errors.push('Email не может быть пустым.');
    }
    if (!emailRegex.test(email)) {
      errors.push('Введите корректный email.');
    }
    return errors;
  }

  public static passwordField(password: string): string[] {
    const errors: string[] = [];
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (!password) {
      errors.push('Password не может быть пустым.');
    }
    if (!passwordRegex.test(password)) {
      errors.push('Password не очень');
    }
    return errors;
  }
}

export { Validator };
