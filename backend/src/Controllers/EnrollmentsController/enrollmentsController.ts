import { NextFunction, Request, Response } from "express";
import { Prisma } from '@prisma/client';

import { Enrollments } from '../../Models';

export default class EnrollmentsController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            let result;
            const enrollment = new Enrollments(req.body);
            result = await enrollment.listByStudentIdAndCourseId();
            if (result.length > 0) return res.status(400).json({});
            result = await enrollment.register();
            return res.json(result);            
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({});
        }
    }
    
    static async list(req: Request, res: Response, next: NextFunction) {
        let { id, classDay } = req.query;
        let enrollments;

        try {
            if (id) enrollments = await Enrollments.listById(id.toString());
            else if (classDay) enrollments = await Enrollments.listByClassDay(classDay.toString());
            else enrollments = await Enrollments.list();
            return res.json(enrollments); 
        } catch (error: any) {
            console.log(error)
            if (error.name === 'NotFoundError') return res.status(404).json({});
            return res.status(500).json({});
        }
    }
    
    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const enrollment = new Enrollments(req.body);
            const result = await enrollment.update(parseInt(req.params.id));
            return res.json(result);            
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({});
        }
    }
    
    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const deletedEnrollment = await Enrollments.delete(req.params.id);
            return res.json(deletedEnrollment);
        } catch (error: any) {
            if(error instanceof Prisma.PrismaClientKnownRequestError) return res.status(404).json({ message: 'Não foi possível deletar esta matrícula, talvez ela não exista mais.' });
            else return res.status(500).json({ message: 'Ocorreu um erro interno.' });
        }
    }
};