import prisma from "../prisma";

interface ICourses {
    name: string 
    value: string
}

const { courses } = prisma;

export default class Courses {
    name: string 
    value: number

    constructor(data: ICourses) {
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

    update(id: number) {
        return courses.update({
            where: {
                id: id,
            },
            data: {
                name: this.name,
                value: this.value,
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