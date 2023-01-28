import minutesToHours from '../minutesToHours.js';
import placeElementsInTableBody from "../placeElementsInTableBody.js";


function getDetailsButton(enrollment) {
    const detailsBtn = document.createElement('button');

    detailsBtn.classList = 'btn btn-info';
    detailsBtn.textContent = 'Detalhes';

    detailsBtn.addEventListener('click', () => window.location = `/matriculas/${enrollment.id}`);

    return detailsBtn;
}

function sumClassTimeAndDuration(classTime, duration) {
    function convertToMinutes([ hoursStr, minutesStr ]) {
        const hoursInMinutes = parseInt(hoursStr) * 60;
        return minutesStr === '00' ? hoursInMinutes : hoursInMinutes + parseInt(minutesStr);
    }
    const totalMinutes = convertToMinutes(classTime.split(':')) + duration;
    return minutesToHours(totalMinutes);
}

export default function fillEnrollmentsTable(enrollments) {
    enrollments.forEach(enrollment => {
        const idTd = document.createElement('td');
        const studentTd = document.createElement('td');
        const courseTd = document.createElement('td');
        const classDaysTd = document.createElement('td');
        const classTimeTd = document.createElement('td');
        const enviromentTd = document.createElement('td');
        const optionsTd = document.createElement('td');

        const endClassTime = sumClassTimeAndDuration(enrollment.classTime, enrollment.minutesLong);

        idTd.textContent = enrollment.id;
        studentTd.textContent = enrollment.students.name;
        courseTd.textContent = enrollment.course.name;
        classDaysTd.textContent = enrollment.classDays;
        classTimeTd.textContent = `${enrollment.classTime} ~ ${endClassTime}`;
        enviromentTd.textContent = enrollment.isOnline ? 'Online' : 'Presencial';
        optionsTd.appendChild(getDetailsButton(enrollment));
        
        placeElementsInTableBody(
            document.querySelector('#classesTableBody'),
            [ 
                idTd, 
                studentTd, 
                courseTd, 
                classDaysTd, 
                classTimeTd,
                enviromentTd,
                optionsTd
            ]
        );
    });
}