import { NextFunction, Request, Response } from "express";

import { Students } from "../../Models";

export default class StudentsController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const student = new Students(req.body);
            const result = await student.register();
            return res.json(result);
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({});
        }
    }
    
    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const student = new Students(req.body);
            const result = await student.update(parseInt(req.params.id));
            return res.json(result);
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({});
        }
    }
    
    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            let students;
            if (id) students = await Students.listUnique(parseInt(id));
            else students = await Students.list()
            if (!students) return res.status(404).json(students);            
            return res.json(students);            
        } catch (error: any) {
            console.log(error);
            res.status(500).json({});
        }
        
    }
    
    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const student = await Students.delete(parseInt(req.params.id));
            return res.json(student);
        } catch (error: any) {
            console.log(error)
            if (error.code === 'P2025') return res.status(404).json({});
            return res.status(500).json({ message: 'Ocorreu um erro interno.' });
        }
    }
};