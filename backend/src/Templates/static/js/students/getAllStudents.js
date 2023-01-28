import Students from '../Models/Students.js';
import showAlert from '../showAlert.js';
import fillStudentsTable from './fillStudentsTable.js';

export default function getAllStudents() {
    Students.getAllStudents().then(students => {
        if(students.length > 0) return fillStudentsTable(students);
        const table = document.querySelector('.table');
        table.classList.add('d-none');
        showAlert(warning, 'warning', 'Ainda não há Alunos cadastrados.');
    });
}