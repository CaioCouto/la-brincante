"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollmentsRoutes = exports.coursesRoutes = exports.studentsRoutes = exports.templatesRoutes = void 0;
const CoursesViews_1 = __importDefault(require("./CoursesViews"));
exports.coursesRoutes = CoursesViews_1.default;
const StudentsViews_1 = __importDefault(require("./StudentsViews"));
exports.studentsRoutes = StudentsViews_1.default;
const TemplatesViews_1 = __importDefault(require("./TemplatesViews"));
exports.templatesRoutes = TemplatesViews_1.default;
const EnrollmentsViews_1 = __importDefault(require("./EnrollmentsViews"));
exports.enrollmentsRoutes = EnrollmentsViews_1.default;
