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
    
    static update(id, data) {
        return api.patch(
            `/students/update/${id}`,
            data
        );
    }
    
    static delete(id) {
        return api.delete(`/students/delete/${id}`);
    }
};