import Header from '../components/header.js';
import showAlert from '../showAlert.js';
import getSearchParams from '../getSearchParams.js';

import getEnrollment from './getEnrollment.js';
import deleteEnrollment from './deleteEnrollment.js';
import updateEnrollment from './updateEnrollment.js';
import toggleElementEdit from './toggleElementEdit.js';
import hoursToMinutes from '../hoursToMinutes.js';
import validateForm from '../enrollments/validateForm.js';

const warning = document.querySelector('#warning');
const goBackBtn = document.querySelector('#goBackBtn');
const enrollmentDetails = document.querySelector('#enrollmentDetails');
const editBtn = document.querySelector('#editBtn');
const confirmRemoval = document.querySelector('#confirmRemoval');
const formButton = document.querySelector('#form__button');

const getRouteParams = () => Number(window.location.pathname.split('/').pop());

Header();

window.onload = () => {
    const enrollmentId = getRouteParams();
    const params = getSearchParams();
    if (params) {
        const { success, internalError } = params;
        if(Number(success)) showAlert(warning, 'success', 'Matricula atualizada com sucesso!');
        else if(Number(internalError)) showAlert(warning, 'danger', 'Um erro interno impediu a realização da matrícula. Contate o administador para resolvê-lo.'); 
    }
    getEnrollment(enrollmentId);
};

goBackBtn.addEventListener('click', () => window.location = '/matriculas');
confirmRemoval.addEventListener('click', () => deleteEnrollment(enrollmentDetails.elements.id.value));

let edit = false;
editBtn.addEventListener('click', () => {   
    edit = !edit;
    editBtn.textContent = edit ? 'Cancelar' : 'Editar';
    toggleElementEdit(edit, enrollmentDetails.elements);
});

formButton.addEventListener('click', () => {
    const id = enrollmentDetails.elements.id.value;
    const body = validateForm(enrollmentDetails.elements);
    if (body.message) return showAlert(warning, 'warning', body.message);
    updateEnrollment(id, body);
});