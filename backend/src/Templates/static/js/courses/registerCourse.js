import Courses from '../Models/Courses.js';

export default function registerCourse(body) {
    Courses.register(body)
    .then(statusCode => {
        if(statusCode === 200) window.location = '/cursos?register=1';
        else if(statusCode === 500) window.location = '/cursos?internalError=1';
    });
}