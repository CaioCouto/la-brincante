import hoursToMinutes from '../hoursToMinutes.js';
import getCheckedClassDays from './getCheckedClassDays.js';

function isClassTimeWorkHour(classTime) {
    return classTime >= '08:00' && classTime <= '20:00';
}

function discountIsValid(discount) {
    let value = discount || 0;
    return value >= 0 && value <= 100;
}

export default function validateForm(elements) {
    const { student, course, classTime, billingDate, discount, enviroment, minutesLong } = elements;
    const classDays = getCheckedClassDays();
    let message;
    if (student.value === '-1' || course.value === '-1') message = 'Selecione um aluno e um curso válidos.';
    else if (!classDays) message = 'Selecione os dias de aula.';
    else if(!isClassTimeWorkHour(classTime.value)) message = 'O horário escolhido não está dentro do horário comercial.';
    else if(!discountIsValid(discount.value)) message = 'O valor de desconto não deve ser menor do que 0 e nem maior do que 100.';
    else if(!billingDate.value) message = 'Selecione uma data de cobrança válida.';
    else if(!minutesLong.value) message = 'Tempo de duração da aula inválido.';
    
    if(message) return { message: message }
    const body = {
        studentId: parseInt(student.value),
        courseId: parseInt(course.value),
        classDays: classDays,
        classTime: classTime.value,
        billingDate: new Date(billingDate.value),
        discount: parseInt(discount.value) || 0,
        isOnline: !!parseInt(enviroment.value),
        minutesLong: hoursToMinutes(minutesLong.value.split(':')),
    }
    return body;
}