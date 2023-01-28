function getOptions(student) {
    const optionsTd = document.createElement('td');
    const updateBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    deleteBtn.classList = 'btn btn-danger';
    deleteBtn.textContent = 'Excluir';
    deleteBtn.setAttribute('data-bs-toggle', "modal");
    deleteBtn.setAttribute('data-bs-target', "#deleteStudentConfirmation");
    deleteBtn.addEventListener('click', () => {
        const { id } = userDeleteForm.elements;
        id.value = student.id;
    });

    updateBtn.classList = 'btn btn-success';
    updateBtn.textContent = 'Editar';
    updateBtn.setAttribute('data-bs-toggle', "modal");
    updateBtn.setAttribute('data-bs-target', "#newStudent");

    updateBtn.addEventListener('click', () => {
        const { name, id } = newUserForm.elements;
        name.value = student.name;
        id.value = student.id;
    });

    optionsTd.appendChild(updateBtn);
    optionsTd.appendChild(deleteBtn);
    optionsTd.classList = 'd-flex flex-column flex-md-row justify-content-center gap-2';
    return optionsTd;
}

export default function fillStudentsTable(students) {
    const tableBody = document.querySelector('#studentsTableBody');
    students.forEach(student => {
        const tr = document.createElement('tr');
        const idTd = document.createElement('td');
        const studentTd = document.createElement('td');

        idTd.textContent = student.id;
        studentTd.textContent = student.name;
        
        const elements = [ idTd, studentTd ];
        elements.forEach(element => {
            element.classList = 'text-center align-middle';
            tr.appendChild(element);
        });
        tr.appendChild(getOptions(student));
        tableBody.appendChild(tr);
    });
}