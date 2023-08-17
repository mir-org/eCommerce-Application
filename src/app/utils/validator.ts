class Validator {
  static emailField(email: string): string | boolean {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!email) {
      return 'Email не может быть пустым.';
    }
    if (!emailRegex.test(email)) {
      return 'Введите корректный email.';
    }
    return true;
  }

  static passwordField(password: string): string | boolean {
    if (password.length < 8) {
      return 'Пароль должен содержать как минимум 8 символов.';
    }
    return true;
  }
}

export { Validator };
