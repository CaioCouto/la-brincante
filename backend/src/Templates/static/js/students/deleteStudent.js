import Students from '../Models/Students.js';

export default function deleteStudent(id) {
    Students.delete(id)
    .then(statusCode => {
        if(statusCode === 200) window.location = '/alunos?deleted=1';
        if(statusCode === 404) window.location = '/alunos?notFound=1';
        else if(statusCode === 500) window.location = '/alunos?internalError=1';
    });
}