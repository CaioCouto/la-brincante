function returnOption(student) {
    const option = document.createElement('option');
    option.value = student.id;
    option.textContent = student.name;
    option.classList = 'text-capitalize';
    return option;
}

function fillStudentSelect() {
    const init = {
        method: 'get',
        mode: 'cors'
    };
    fetch(`http://${window.location.host}/students`, init)
    .then(resp => {
        if(resp.status === 200) {
            resp.json().then(body => {
                const select = document.querySelector('#students');
                body.forEach(student => select.appendChild(returnOption(student)));
            })
        }
    });
}

function fillCourseSelect() {
    const init = {
        method: 'get',
        mode: 'cors'
    };
    fetch(`http://${window.location.host}/courses`, init)
    .then(resp => {
        if(resp.status === 200) {
            resp.json().then(body => {
                const select = document.querySelector('#courses');
                body.forEach(course => select.appendChild(returnOption(course)));
            })
        }
    });
}

export default function fillFormSelects() {
    fillStudentSelect();
    fillCourseSelect();
}