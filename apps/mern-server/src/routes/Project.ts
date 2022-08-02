import express from 'express';
import controller from '../controllers/Project';
import { Schemas, ValidateJoi } from '../middleware/ValidateSchema';

const router = express.Router();

router.get('/', controller.readAll);
router.get('/:id', controller.readProject);
router.post('/create', ValidateJoi(Schemas.project.create), controller.createProject);
router.patch('/update/:id', ValidateJoi(Schemas.project.update), controller.updateProject);
router.delete('/delete/:id', controller.deleteProject);

export = router;
