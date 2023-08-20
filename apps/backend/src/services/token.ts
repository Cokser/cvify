// import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');
import Token from '../models/Token';

export const saveToken = async (userId: string, refreshToken: string) => {
  const tokenData = await Token.findOne({ user: userId });

  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }

  const token = await Token.create({ user: userId, refreshToken });
  return token;
}

export const generateToken = async (payload: any) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '30m' });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '30d' });
  return {
    accessToken,
    refreshToken
  }
};

export const validateRefreshToken = (token: any) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
    return userData;
  } catch (e) {
    console.log(e);
  }
};

export const validateAccessToken = (token: any) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
    return userData;
  } catch (e) {
    return null;
  }
};

export const removeToken = async (refreshToken: string) => {
  const tokenData = await Token.deleteOne({refreshToken})
  return tokenData;
};

export const findToken = async (refreshToken: string) => {
  const tokenData = await Token.findOne({refreshToken})
  return tokenData;
};
