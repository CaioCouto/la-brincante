import Header from '../components/header.js';

import showAlert from '../showAlert.js';
import getSearchParams from '../getSearchParams.js';

import resetForm from './resetForm.js';
import deleteCourse from './deleteCourse.js';
import updateCourse from './updateCourse.js';
import getAllCourses from './getAllCourses.js';
import registerCourse from './registerCourse.js';
import applyValueMask from './applyValueMask.js';

Header();

const newCourseForm = document.querySelector('#newCourseForm');
const deleteCourseForm = document.querySelector('#newCourseForm');
const warning = document.querySelector('#warning');
const modalBtn = document.querySelector('#modalBtn');
const submitButton = document.querySelector('#submitButton');
const confirmRemoval = document.querySelector('#confirmRemoval');
const courseValue = document.querySelector('#value');

window.onload = () => {
    const searchParams = getSearchParams();
    if(searchParams) {
        const { register, updated, deleted, notFound, internalError } = searchParams;
        if(Number(register)) showAlert(warning, 'success', 'Curso cadastrado com sucesso.');
        else if(Number(updated)) showAlert(warning, 'success', 'Informações do curso atualizadas com sucesso.'); 
        else if(Number(deleted)) showAlert(warning, 'success', 'Curso removido com sucesso.'); 
        else if(Number(notFound)) showAlert(warning, 'warning', 'O curso solicitado não existe.'); 
        else if(Number(internalError)) showAlert(warning, 'danger', 'Um erro interno ocorreu, impedindo a operação. Contate o administrador para solucioná-lo.'); 
    }
    getAllCourses();
};

modalBtn.addEventListener('click', () => resetForm());
courseValue.addEventListener('input', (e) => e.target.value = applyValueMask(e.target.value));
confirmRemoval.addEventListener('click', () => deleteCourse(deleteCourseForm.elements.id.value));

submitButton.addEventListener('click', () => {
    const { id, name, value } = newCourseForm.elements;
    const body = {
        name: name.value,
        value: value.value.replace(',','.')
    };
    return parseInt(id.value) ? updateCourse(id.value, body) : registerCourse(body);
});
