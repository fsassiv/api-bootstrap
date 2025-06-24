import * as bcrypt from 'bcryptjs';

export const generateHash = async (password: string) =>
  await bcrypt.hash(password, await bcrypt.genSalt());

export const doesPasswordMatch = async (password: string, hash: string) =>
  await bcrypt.compare(password, hash);
