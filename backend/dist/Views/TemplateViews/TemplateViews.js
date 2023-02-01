"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controllers_1 = require("../../Controllers");
const router = (0, express_1.Router)();
router.get('/*', Controllers_1.TemplatesController.serve);
exports.default = router;
