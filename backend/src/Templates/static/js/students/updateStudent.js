import Students from '../Models/Students.js';

export default function updateStudent(id, body) {
    Students.update(id, body)
    .then(statusCode => {
        if(statusCode === 200) window.location = '/alunos?updated=1';
        else if(statusCode === 500) window.location = '/alunos?internalError=1';
    });
}