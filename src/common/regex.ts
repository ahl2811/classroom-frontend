interface IRegex {
  value: RegExp;
  message: string;
}

export const PasswordRegex: IRegex = {
  value:
    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
  message:
    "Password must contain at least 8 characters, one uppercase, one number and one special case character",
};
