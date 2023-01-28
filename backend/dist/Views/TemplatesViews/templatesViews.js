"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const utils_1 = require("../../utils");
const returnTemplate = (template) => path_1.default.join((0, utils_1.getTemplatesDir)(), `${template}.html`);
const router = (0, express_1.Router)();
router.get('/matriculas/:id', (req, res, next) => {
    if (Number(req.params.id))
        return res.sendFile(returnTemplate('enrollmentDetails'));
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
exports.default = router;
