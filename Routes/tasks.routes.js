import express from 'express';
import { deleteTask, getMyTasks, newTask, updateTask } from '../Controller/task.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/new', isAuthenticated, newTask);
router.get('/mytasks', isAuthenticated, getMyTasks);
router.route('/:id').all(isAuthenticated).put(updateTask).delete(deleteTask);

export default router;