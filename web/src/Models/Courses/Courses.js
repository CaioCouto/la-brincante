import api from "../../api";

export default class Courses {
    constructor(name){
        this.__name = name;
    }

    static getAll() {
        return api.get('/courses');
    }

    static create(name, value) {
        return api.post(
            '/courses/register',
            {
                name: name,
                value: value
            }
        );
    }
    
    static delete(id) {
        return api.delete(`/courses/delete/${id}`);
    }
};