import { Errors } from "../../Models";

const { FormInputError } = Errors;

function validateStudentName(name) {
    /**
     * Student's *name* must have at least 3 letters;
     */
    if(name.length < 3) throw new FormInputError('Digite um nome válido para continuar.');
}

function validateStudentId(student) {
    /**
     * *studentId* should be less or equal 0;
     */
    if(student <= 0) throw new FormInputError('Escolha um aluno válido para continuar.');
}

function validateCourseName(name) {
    /**
     * Course's *name* must have at least 3 letters;
     */
    if(name.length < 3) throw new FormInputError('Escolha um nome válido para continuar.');
}

function validateCourseId(course) {
    /**
     * *courseId* should be less or equal 0;
     */
    if(course <= 0) throw new FormInputError('Escolha um curso válido para continuar.');
}

function validateClassTimes(classTimes) {
    /**
     * Each classTime value is a number that represents,
     * in minutes, a certain time (ex: 1hr = 60 min). 
     * In this case, each *classTime value* must be 
     *      - an integer bigger than 0;
     *      - bigger than or equal to 480 (08 am);
     *      - Smaller than or equal to 1200 (20hr or 8 pm).
     */
    const minutesInACertainHour = (hour) => 60 * hour;  
    classTimes.forEach(time => {
        if(!time || time < minutesInACertainHour(8) || time > minutesInACertainHour(20)) 
            throw new FormInputError('Escolha um horário válido para a aula acontecer. De 08hr às 20hr.');
    });
}

function validateClassDuration(classDurations) {
    /**
     * Like classTimes, Each classDuration value 
     * is a number that represents, in minutes, 
     * a certain time (ex: 1hr = 60 min). 
     * In this case, each *classDuration value* must be 
     *      - an integer bigger than 0;
     */
    classDurations.forEach(time => {
        if(!time || time <= 0) 
            throw new FormInputError('A aula não pode acabar instantaneamente. Digite uma duração válida.');
    });
}

function validateEnviroment(isOnline) {
    /**
     * The classes can only be
     *      - Online (0)  
     *      - In class (1)
     * Anuthing diferent will be
     * invalidated.
     */
    if(isOnline !== 0 && isOnline !== 1) throw new FormInputError('Escolha um ambiente válido.');
}

function validateClassDays(classDays) {
    /**
     * classDays is an array that contains
     * the index of each checkbox that was
     * checked in the form. To be validated
     * the *length* of this array must be
     * bigger than 0 
     */
    if(classDays.length === 0) throw new FormInputError('Selecione ao menos um dia de aula.');
}

function validateDiscount(discount) {
    /**
     * discount must be a value inside
     * the following interval: [0, 100]
     * (from 0 to 100). Anything different
     * will be invalidated.  
     */
    if(!discount || discount < '0' || discount > '100') throw new FormInputError('Digite um valor de desconto válido.');
}

function validateBillingDay(billingDay) {
    /**
     * billingDay must be bigger than 0.
     * Since there are negative days nor a
     * "day 0" (this is not a pandemic).  
     */
    if(!billingDay || parseInt(billingDay) <= 0) throw new FormInputError('Selecione um dia válido para cobrança.');
}

export default {
    validateStudentName,
    validateStudentId,
    validateCourseName,
    validateCourseId,
    validateClassTimes,
    validateClassDuration,
    validateEnviroment,
    validateClassDays,
    validateDiscount,
    validateBillingDay,
};