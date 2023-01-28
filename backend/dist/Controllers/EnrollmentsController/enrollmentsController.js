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
class EnrollmentsController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                const enrollment = new Models_1.Enrollments(req.body);
                result = yield enrollment.listByStudentIdAndCourseId();
                if (result.length > 0)
                    return res.status(400).json({});
                result = yield enrollment.register();
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
            let { id } = req.query;
            let enrollments;
            try {
                if (id)
                    enrollments = yield Models_1.Enrollments.listById(id.toString());
                else
                    enrollments = yield Models_1.Enrollments.list();
                return res.json(enrollments);
            }
            catch (error) {
                console.log(error);
                if (error.name === 'NotFoundError')
                    return res.status(404).json({});
                return res.status(500).json({});
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const enrollment = new Models_1.Enrollments(req.body);
                const result = yield enrollment.update(parseInt(req.params.id));
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
                const deletedEnrollment = yield Models_1.Enrollments.delete(req.params.id);
                return res.json(deletedEnrollment);
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError)
                    return res.status(404).json({ message: 'Não foi possível deletar esta matrícula, talvez ela não exista mais.' });
                else
                    return res.status(500).json({ message: 'Ocorreu um erro interno.' });
            }
        });
    }
}
exports.default = EnrollmentsController;
;
