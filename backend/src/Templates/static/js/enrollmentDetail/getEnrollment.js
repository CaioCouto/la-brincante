import Enrollments from "../Models/Enrollments.js";
import showAlert from "../showAlert.js";

import fillEnrollmentInformation from "./fillEnrollmentInformation.js";

function timedAlert(counter) {
    let seconds = 5; 
    setInterval(() => {
        showAlert(warning, 'warning', `A matrícula não existe. Você será redirecionado para a lista de matrículas em ${seconds} segundos.`);
        seconds-=1;
    }, counter*1000);
}

function redirectTimeOut() {
    setTimeout(() => {
        window.location = '/matriculas';
    }, 5000);
}

export default function getEnrollment(id) {
    Enrollments.getUniqueEnrollment(id)
    .then(body => {
        const spinner = document.querySelector('#spinner');
        spinner.classList.add('d-none');
        if(body) return fillEnrollmentInformation(body);
        const warning = document.querySelector('#warning');
        showAlert(warning, 'warning', `A matrícula não existe. Você será redirecionado para a lista de matrículas em 5 segundos.`);
        timedAlert(1);
        redirectTimeOut();
    });
};