import User from '../models/User';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { sendActivationMail } from './mail';
import { generateToken, saveToken, removeToken, validateRefreshToken, findToken } from './token'

export const registerUser = async (email: string, username: string, password: string) => {
  const candidate = await User.findOne({ email });

  if (candidate) {
    throw new Error(`User with this ${email} is already exists!`);
  }

  const hashPassword = await bcrypt.hash(password, 3);
  const activationLink = uuidv4();
  const user = await User.create({
    _id: new mongoose.Types.ObjectId(),
    password: hashPassword,
    email,
    username,
    activationLink
  });
  await sendActivationMail(email, `${process.env.API_URL}${process.env.SYS_PORT_SERVER}/api/activate/${activationLink}`);

  const userPayload = {
    email: user.email,
    id: user._id,
    active: user.active
  }
  const tokens = await generateToken({ ...userPayload });
  await saveToken(user._id, tokens.refreshToken);

  return {
    ...tokens,
    user: userPayload
  }
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error(`User with this ${email} doesn't exists!`);
  }

  const isPassEquals = await bcrypt.compare(password, user.password);

  if (!isPassEquals) {
    throw new Error(`Your password is wrong!`);
  }

  const userPayload = {
    email: user.email,
    id: user._id,
    active: user.active
  }
  const tokens = await generateToken({ ...userPayload });
  await saveToken(user._id, tokens.refreshToken);

  return {
    ...tokens,
    user: userPayload
  }
};

export const logoutUser = async (refreshToken: string) => {
  const token = await removeToken(refreshToken);
  return token;
}

export const refreshUser = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new Error(`Your token is invalid!`);
  }
  const userData = validateRefreshToken(refreshToken);
  const tokenFromDb = await findToken(refreshToken);
  if (!userData || !tokenFromDb) {
    throw new Error(`Your token is invalid!`);
  }

  const user = await User.findById(userData.id);
  if (!user) {
    throw new Error(`Your user is invalid!`);
  }

  const userPayload = {
    email: user.email,
    id: user._id,
    active: user.active
  }
  const tokens = await generateToken({...userPayload});

  await saveToken(userPayload.id, tokens.refreshToken);
  return {...tokens, user: userPayload}
}

export const activateUser = async (link: string) => {
  const user = await User.findOne({ activationLink: link });

  if (!user) {
    throw new Error('Wrong activation link');
  }
  user.active = true;
  await user.save();
}

export const getAllUsers = async () => {
  const users = await User.find();
  return users;
}
