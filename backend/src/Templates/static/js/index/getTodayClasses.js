import showAlert from '../showAlert.js';
import getTodayDay from '../getTodayDay.js';
import fillClassesTable from './fillClassesTable.js';

export default function getTodayClasses() {
    const init = {
        method: 'GET',
        mode: 'cors'
    };
    fetch(`http://${window.location.host}/enrollments?classDays=${getTodayDay().day}`, init)
    .then(resp => {
        if(resp.status) {
            resp.json().then(body => {
                if (body.length > 0) return fillClassesTable(body);
                const table = document.querySelector('.table');
                table.classList.add('d-none');
                showAlert(warning, 'success', 'Não há aulas hoje!');
            })
        }
    });            
}