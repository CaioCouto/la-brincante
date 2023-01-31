"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma"));
const { courses } = prisma_1.default;
class Courses {
    constructor(data) {
        this.name = data.name.toLowerCase();
    }
    register() {
        return courses.create({
            data: {
                name: this.name,
            }
        });
    }
    update(id) {
        return courses.update({
            where: {
                id: id,
            },
            data: {
                name: this.name,
            }
        });
    }
    static list() {
        return courses.findMany({
            orderBy: {
                name: 'asc'
            }
        });
    }
    static delete(id) {
        return courses.delete({
            where: {
                id: id
            }
        });
    }
}
exports.default = Courses;
;
