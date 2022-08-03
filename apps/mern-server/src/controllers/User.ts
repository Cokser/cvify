import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import { getAllUsers } from '../services/user'

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { email, password, username } = req.body;
//     const userData = await registerUser(email, username, password);
//     res.cookie('refreshToken', userData.refreshToken, { maxAge: 3000000, httpOnly: true });
//     return res.status(201).json(userData);
//   } catch (e) {
//     console.log(e)
//   }
// }
const readUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findById(userId)
    .then((user) => user ? res.status(200).json({ user }) : res.status(404).json({ message: 'Not Found'}))
    .catch((error) => res.status(500).json({ error }));
}
const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findById(userId)
    .then((user) => {
      if (user) {
        user.set(req.body);

        return user
          .save()
          .then((userProp) =>
            res.status(201).json({ user: userProp }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: 'Not Found'});
      }
    })
    .catch((error) => res.status(500).json({ error }));
}
const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  return User.findByIdAndDelete(userId)
    .then((user) => user
      ? res.status(201).json({ message: 'deleted' })
      : res.status(404).json({ message: 'Not Found'}))
    .catch((error) => res.status(500).json({ error }));
}

export default { readUser, readAll, updateUser, deleteUser };
