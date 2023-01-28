import api from "../../api";

export default class Students {
    constructor(name){
        this.__name = name;
    }

    static getAll() {
        return api.get('/students');
    }

    static create(name) {
        return api.post(
            '/students/register',
            {
                name: name
            }
        );
    }
    
    static delete(id) {
        return api.delete(`/students/delete/${id}`);
    }
};