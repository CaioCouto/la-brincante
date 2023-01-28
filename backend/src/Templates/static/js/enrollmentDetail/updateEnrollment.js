import Enrollments from "../Models/Enrollments.js";

export default function updateEnrollment(id, body) {
    Enrollments.update(id, body)
    .then(statusCode => {
        if(statusCode === 200) window.location = window.location.pathname+'?success=1';
        else if(statusCode === 500) window.location = window.location.pathname+'?internalError=1';
    }); 
}