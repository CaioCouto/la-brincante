import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { BsCheck, BsX } from 'react-icons/bs';

import validateForm from './formValidation';    
import { Alert, Button, Spinner } from '../../../../Components';
import { Enrollments, Courses, Students } from '../../../../Models';
import { classDaysCheckBoxes, getCheckedDays, hoursToMinutes } from '../../../../utils';

function FormSelect({ defaultOptionText, data, onChangeFn }) {
    return (
        <Form.Select onChange={ onChangeFn }>
            <option value="-1">{ defaultOptionText }</option>
            {
                data.map(datum => (
                    <option key={ datum.id } value={ datum.id }>{ datum.name }</option>
                ))
            }
        </Form.Select>
    )
}

function TimeInput({ label, value, onChangeFn }) {
    return (
        <div className="col-12 col-md-6 mb-3">
            <Form.Label>{ label }</Form.Label>
            <Form.Control 
                type="time"
                onChange={ onChangeFn }
                value={ value }
                required
            />
        </div>
    )
}

export default function NewEnrollmentForm({ handleCloseModal, setAlert }) {
    const [ showSpinner, setShowSpinner ] = useState(false);
    const [ formAlert, setFormAlert ] = useState({ show: false });
    const [ students, setStudents ] = useState([]);
    const [ courses, setCourses ] = useState([]);
    const [ studentId, setStudentId ] = useState(0);
    const [ courseId, setCourseId ] = useState(0);
    const [ classTimes, setClassTimes ] = useState(['']);
    const [ classDuration, setClassDuration ] = useState(['']);
    const [ classDays, setClassDays ] = useState(classDaysCheckBoxes);
    const [ isOnline, setIsOnline ] = useState(-1);
    const [ billingDay, setBillingDay ] = useState('');
    const [ discount, setDiscount ] = useState(0);
    const [ numberOfclassTimeAndDurationInputs, setNumberOfClassTimeAndDurationInputs] = useState(1);

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

    function handleClassTimeChange(time, index, remove=false) {
        const tmp = classTimes.map(t => t)
        if (remove) { tmp.pop() } 
        else { tmp[index] = time }
        
        setClassTimes(tmp)
    }
    
    function handleClassDurationChange(time, index, remove=false) {
        const tmp = classDuration.map(t => t)
        if (remove) { tmp.pop() } 
        else { tmp[index] = time }
        setClassDuration(tmp)
    }

    function addClasstimeAndDurationInputs() {
        /**
         * Aumenta a quantidade de vezes que os
         * inputs de classTime e duration serão
         * repetidos. Insere uma nova string vazia 
         * na última posição de ambos os arrays.
         * Ambos os arrays sempre possuirão o mesmo
         * tamanho.
         */
        const newIndex = classTimes.length;
        setNumberOfClassTimeAndDurationInputs(previous => previous+1);
        handleClassTimeChange('', newIndex);
        handleClassDurationChange('', newIndex);
    }
    
    function removeClasstimeAndDurationInputs() {
        /**
         * Diminui a quantidade de vezes que os
         * inputs de classTime e duration serão
         * repetidos. Remove o valor da última
         * posição de ambos os arrays.
         * Ambos os arrays sempre possuirão o mesmo
         * tamanho.
         */
        setNumberOfClassTimeAndDurationInputs(previous => previous-1);
        handleClassTimeChange('', '', true);
        handleClassDurationChange('', '', true);
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

    async function submit () {
        /**
         * Handle the form data submition.
         * Showing alerts in cases of successes
         * and (potential) failures.
         */
        const checkedClassDays = getCheckedDays(classDays);
        const classTimesInMinutes = classTimes.map(time => hoursToMinutes(time.split(':')));
        const classDurationsInMinutes = classDuration.map(time => hoursToMinutes(time.split(':')));
        let alert = { show: true };
        setShowSpinner(true);

        try {
            validateForm({
                studentId: studentId,
                courseId: courseId,
                classDays: checkedClassDays,
                classTimes: classTimesInMinutes,
                billingDay: billingDay,
                discount: discount,
                isOnline: isOnline,
                duration: classDurationsInMinutes
            });
            if(!showSpinner) {
                await Enrollments.create({
                    studentId: studentId,
                    courseId: courseId,
                    classDays: checkedClassDays.join(','),
                    classTime: classTimesInMinutes.join(','),
                    billingDay: billingDay,
                    discount: discount,
                    isOnline: isOnline,
                    duration: classDurationsInMinutes.join(',')
                });
                alert.variant = 'success';
                alert.message = 'Curso cadastrado com sucesso.';
            }
        } catch (error) {
            if(error.response){
                alert.variant = error.response.status === 400 ? 'warning' : 'danger';
                alert.message = error.response.status === 400 ? 'Esta matrícula já existe.' : 'Um erro ocorreu durante a operação.';
            }
            else {
                alert.variant = 'danger';
                alert.message = error.message;
            }
        }
        finally {
            setShowSpinner(false);
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
                        defaultOptionText="Escolha um aluno"
                        data={ students }
                        onChangeFn={ (e) => setStudentId(parseInt(e.target.value)) }
                    />
                </div>
                
                <div className='col-12 col-md-6'>
                    <Form.Label>Curso</Form.Label>
                    <FormSelect
                        defaultOptionText="Escolha um curso"
                        data={ courses }
                        onChangeFn={ (e) => setCourseId(parseInt(e.target.value)) }
                    />
                </div>
            </Form.Group>
            
            <Form.Group as="section"  className='row mb-3'>
                {
                    Array(numberOfclassTimeAndDurationInputs).fill(0).map((n, index) => (        
                        <div key={ index }>
                            <TimeInput
                                label={ `Horário${numberOfclassTimeAndDurationInputs > 1 ? ' '+(index+1) : ''}` }
                                onChangeFn={(e) => handleClassTimeChange(e.target.value, index)}
                                value={ classTimes[index] || '' }
                            />
                            <TimeInput
                                label={ `Duração${numberOfclassTimeAndDurationInputs > 1 ? ' '+(index+1) : ''}` }
                                onChangeFn={(e) => handleClassDurationChange(e.target.value, index)}
                                value={ classDuration[index] || '' }
                            />
                        </div>
                    ))
                }

                <div className='d-flex justify-content-between'>
                    <Button
                        label="Adicionar horário"
                        onClickFn={ () => addClasstimeAndDurationInputs() }
                    />
                    {
                        numberOfclassTimeAndDurationInputs > 1 ?
                        <Button
                            label="Remover horário"
                            variant='danger'
                            onClickFn={ () => removeClasstimeAndDurationInputs()}
                        />
                        : null
                    }
                </div>
            </Form.Group>

            <Form.Group as="section"  className='row mb-3'>
                <article className="col-12 col-md-6">
                    <div className="mb-3">
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
                    </div>

                    <div className="mb-3">
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
                    </div>
                </article>

                <article className="col-12 col-md-6 d-flex flex-column justify-content-between">
                    <div as="div" className="mb-3">
                        <Form.Label>Desconto (%)</Form.Label>
                        <Form.Control
                            type="number" 
                            min="0"
                            max="100"
                            onChange={(e) => setDiscount(parseInt(e.target.value))}
                            value={ discount }
                            required
                        />
                    </div>

                    <div as="section" className="mb-3">
                        <Form.Label>Dia da fatura</Form.Label>
                        <FormSelect
                            data={Array.from(Array(31), (_, i) => ({ id: i+1, name: i+1 }))}
                            defaultOptionText="Escolha o melhor dia para a cobrança"
                            onChangeFn={(e) => setBillingDay(e.target.value)}
                        />
                    </div>
                </article>
            </Form.Group>
             
            <Form.Group as="section" className='d-flex align-items-center justify-content-end gap-2'>
                <Spinner show={ showSpinner }/>
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