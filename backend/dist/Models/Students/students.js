"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma"));
const { students } = prisma_1.default;
class Students {
    constructor(data) {
        this.name = data.name;
    }
    register() {
        return students.create({
            data: {
                name: this.name,
            }
        });
    }
    update(id) {
        return students.update({
            where: {
                id: id,
            },
            data: {
                name: this.name
            }
        });
    }
    static listUnique(id) {
        return students.findUnique({
            where: {
                id: id
            },
            include: {
                enrollments: {
                    select: {
                        id: true,
                        classDays: true,
                        classTime: true,
                        course: true,
                    }
                }
            }
        });
    }
    static list() {
        return students.findMany({
            include: {
                enrollments: true
            },
            orderBy: {
                id: 'asc'
            }
        });
    }
    static delete(id) {
        return students.delete({
            where: {
                id: id
            }
        });
    }
}
exports.default = Students;
