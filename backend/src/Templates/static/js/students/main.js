import Header from "../components/header.js";

import showAlert from "../showAlert.js";
import getSearchParams from "../getSearchParams.js";

import resetForm from "./resetForm.js";
import updateStudent from "./updateStudent.js";
import getAllStudents from "./getAllStudents.js";
import registerStudent from "./registerStudent.js";
import deleteStudent from "./deleteStudent.js";

Header();

const newUserForm = document.querySelector('#newUserForm');
const userDeleteForm = document.querySelector('#userDeleteForm');
const warning = document.querySelector('#warning');
const newStudentModalBtn = document.querySelector('#newStudentModalBtn');
const studentsTable = document.querySelector('#studentsTable');
const submitButton = document.querySelector('#submitButton');
const confirmRemoval = document.querySelector('#confirmRemoval');

// Window's On Load event
window.onload = () => {
    const searchParams = getSearchParams();
    if(searchParams) {
        const { register, update, deleted, notFound, internalError } = searchParams;
        if(Number(register)) showAlert(warning, 'success', 'Aluno cadastrado com sucesso.'); 
        else if(Number(update)) showAlert(warning, 'success', 'Informações do aluno atualizadas com sucesso.');
        else if(Number(deleted)) showAlert(warning, 'success', 'O aluno foi removido com sucesso.');
        else if(Number(notFound)) showAlert(warning, 'warning', 'O aluno O aluno solicitado não existe.');
        else if(Number(internalError)) showAlert(warning, 'danger', 'Um erro interno ocorreu, impedindo a operação. Contate o administrador para solucioná-lo.');
    }    
    getAllStudents();
};

newStudentModalBtn.addEventListener('click', () => resetForm());
confirmRemoval.addEventListener('click', () => deleteStudent(userDeleteForm.elements.id.value));

submitButton.addEventListener('click', () => {
    const { name, id } = newUserForm.elements;
    const body = { name: name.value };
    !id.value ? registerStudent(body) : updateStudent(id.value, body);
});