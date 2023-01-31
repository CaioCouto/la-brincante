import express from 'express';
import cors from 'cors';
import path from 'path';

import { getTemplatesDir } from './utils';
import { studentsRoutes, coursesRoutes, enrollmentsRoutes } from './Views';

const returnStaticDir = () => path.join(getTemplatesDir(), 'assets');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/assets', express.static(returnStaticDir()));
app.use(studentsRoutes);
app.use(coursesRoutes);
app.use(enrollmentsRoutes);

export default app;