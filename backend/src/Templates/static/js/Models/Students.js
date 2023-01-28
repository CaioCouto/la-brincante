export default class Students {
    static getAllStudents() {
        const init = {
            method: 'GET',
            mode: 'cors'
        };
        return fetch(`http://${window.location.host}/students`, init)
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
        return fetch(`http://${window.location.host}/students/register`, init)
        .then(resp => resp.status);
    }
    
    static update(id, body) {
        const init = {
            body: JSON.stringify(body),
            mode: 'cors',
            method: 'PATCH',
            headers: { 'Content-Type':'application/json' },
        };
        return fetch(`http://${window.location.host}/students/update/${id}`, init)
        .then(resp => resp.status);
    }

    static delete(id) {
        const init = {
            method: 'DELETE',
            mode: 'cors'
        };
        return fetch(`http://${window.location.host}/students/delete/${id}`, init)
        .then(resp => resp.status);       
    }
}