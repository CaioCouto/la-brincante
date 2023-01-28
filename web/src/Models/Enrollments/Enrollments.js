import api from "../../api";

export default class Enrollments {
    constructor(name){
        this.__name = name;
    }

    static getAll() {
        return api.get('/enrollments');
    }
    
    static getByClassDays(classDays) {
        return api.get(`/enrollments?classDays=${classDays}`);
    }
    
    static getOne(id) {
        return api.get(`/enrollments?id=${id}`);
    }

    static create(body) {
        return api.post(
            '/enrollments/register',
            {
                studentId: body.studentId,
                courseId: body.courseId,
                classDays: body.classDays,
                classTime: body.classTime,
                billingDay: body.billingDay,
                discount: body.discount,
                isOnline: body.isOnline,
                duration: body.duration
            }
        );
    }
    
    static update(id, body) {
        return api.patch(
            `/enrollments/update/${id}`,
            {
                studentId: body.studentId,
                courseId: body.courseId,
                classDays: body.classDays,
                classTime: body.classTime,
                billingDay: body.billingDay,
                discount: body.discount,
                isOnline: body.isOnline,
                duration: body.duration
            }
        );
    }
    
    static delete(id) {
        return api.delete(`/enrollments/delete/${id}`);
    }
};