import express from 'express';
import cors from 'cors';
import path from 'path';

import { getTemplatesDir } from './utils';
import { studentsRoutes, coursesRoutes, enrollmentsRoutes, templatesRoutes } from './Views';

const returnStaticDir = () => path.join(getTemplatesDir(), 'static');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/static', express.static(returnStaticDir()));
app.use(templatesRoutes);
app.use(studentsRoutes);
app.use(coursesRoutes);
app.use(enrollmentsRoutes);

export default app;