export default class Courses {
    static getAllCourses() {
        const init = {
            method: 'GET',
            mode: 'cors'
        };
        return fetch(`http://${window.location.host}/courses`, init)
        .then(resp => {
            if(resp.status === 200) return resp.json().then(body => body);
        });
    }

    static register(body) {
        const init = {
            body: JSON.stringify(body),
            mode: 'cors',
            method: 'POST',
            headers: { 'Content-Type':'application/json' },
        };
        return fetch(`http://${window.location.host}/courses/register`, init)
        .then(resp => resp.status);
    }
    
    static update(id, body) {
        const init = {
            body: JSON.stringify(body),
            mode: 'cors',
            method: 'PATCH',
            headers: { 'Content-Type':'application/json' },
        };
        return fetch(`http://${window.location.host}/courses/update/${id}`, init)
        .then(resp => resp.status);
    }

    static delete(id) {
        const init = {
            method: 'DELETE',
            mode: 'cors'
        };
        return fetch(`http://${window.location.host}/courses/delete/${id}`, init)
        .then(resp => resp.status);       
    }
}