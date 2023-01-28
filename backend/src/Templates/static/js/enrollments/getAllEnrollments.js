import Enrollments from '../Models/Enrollments.js';
import showAlert from '../showAlert.js';

import fillEnrollmentsTable from './fillEnrollmentsTable.js';

export default function getAllEnrollments(query='') {
    Enrollments.getAllEnrollments(query)
    .then(enrollments => {
        if (enrollments.length > 0) return fillEnrollmentsTable(enrollments);
        const table = document.querySelector('.table');
        table.classList.add('d-none');
        if(!enrollments) return showAlert(warning, 'danger', 'Um erro interno ocorreu. Contate o administador para resolvê-lo.');
        showAlert(warning, 'warning', 'Ainda não há matrículas cadastradas.');
    });       
}