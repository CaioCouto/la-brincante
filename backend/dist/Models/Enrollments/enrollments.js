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
        this.classDays = data.classDays.join(',');
        this.classTime = data.classTime;
        this.billingDay = data.billingDay;
        this.discount = data.discount;
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
                billingDay: this.billingDay,
                discount: this.discount,
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
                billingDay: this.billingDay,
                discount: this.discount,
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
                id: 'asc'
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
