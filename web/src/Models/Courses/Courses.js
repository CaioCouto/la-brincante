import api from "../../api";

export default class Courses {
    constructor(name){
        this.__name = name;
    }

    static getAll() {
        return api.get('/courses');
    }

    static create(name) {
        return api.post(
            '/courses/register',
            {
                name: name,
            }
        );
    }
    
    static delete(id) {
        return api.delete(`/courses/delete/${id}`);
    }
};