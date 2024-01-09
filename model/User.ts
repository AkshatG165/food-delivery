export default class User {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;

  constructor(
    name: string,
    email: string,
    password: string,
    isAdmin: boolean = false
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
  }
}
