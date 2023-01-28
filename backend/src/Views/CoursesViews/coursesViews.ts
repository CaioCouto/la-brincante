import { Router } from 'express';

import { CoursesController } from '../../Controllers';

const router = Router();

router.patch('/courses/update/:id', CoursesController.update);

router.delete('/courses/delete/:id', CoursesController.delete);

router.post('/courses/register', CoursesController.create);

router.get('/courses', CoursesController.list);

export default router;