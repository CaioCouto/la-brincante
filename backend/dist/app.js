"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
const Views_1 = require("./Views");
const returnStaticDir = () => path_1.default.join((0, utils_1.getTemplatesDir)(), 'assets');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/assets', express_1.default.static(returnStaticDir()));
app.use(Views_1.studentsRoutes);
app.use(Views_1.coursesRoutes);
app.use(Views_1.enrollmentsRoutes);
exports.default = app;
