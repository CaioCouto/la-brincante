import minutesToHours from '../minutesToHours.js';
import fillFormClassDay from '../fillFormClassDay.js';

function updatedBillingDate(billingDate) {
    const today = new Date(Date.now());
    const month = today.getMonth() < 10 ? '0'+today.getMonth() : today.getMonth();
    const date = (billingDate.getDate()+1) < 10 ? `0${billingDate.getDate()+1}` : billingDate.getDate()+1;
    return `${today.getFullYear()}-${month}-${date}`;
    
}

function calculateTotalValue(value, discount) {
    return (value - value * discount / 100)
        .toFixed(2)
        .replace('.',',');
}

export default function fillEnrollmentInformation(enrollment) {
    const form = document.querySelector('#enrollmentDetails');
    const { 
        id, enviroment, student, 
        studentName, course, courseName, 
        discount, value, billingDate, 
        classTime, minutesLong
    } = form.elements;
    
    id.value = enrollment.id;
    enviroment.value = Number(enrollment.isOnline);
    student.value = enrollment.studentId;
    studentName.value = enrollment.students.name;
    course.value = enrollment.courseId;
    courseName.value = enrollment.course.name;
    discount.value = enrollment.discount;
    value.value = calculateTotalValue(enrollment.course.value, enrollment.discount);
    billingDate.value = updatedBillingDate(new Date(enrollment.billingDate));
    classTime.value = enrollment.classTime;
    minutesLong.value = minutesToHours(enrollment.minutesLong);
    fillFormClassDay(enrollment.classDays);
};