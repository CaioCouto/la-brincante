import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { BsCheck, BsX } from 'react-icons/bs';

import { Alert, Button } from '../../Components';
import { hoursToMinutes, minutesToHours, getCheckedDays } from '../../utils';
import { Enrollments, Courses, Students, Errors } from '../../Models';

function modeExists(mode) {
    return ['read','update'].indexOf(mode) !== -1
}

function setInitialClassDays(mode, dataClassDays) {
    const classDaysArray = dataClassDays.split(',').map(day => parseInt(day));
    const classDaysCheckBoxes = [
        {
            label: 'segunda',
            checked: false
        },
        {
            label: 'terça',
            checked: false
        },
        {
            label: 'quarta',
            checked: false
        },
        {
            label: 'quinta',
            checked: false
        },
        {
            label: 'sexta',
            checked: false
        },
        {
            label: 'sábado',
            checked: false
        },
    ];
    if(modeExists(mode)) return classDaysCheckBoxes;
    return classDaysCheckBoxes.map((day, index) => {
        for(const classDay of classDaysArray) {
            if (index === classDay) day.checked = true;
        }
        return day;
    });
}

const { FormInputError } = Errors;
const classDaysCheckBoxes = [
    {
        label: 'segunda',
        checked: false
    },
    {
        label: 'terça',
        checked: false
    },
    {
        label: 'quarta',
        checked: false
    },
    {
        label: 'quinta',
        checked: false
    },
    {
        label: 'sexta',
        checked: false
    },
    {
        label: 'sábado',
        checked: false
    },
];

export default function EnrollmentForm({ handleCloseModal, setAlert, mode, data }) {
    const [ formAlert, setFormAlert ] = useState({ show: false });
    const [ students, setStudents ] = useState([]);
    const [ courses, setCourses ] = useState([]);
    const [ studentId, setStudentId ] = useState(modeExists(mode) ? data.studentId : 0);
    const [ courseId, setCourseId ] = useState(modeExists(mode) ? data.courseId : 0);
    const [ classTime, setClassTime ] = useState(modeExists(mode) ? data.classTime : '');
    const [ classDuration, setClassDuration ] = useState(modeExists(mode) ? minutesToHours(data.classDuration) : '');
    const [ classDays, setClassDays ] = useState(setInitialClassDays(mode, data.classDays));
    const [ isOnline, setIsOnline ] = useState(modeExists(mode) ? data.isOnline : -1);
    const [ billingDay, setBillingDay ] = useState(modeExists(mode) ? data.billingDay : '');
    const [ discount, setDiscount ] = useState(modeExists(mode) ? data.discount : 0);

    async function loadAllStudents() {
        /**
         * Reads all students registered
         * in the Database.
         */
        const response = await Students.getAll();
        setStudents(response.data);
    }

    async function loadAllCourses() {
        /**
         * Reads all courses registered
         * in the Database.
         */
        const response = await Courses.getAll();
        setCourses(response.data);
    }

    function handleClassDayCheck(e) {
        /**
         * Handle the value change on the selecting
         * of the checkboxes.
         * 
         * Since HTMl does not accept and element id 
         * to be equal 0, it is necessary to add 1. 
         * Hence the subtraction by 1 on the *boxId* variable. 
         */
        const tmp = [...classDaysCheckBoxes];
        const boxId = e.target.id - 1;
        tmp[boxId].checked = !tmp[boxId].checked;
        setClassDays(tmp);
    }

    function validateForm() {
        /**
         * Validates all fields in the form. If any of the 
         * following is not valid, a self-defined exception is thown.
         * 
         *  - *studentId nor CourseId* should be less or equal 0;
         *  - *classTime* must not be an empty string nor be sooner than 08hr nor greater than 20hr (a.k.a 8pm).
         *  - *classDuration* must not be an empty string.
         *  - *isOnline* must be 1 (in person) or 0 (online).
         *  - *number_of_checked_days* must not be 0.
         *  - *billingDay* must not be before the today's date.
         */
        const number_of_checked_days = getCheckedDays(classDays).length;
        if(studentId <= 0 || courseId <= 0) throw new FormInputError('Escolha um aluno e/ou um curso válidos para continuar.');
        else if(!classTime || classTime < '08:00' || classTime > '20:00') throw new FormInputError('Escolha um horário válido para a aula acontecer. De 08hr às 20hr.');
        else if(!classDuration || classDuration === '00:00') throw new FormInputError('A aula não pode acabar instantaneamente. Digite uma duração válida.');
        else if(isOnline !== 0 && isOnline !== 1) throw new FormInputError('Escolha um ambiente válido.');
        else if(number_of_checked_days === 0) throw new FormInputError('Selecione ao menos um dia de aula.');
        else if(discount < 0 || discount > 100) throw new FormInputError('Digite um valor de desconto válido.');
        else if(parseInt(billingDay) <= 0) throw new FormInputError('Selecione um dia válido para cobrança.');
    }

    async function submit () {
        /**
         * Handle the form data submition.
         * Showing alerts in cases of successes
         * and (potential) failures.
         */
        let alert = { show: true };
        try {
            validateForm();
            await Enrollments.create({
                studentId: studentId,
                courseId: courseId,
                classDays: getCheckedDays(classDays),
                classTime: classTime,
                billingDay: billingDay,
                discount: discount,
                isOnline: isOnline,
                duration: hoursToMinutes(classDuration.split(':'))
            });
            alert.variant = 'success';
            alert.message = 'Curso cadastrado com sucesso.';
        } catch (error) {
            if(error.response){
                alert.variant = error.response.status === 400 ? 'warning' : 'danger';
                alert.message = error.response.status === 400 ? 'Este curso já existe.' : 'Um erro ocorreu durante a operação.';
            }
            else {
                alert.variant = 'danger';
                alert.message = error.message;
            }
        }
        finally {
            if(alert.variant === 'success') {
                setAlert(alert);
                handleCloseModal(false);
            }
            else {
                setFormAlert(alert);
            }
        }
    }

    useEffect(() => {
        loadAllStudents();
        loadAllCourses();
    }, [])

    return (
        <Form>
            { !formAlert ? null : <Alert alert={ formAlert } setAlert={ setFormAlert } /> }

            <Form.Group as="section"  className='row mb-3'>
                <div className='col-12 col-md-6 mb-3'>
                    <Form.Label>Aluno</Form.Label>
                    <FormSelect
                        value={ studentId }
                        defaultOptionText="Escolha um aluno"
                        data={ students }
                        onChangeFn={ (e) => setStudentId(parseInt(e.target.value)) }
                        isDisabled={ modeExists(mode) }
                    />
                </div>
                
                <div className='col-12 col-md-6 mb-3'>
                    <Form.Label>Curso</Form.Label>
                    <FormSelect
                        value={ courseId }
                        defaultOptionText="Escolha um curso"
                        data={ courses }
                        onChangeFn={ (e) => setCourseId(parseInt(e.target.value)) }
                        isDisabled={ modeExists(mode) }
                    />
                </div>
            </Form.Group>
            
            <Form.Group as="section"  className='mb-3 row'>
                <article className="col-12 col-md-4 mb-3">
                    <Form.Label>Horário</Form.Label>
                    <Form.Control 
                        type="time"
                        onChange={(e) => setClassTime(e.target.value)}
                        value={ classTime }
                        required
                    />
                </article>
                
                <article className="col-12 col-md-4 mb-3">
                    <Form.Label>Duração</Form.Label>
                    <Form.Control
                        type="time" 
                        onChange={(e) => setClassDuration(e.target.value)}
                        value={ classDuration }
                        required
                    />
                </article>

                <article className="col-12 col-md-4 mb-3">
                    <Form.Label>Ambiente</Form.Label>
                    <FormSelect
                        defaultOptionText="Escolha o ambiente"
                        data={[
                            {
                                id: 1,
                                name: 'Presencial',
                            },
                            {
                                id: 0,
                                name: 'Online',
                            },
                        ]}
                        onChangeFn={ (e) => setIsOnline(parseInt(e.target.value))}
                    />
                </article>
            </Form.Group>

            <Form.Group as="section"  className='row mb-3'>
                <article className="col-12 col-md-6">
                    <Form.Label>Dias das aulas</Form.Label>
                    <div className="d-flex flex-wrap">
                        {
                            classDays.map((day, index) => (
                                <Form.Check
                                    key={ index }
                                    className='text-capitalize col-6'
                                    type='checkbox'
                                    checked={ day.checked }
                                    id={ index+1 }
                                    label={ day.label }
                                    onChange={ (e) => handleClassDayCheck(e) }
                                />
                            ))
                        }
                    </div>
                </article>

                <article className="col-12 col-md-6">
                    <div as="div" className="mb-3">
                        <Form.Label>Desconto (%)</Form.Label>
                        <Form.Control
                            type="number" 
                            min="0"
                            max="100"
                            onChange={(e) => setDiscount(e.target.value)}
                            value={ discount }
                            required
                        />
                    </div>

                    <div as="section" className="mb-3">
                        <Form.Label>Dia da fatura</Form.Label>
                        <FormSelect
                            data={Array.from(Array(30), (_, i) => ({ id: i+1, name: i+1 }))}
                            defaultOptionText="Escolha o melhor dia para a cobrança"
                            onChangeFn={(e) => setBillingDay(e.target.value)}
                        />
                    </div>
                </article>
            </Form.Group>
             
            <Form.Group as="section" className='d-flex align-items-center justify-content-end gap-2'>
                <Button
                    variant='success'
                    label='Salvar'
                    Icon={ <BsCheck size={ 23 }/> }
                    onClickFn={ () => submit() }
                />
                <Button 
                    variant='danger'
                    label='Cancelar'
                    Icon={ <BsX size={ 23 }/> }
                    onClickFn={ () => handleCloseModal(false) }
                />
            </Form.Group>
        </Form>
    );
}

function FormSelect({ defaultOptionText, data, onChangeFn, value, isDisabled }) {
    return (
        <Form.Select
            style={{ backgroundColor: "e5e5e5" }}
            onChange={ onChangeFn } 
            value={ value } 
            disabled={ isDisabled }>
            <option value="-1">{ defaultOptionText }</option>
            {
                data.map(datum => (
                    <option key={ datum.id } value={ datum.id }>{ datum.name }</option>
                ))
            }
        </Form.Select>
    )
}