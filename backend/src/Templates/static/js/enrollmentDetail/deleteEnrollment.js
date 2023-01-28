import Enrollments from "../Models/Enrollments.js";

export default function deleteEnrollment(id) {
    Enrollments.delete(id)
    .then(resp => {
        if(resp === 200) window.location = '/matriculas?deleted=1';
        else if(resp === 500) window.location = window.location.pathname+'?internalError=1';
    });
}