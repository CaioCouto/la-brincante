"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const Models_1 = require("../../Models");
class CoursesController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = new Models_1.Courses(req.body);
                const result = yield course.register();
                return res.json(result);
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    return res.status(400).json({ message: 'Este curso já existe.' });
                }
                return res.status(500).json({ message: 'Erro Interno.' });
            }
        });
    }
    static list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield Models_1.Courses.list();
                res.json(courses);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({});
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let course = new Models_1.Courses(req.body);
                const result = yield course.update(parseInt(req.params.id));
                return res.json(result);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({});
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCourse = yield Models_1.Courses.delete(parseInt(req.params.id));
                res.json(deletedCourse);
            }
            catch (error) {
                console.log(error);
                if (error.code === 'P2025')
                    return res.status(404).json({});
                return res.status(500).json({});
            }
        });
    }
}
exports.default = CoursesController;
;
