import prisma from "../prisma";

interface ICourses {
    name: string
}

const { courses } = prisma;

export default class Courses {
    name: string

    constructor(data: ICourses) {
        this.name = data.name.toLowerCase();
    }

    register() {
        return courses.create({
            data: {
                name: this.name,
            }
        });
    }

    update(id: number) {
        return courses.update({
            where: {
                id: id,
            },
            data: {
                name: this.name,
            }
        })
    }
    
    static list() {
        return courses.findMany({
            orderBy: {
                id: 'asc'
            }
        });
    }

    static delete(id: number) {
        return courses.delete({ 
            where: { 
                id: id
            }
        });
    }
};