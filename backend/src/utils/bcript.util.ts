import { hash } from 'bcrypt';

export async function hashedPassword(password: string) {
  const hashedPassword = await hash(password, Number(process.env.HASH_ROUNDS));

  return hashedPassword;
}
