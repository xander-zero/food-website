import { hash } from "bcryptjs";

async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export { hashPassword };
