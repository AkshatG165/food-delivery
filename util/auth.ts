import { hash, compare } from 'bcryptjs';

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function checkPassword(
  enteredPassword: string,
  storedPassword: string
) {
  const isValid = await compare(enteredPassword, storedPassword);
  return isValid;
}
