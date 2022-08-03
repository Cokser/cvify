import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import { activateUser, loginUser, logoutUser, refreshUser, registerUser } from '../services/user'

const registration = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, username } = req.body;
    const userData = await registerUser(email, username, password);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 2592000000, httpOnly: true });
    return res.status(201).json(userData);
  } catch (e) {
    console.log(e)
  }
}
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, username } = req.body;
    const userData = await loginUser(email,  password);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 2592000000, httpOnly: true });
    return res.status(201).json(userData);
  } catch (e) {
    next(e);
  }
}
const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {refreshToken} = req.cookies;
    const token = await logoutUser(refreshToken);
    res.clearCookie('refreshToken');
    return res.json(token);
  } catch (e) {
    next(e);
  }
}
const activate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activationLink = req.params.link;
    await activateUser(activationLink);
    return res.redirect(process.env.CLIENT_URL as string);
  } catch (e) {
    console.log(e)
  }
}
const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.cookies;
    const userData = await refreshUser(refreshToken);
    res.cookie('refreshToken', userData.refreshToken, {maxAge: 2592000000, httpOnly: true})
    return res.json(userData);
  } catch (e) {
    next(e);
  }
}

export default { registration, login, logout, activate, refresh }
