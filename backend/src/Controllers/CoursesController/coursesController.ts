import { NextFunction, Request, Response } from "express";
import { Prisma } from '@prisma/client';

import { Courses } from '../../Models';

export default class CoursesController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const course = new Courses(req.body);
            const result = await course.register();
            return res.json(result);
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError){
                return res.status(400).json({ message: 'Este curso já existe.' });
            }
            return res.status(500).json({ message: 'Erro Interno.' });
        }
    }
    
    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const courses = await Courses.list();
            res.json(courses);
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({});
        }
    }
    
    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            let course = new Courses(req.body);
            const result = await course.update(parseInt(req.params.id));
            return res.json(result);
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({});
        }
    }
    
    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const deletedCourse = await Courses.delete(parseInt(req.params.id));
            res.json(deletedCourse);
        } catch (error: any) {
            console.log(error);
            if (error.code === 'P2025') return res.status(404).json({});
            return res.status(500).json({});
        }
    }
};