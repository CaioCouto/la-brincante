import { Router } from 'express';

import { StudentsController } from '../../Controllers';

const router = Router();

router.delete('/students/delete/:id', StudentsController.delete);

router.patch('/students/update/:id', StudentsController.update);

router.post('/students/register', StudentsController.create);

router.get('/students/:id', StudentsController.list);
router.get('/students', StudentsController.list);

export default router;