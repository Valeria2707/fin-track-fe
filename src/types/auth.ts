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
