export default class Enrollments {
    static getUniqueEnrollment(id) {
        const init = {
            method: 'GET',
            mode: 'cors'
        };
        return fetch(`http://${window.location.host}/enrollments?id=${id}`, init)
        .then(resp => {
            if(resp.status === 200) return resp.json().then(body => body);
            else if(resp.status === 404) return false;
        });
    }
    
    static getAllEnrollments(queryParams) {
        const init = {
            method: 'GET',
            mode: 'cors'
        };
        return fetch(`http://${window.location.host}/enrollments${queryParams}`, init)
        .then(resp => {
            if(resp.status === 200) return resp.json().then(body => body);
            else if(resp.status === 500) return false;
        });
    }

    static register(body) {
        const init = {
            body: JSON.stringify(body),
            mode: 'cors',
            method: 'POST',
            headers: { 'Content-Type':'application/json' },
        };
        return fetch(`http://${window.location.host}/enrollments/register`, init)
        .then(resp => resp.status);
    }
    
    static update(id, body) {
        const init = {
            body: JSON.stringify(body),
            mode: 'cors',
            method: 'PATCH',
            headers: { 'Content-Type':'application/json' },
        };
        return fetch(`http://${window.location.host}/enrollments/update/${id}`, init)
        .then(resp => resp.status);
    }

    static delete(id) {
        const init = {
            method: 'DELETE',
            mode: 'cors'
        };
        return fetch(`http://${window.location.host}/enrollments/delete/${id}`, init)
        .then(resp => resp.status);
    }
}