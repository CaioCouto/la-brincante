import prisma from "../prisma";

interface Student {
    name: string
    billingDay: string
    discount: number
}

const { students } = prisma;

export default class Students {
    name: string
    billingDay: string
    discount: number

    constructor(data: Student) {
        this.name = data.name;
        this.billingDay = data.billingDay;
        this.discount = data.discount;
    }

    public register() {
        return students.create({
            data: {
                name: this.name,
                billingDay: this.billingDay,
                discount: this.discount
            }
        });
    }

    public update(id: number) {
        return students.update({
            where: {
                id: id,
            },
            data: {
                name: this.name,
                billingDay: this.billingDay,
                discount: this.discount
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
                name: 'asc'
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