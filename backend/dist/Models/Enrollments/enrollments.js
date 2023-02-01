"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma"));
;
const { enrollments } = prisma_1.default;
class Enrollments {
    constructor(data) {
        this.studentId = data.studentId;
        this.courseId = data.courseId;
        this.classDays = data.classDays;
        this.classTime = data.classTime;
        this.isOnline = Boolean(data.isOnline);
        this.duration = data.duration;
    }
    register() {
        return enrollments.create({
            data: {
                studentId: this.studentId,
                courseId: this.courseId,
                classDays: this.classDays,
                classTime: this.classTime,
                isOnline: this.isOnline,
                duration: this.duration,
            }
        });
    }
    update(id) {
        return enrollments.update({
            where: {
                id: id
            },
            data: {
                studentId: this.studentId,
                courseId: this.courseId,
                classDays: this.classDays,
                classTime: this.classTime,
                isOnline: this.isOnline,
                duration: this.duration,
            }
        });
    }
    static list() {
        return enrollments.findMany({
            include: {
                students: true,
                course: true
            },
            orderBy: {
                studentId: 'asc'
            }
        });
    }
    static listById(id) {
        return enrollments.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                students: true,
                course: true
            },
            rejectOnNotFound: true
        });
    }
    static listByClassDay(classDay) {
        return enrollments.findMany({
            where: {
                classDays: {
                    contains: classDay
                }
            },
            include: {
                students: true,
                course: true
            }
        });
    }
    listByStudentIdAndCourseId() {
        return enrollments.findMany({
            where: {
                studentId: this.studentId,
                courseId: this.courseId
            }
        });
    }
    static delete(id) {
        return enrollments.delete({
            where: {
                id: parseInt(id)
            }
        });
    }
}
exports.default = Enrollments;
;
