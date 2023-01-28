function getOptions(course) {
    const optionsTd = document.createElement('td');
    const updateBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    deleteBtn.classList = 'btn btn-danger';
    deleteBtn.textContent = 'Excluir';
    deleteBtn.setAttribute('data-bs-toggle', "modal");
    deleteBtn.setAttribute('data-bs-target', "#deleteCourseConfirmation");
    deleteBtn.addEventListener('click', () => {
        const { id } = newCourseForm.elements;
        id.value = course.id;
    });
    
    updateBtn.classList = 'btn btn-success';
    updateBtn.textContent = 'Editar';
    updateBtn.setAttribute('data-bs-toggle', "modal");
    updateBtn.setAttribute('data-bs-target', "#newCourseModal");

    updateBtn.addEventListener('click', () => {
        const { id, name } = newCourseForm.elements;
        id.value = course.id;
        name.value = course.name;
        value.value = course.value;
    });

    
    optionsTd.appendChild(updateBtn);
    optionsTd.appendChild(deleteBtn);
    optionsTd.classList = 'd-flex flex-column flex-md-row justify-content-center gap-2';
    return optionsTd;
}

export default function fillCoursesTable(courses) {
    const tableBody = document.querySelector('#coursesTableBody');
    courses.forEach(course => {
        const tr = document.createElement('tr');
        const idTd = document.createElement('td');
        const nameTd = document.createElement('td');
        const valueTd = document.createElement('td');

        idTd.textContent = course.id;
        nameTd.textContent = course.name;
        valueTd.textContent = 'R$ ' + course.value.toFixed(2).replace('.',',');
        
        const elements = [ idTd, nameTd, valueTd ];
        elements.forEach(element => {
            element.classList = 'text-center align-middle';
            tr.appendChild(element);
        })
        tr.appendChild(getOptions(course));
        tableBody.appendChild(tr);
    });
}