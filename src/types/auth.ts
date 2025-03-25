export interface Login {
  email: string;
  password: string;
}

export interface SignUp extends Login {
  name: string;
}

export interface NewPassword {
  token: string;
  newPassword: string;
}

export interface Password {
  newPassword: string;
  confirmPassword: string;
}

export interface SignUp {
  name: string;
  email: string;
  password: string;
}
