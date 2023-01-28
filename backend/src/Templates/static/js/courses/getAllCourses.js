import Courses from '../Models/Courses.js';
import showAlert from '../showAlert.js';
import fillCoursesTable from './fillCoursesTable.js';

export default function getAllCourses() {
    Courses.getAllCourses().then(courses => {
        if(courses.length > 0) return fillCoursesTable(courses);
        const table = document.querySelector('.table');
        table.classList.add('d-none');
        showAlert(warning, 'warning', 'Ainda não há cursos cadastrados.');
    });
}