import Enrollments from '../Models/Enrollments.js';
import showAlert from '../showAlert.js';

export default function registerEnrollment(body) {
    Enrollments.register(body)
    .then(statusCode => {
        const warning = document.querySelector('#warning');
        if(statusCode === 200) window.location = '/matriculas?success=1';
        else if(statusCode === 500) showAlert(warning, 'danger', 'Um erro interno ocorreu');
    });
}