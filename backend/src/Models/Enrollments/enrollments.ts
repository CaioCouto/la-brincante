import prisma from "../prisma";

interface IEnrollments { 
    studentId: number
    courseId: number
    classDays: string
    classTime: string
    isOnline: number
    duration: string
};

const { enrollments } = prisma;

export default class Enrollments {
    studentId: number
    courseId: number
    classDays: string
    classTime: string
    isOnline: boolean
    duration: string

    constructor(data: IEnrollments) {
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

    update(id: number) {
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
    
    static listById(id: string) {
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
    
    static listByClassDay(classDay: string) {
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

    static delete(id: string) {
        return enrollments.delete({ 
            where: { 
                id: parseInt(id)
            }
        });
    }
};