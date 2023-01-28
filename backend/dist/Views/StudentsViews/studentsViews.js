"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controllers_1 = require("../../Controllers");
const router = (0, express_1.Router)();
router.delete('/students/delete/:id', Controllers_1.StudentsController.delete);
router.patch('/students/update/:id', Controllers_1.StudentsController.update);
router.post('/students/register', Controllers_1.StudentsController.create);
router.get('/students/:id', Controllers_1.StudentsController.list);
router.get('/students', Controllers_1.StudentsController.list);
exports.default = router;
