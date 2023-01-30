import api from "../../api";

export default class Students {
    constructor(name){
        this.__name = name;
    }

    static getAll() {
        return api.get('/students');
    }
    
    static getById(id) {
        return api.get(`/students/${id}`);
    }

    static create(name) {
        return api.post(
            '/students/register',
            {
                name: name
            }
        );
    }
    
    static update(id, name) {
        return api.patch(
            `/students/update/${id}`,
            {
                name: name
            }
        );
    }
    
    static delete(id) {
        return api.delete(`/students/delete/${id}`);
    }
};