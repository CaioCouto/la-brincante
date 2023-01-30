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
const Models_1 = require("../../Models");
class StudentsController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student = new Models_1.Students(req.body);
                const result = yield student.register();
                return res.json(result);
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
                const student = new Models_1.Students(req.body);
                const result = yield student.update(parseInt(req.params.id));
                return res.json(result);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({});
            }
        });
    }
    static list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                let students;
                if (id)
                    students = yield Models_1.Students.listUnique(parseInt(id));
                else
                    students = yield Models_1.Students.list();
                if (!students)
                    return res.status(404).json(students);
                return res.json(students);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({});
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student = yield Models_1.Students.delete(parseInt(req.params.id));
                return res.json(student);
            }
            catch (error) {
                console.log(error);
                if (error.code === 'P2025')
                    return res.status(404).json({});
                return res.status(500).json({ message: 'Ocorreu um erro interno.' });
            }
        });
    }
}
exports.default = StudentsController;
;
