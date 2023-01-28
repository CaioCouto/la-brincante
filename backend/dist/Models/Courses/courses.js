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
        this.value = parseFloat(data.value);
    }
    register() {
        return courses.create({
            data: {
                name: this.name,
                value: this.value,
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
                value: this.value,
            }
        });
    }
    static list() {
        return courses.findMany({
            orderBy: {
                id: 'asc'
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
