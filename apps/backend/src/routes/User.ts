import express from 'express';
import controller from '../controllers/User';
import { Schemas, ValidateJoi } from '../middleware/ValidateSchema'
import { authorized } from '../middleware/auth'

const router = express.Router();

router.get('/', authorized, controller.readAll);
router.get('/:userId', controller.readUser);
// router.post('/create', ValidateJoi(Schemas.user.create), controller.createUser);
router.patch('/update/:userId', ValidateJoi(Schemas.user.create), controller.updateUser);
router.delete('/delete/:userId', controller.deleteUser);

export = router;
