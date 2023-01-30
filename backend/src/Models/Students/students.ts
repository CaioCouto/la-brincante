import prisma from "../prisma";

interface Student {
    name: string
}

const { students } = prisma;

export default class Students {
    name: string

    constructor(data: Student) {
        this.name = data.name;
    }

    public register() {
        return students.create({
            data: {
                name: this.name,
            }
        });
    }

    public update(id: number) {
        return students.update({
            where: {
                id: id,
            },
            data: {
                name: this.name
            }
        })
    }

    static listUnique(id: number) {
        return students.findUnique({ 
            where: { 
                id: id
            },
            include: {
                enrollments: {
                    select: {
                        id:true,
                        classDays: true,
                        classTime: true,
                        course: true,
                        isOnline: true,
                        duration: true
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

    static delete(id: number) {
        return students.delete({ 
            where: { 
                id: id
            }
        });
    }
}