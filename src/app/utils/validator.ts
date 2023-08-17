class Validator {
  public static emailField(email: string): string | boolean {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!email) {
      console.log('Email не может быть пустым.');
      return false;
    }
    if (!emailRegex.test(email)) {
      console.log('Введите корректный email.');
      return false;
    }
    return true;
  }

  public static passwordField(password: string): string | boolean {
    if (password.length < 8) {
      console.log('Пароль должен содержать как минимум 8 символов.');
      return false;
    }
    console.log('Четкий пароль');
    return true;
  }
}

export { Validator };
