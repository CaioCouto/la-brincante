import { Router } from 'express';
import path from 'path';

import { getTemplatesDir } from '../../utils';

const returnTemplate = (template: string) => path.join(getTemplatesDir(), `${template}.html`);
const router = Router();

router.get('/matriculas/:id', (req, res, next) => {
    if (Number(req.params.id)) return res.sendFile(returnTemplate('enrollmentDetails'));
    return res.redirect('/matriculas');
});

router.get('/matriculas', (req, res, next) => {
    res.sendFile(returnTemplate('enrollments'));
});

router.get('/cursos', (req, res, next) => {
    res.sendFile(returnTemplate('courses'));
});

router.get('/alunos', (req, res, next) => {
    res.sendFile(returnTemplate('students'));
});

router.get('/', (req, res, next) => {
    res.sendFile(returnTemplate('index'));
});

export default router;