import { Router } from "express";

import { EnrollmentsController } from '../../Controllers';

const router = Router();

router.patch('/enrollments/update/:id', EnrollmentsController.update);

router.delete('/enrollments/delete/:id', EnrollmentsController.delete);

router.post('/enrollments/register', EnrollmentsController.create);

router.get('/enrollments', EnrollmentsController.list);

export default router;