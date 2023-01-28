import placeElementsInTableBody from "../placeElementsInTableBody.js";


export default function fillClassesTable(lectures) {
    lectures.forEach(lecture => {
        const studentTd = document.createElement('td');
        const courseTd = document.createElement('td');
        const timeTd = document.createElement('td');
        const enviromentTd = document.createElement('td');

        studentTd.textContent = lecture.students.name;
        courseTd.textContent = lecture.course.name;
        timeTd.textContent = lecture.classTime;
        enviromentTd.textContent = lecture.isOnline ? 'Online' : 'Presencial';
        
        
        placeElementsInTableBody(
            document.querySelector('#classesTableBody'),
            [ 
                studentTd,
                courseTd,
                timeTd,
                enviromentTd
            ]
        );
    });
}