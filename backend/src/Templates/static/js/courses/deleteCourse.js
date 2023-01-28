import Courses from '../Models/Courses.js';

export default function deleteCourse(id) {
    Courses.delete(id)
    .then(statusCode => {
        if(statusCode === 200) window.location = '/cursos?deleted=1';
        if(statusCode === 404) window.location = '/cursos?notFound=1';
        else if(statusCode === 500) window.location = '/cursos?internalError=1';
    });
}