import Courses from '../Models/Courses.js';

export default function updateCourse(id, body) {
    Courses.update(id, body)
    .then(statusCode => {
        if(statusCode === 200) window.location = '/cursos?updated=1';
        else if(statusCode === 500) window.location = '/cursos?internalError=1';
    });
}