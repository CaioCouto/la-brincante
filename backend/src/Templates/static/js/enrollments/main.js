import Header from '../components/header.js';

import showAlert from '../showAlert.js';
import getSearchParams from '../getSearchParams.js';

import validateForm from './validateForm.js';
import fillFormSelects from './fillFormSelects.js';
import fillFormClassDay from '../fillFormClassDay.js';
import getAllEnrollments from './getAllEnrollments.js';
import fillClassDayFilter from './fillClassDayFilter.js';
import registerEnrollment from './registerEnrollment.js';

Header();

const warning = document.querySelector('#warning');
const filterBtn = document.querySelector('#filterBtn');
const submitButton = document.querySelector('#submitButton');
const tableBody = document.querySelector('#classesTableBody');

const clearTableBody = () => {
    while (tableBody.firstChild) tableBody.removeChild(tableBody.firstChild);
}

window.onload = () => {
    const params = getSearchParams();
    if (params) {
        const { success, deleted } = params;
        if(Number(success)) showAlert(warning, 'success', 'Aluno matriculado com sucesso!'); 
        else if(Number(deleted)) showAlert(warning, 'success', 'Matrícula deletada com sucesso!');
        else if(Number(deleted)) showAlert(warning, 'success', 'Matrícula deletada com sucesso!');
    }
    getAllEnrollments();
    fillFormSelects();
    fillFormClassDay();
    fillClassDayFilter();
};

filterBtn.addEventListener('click', () => {
    let query;
    const classDayFilters = [...document.querySelectorAll('.classDaysFilter')];
    const classDays = classDayFilters.map(checkbox => checkbox.checked ? checkbox.name : '').filter(elem => !!elem).join(',');
    if (classDays) {
        query = `?classDays=${classDays}`;
        clearTableBody();
    }
    getAllEnrollments(query);
});

submitButton.addEventListener('click', () => {
    const enrollmentForm = document.querySelector('#enrollmentForm');
    const formWarning = document.querySelector('#formWarning');
    const body = validateForm(enrollmentForm.elements);
    if(body.message) return showAlert(formWarning, 'danger', body.message);
    formWarning.classList = 'd-none';
    registerEnrollment(body);
});