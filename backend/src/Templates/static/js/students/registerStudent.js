import Students from '../Models/Students.js';

export default function registerStudent(body) {
    Students.register(body)
    .then(statusCode => {
        if(statusCode === 200) window.location = '/alunos?register=1';
        else if(statusCode === 500) window.location = '/alunos?internalError=1';
    });
}