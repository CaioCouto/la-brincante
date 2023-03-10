"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateRoutes = exports.enrollmentsRoutes = exports.coursesRoutes = exports.studentsRoutes = void 0;
const CoursesViews_1 = __importDefault(require("./CoursesViews"));
exports.coursesRoutes = CoursesViews_1.default;
const StudentsViews_1 = __importDefault(require("./StudentsViews"));
exports.studentsRoutes = StudentsViews_1.default;
const EnrollmentsViews_1 = __importDefault(require("./EnrollmentsViews"));
exports.enrollmentsRoutes = EnrollmentsViews_1.default;
const TemplateViews_1 = __importDefault(require("./TemplateViews"));
exports.templateRoutes = TemplateViews_1.default;
