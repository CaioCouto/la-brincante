/** 
 * @param {Object} data -- objeto contendo os dados da matrícula.
 * @param {Boolean} update -- boolean que controla o formulário e seus componentes.
 * @param {Function} setUpdate -- atualizado o estado de update.
 */

import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { BsCheck, BsX } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import styles from './EnrollmentDetailsForm.module.css';
import { Enrollments } from '../../../../Models';
import { Alert, Button, Spinner, TimeInput } from '../../../../Components';
import { hoursToMinutes,
    minutesToHours,
    classDaysCheckBoxes,
    getCheckedDays,
    closeAlertTimeout,
    validateForm,
    weekdays 
} from '../../../../utils';

function setInitialClassDays(dataClassDays) {
    const classDaysArray = dataClassDays.split(',').map(day => parseInt(day)-1);
    return classDaysCheckBoxes.map((day, index) => {
        for(const classDay of classDaysArray) {
            if (index === classDay) {
                day.checked = true;
                break;
            }
        }
        return day;
    });
}

function FormSelect({ defaultOptionText, data, onChangeFn, value, disabled }) {
    return (
        <Form.Select
            className={`${disabled ? styles['disabled'] : null}`} 
            onChange={ onChangeFn } 
            value={ value } 
            disabled={ disabled }>
            <option value="-1">{ defaultOptionText }</option>
            {
                data.map(datum => (
                    <option key={ datum.id } value={ datum.id }>{ datum.name }</option>
                ))
            }
        </Form.Select>
    )
}

const { 
    validateStudent,
    validateCourse,
    validateClassDays,
    validateClassTimes,
    validateClassDuration,
    validateEnviroment
} = validateForm;

export default function NewEnrollmentForm({ data, update, setUpdate }) {
    const minutesStrIntoHoursArray = (timeStr) => timeStr.split(',').map(time => minutesToHours(parseInt(time)));
    const navigate = useNavigate();
    const [ showSpinner, setShowSpinner ] = useState(false);
    const [ alert, setAlert ] = useState({ show: false });
    const [ classTime, setClassTime ] = useState(minutesStrIntoHoursArray(data.classTime));
    const [ classDuration, setClassDuration ] = useState(minutesStrIntoHoursArray(data.duration));
    const [ classDays, setClassDays ] = useState(setInitialClassDays(data.classDays));
    const [ isOnline, setIsOnline ] = useState(Number(data.isOnline));

    function handleClassDayCheck(e) {
        /**
         * Handle the value change on the selecting
         * of the checkboxes.
         * 
         * Since HTMl does not accept and element id 
         * to be equal 0, it is necessary to add 1. 
         * Hence the subtraction by 1 on the *boxId* variable. 
         */
        const tmp = classDays.map(day => { return {...day} });
        const boxId = e.target.id - 1;
        tmp[boxId].checked = !tmp[boxId].checked;
        setClassDays(tmp);
    }

    function handleClassTimeChange(time, index, remove=false) {
        const tmp = classTime.map(t => t)
        if (remove) { tmp.pop() } 
        else { tmp[index] = time }
        
        setClassTime(tmp)
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
        const newIndex = classTime.length;
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
        handleClassTimeChange('', '', true);
        handleClassDurationChange('', '', true);
    }

    function cancelUpdate() {
        /**
         * Reinicia todos os estados para
         * os seus valores iniciais.
         */
        setClassTime(minutesStrIntoHoursArray(data.classTime));
        setClassDuration(minutesStrIntoHoursArray(data.duration));
        setClassDays(setInitialClassDays(data.classDays));
        setIsOnline(Number(data.isOnline));
        setUpdate(false);
    }

    async function deleteEnrollment() {
        const alert = { show: true };
        setShowSpinner(true);
        try {
            if(!showSpinner) {
                await Enrollments.delete(data.id);
                navigate('/matriculas', { replace: true, state: { deleted: true } });
            }
        } catch (error) {
            if (error.response) {
                alert.variant = error.response.status === 404 ? 'warning' : 'danger';
                alert.message = error.response.status === 404 ? 'Matrícula não existe.' : 'Um erro ocorreu.';
            }
            setAlert(alert);
        }
        finally {
            setShowSpinner(false);
        }
    }

    async function submit() {
        /**
         * Handle the form data submition.
         * Showing alerts in cases of successes
         * and (potential) failures.
         */
        let alert = { show: true };
        const checkedClassDays = getCheckedDays(classDays);
        const classTimesInMinutes = classTime.map(time => hoursToMinutes(time.split(':')));
        const classDurationsInMinutes = classDuration.map(time => hoursToMinutes(time.split(':')));
        setShowSpinner(true);

        try {
            validateEnviroment(isOnline);
            validateCourse(data.courseId);
            validateStudent(data.studentId);
            validateClassDays(checkedClassDays);
            validateClassTimes(classTimesInMinutes);
            validateClassDuration(classDurationsInMinutes);

            if(!showSpinner) {
                await Enrollments.update(
                    data.id,
                    {
                        studentId: data.studentId,
                        courseId: data.courseId,
                        classDays: checkedClassDays.join(','),
                        classTime: classTimesInMinutes.join(','),
                        isOnline: isOnline,
                        duration: classDurationsInMinutes.join(',')
                    }
                );
                alert.variant = 'success';
                alert.message = 'Matrícula alterada com sucesso.';
                setUpdate(false);
            }            
        } catch (error) {
            alert.variant = 'danger';
            if(error.response){ alert.message = 'Um erro ocorreu durante a operação.'; }
            else { alert.message = error.message; }
        }
        finally {
            setAlert(alert);
            setShowSpinner(false);
            closeAlertTimeout(setAlert, 5000);
        }
    }

    return (
        <Form>
            { !alert ? null : <Alert alert={ alert } setAlert={ setAlert } /> }

            <Form.Group as="section"  className='row mb-3'>
                <div className='col-12 col-md-6 mb-3'>
                    <Form.Label>Aluno</Form.Label>
                    <Form.Control 
                        className={`text-capitalize ${styles['disabled']}`}
                        onChange={(e) => setClassTime(e.target.value)}
                        value={ data.students.name }
                        disabled
                    />
                </div>
                
                <div className='col-12 col-md-6'>
                    <Form.Label>Curso</Form.Label>
                    <Form.Control 
                        className={`text-capitalize ${styles['disabled']}`}
                        onChange={(e) => setClassTime(e.target.value)}
                        value={ data.course.name }
                        disabled
                    />
                </div>
            </Form.Group>
            
            <Form.Group as="section"  className='row'>
                {
                    Array(classTime.length).fill(0).map((n, index) => {
                        const str = `(${weekdays[parseInt(data.classDays.split(',')[index])]})`
                        return (
                            <div key={ index } className='d-flex flex-column flex-sm-row justify-content-between gap-1 mb-3'>
                                <TimeInput
                                    label={ `Horário${classTime.length > 1 ? ' '+(str) : ''}` }
                                    className={`${!update ? styles['disabled'] : null}`}
                                    value={ classTime[index] || '' }
                                    onChangeFn={(e) => handleClassTimeChange(e.target.value, index)}
                                    disabled={ !update }
                                />
                                <TimeInput
                                    label={ `Duração${classTime.length > 1 ? ' '+(str) : ''}` }
                                    className={`${!update ? styles['disabled'] : null}`}
                                    value={ classDuration[index] || '' }
                                    onChangeFn={(e) => handleClassDurationChange(e.target.value, index)}
                                    disabled={ !update }
                                />
                            </div>
                        )
                    })
                }

                {
                    !update ?
                    null :
                    <div className='d-flex justify-content-end gap-2'>
                        <Button
                            label="Adicionar horário"
                            onClickFn={ () => addClasstimeAndDurationInputs() }
                        />
                        {
                            classTime.length > 1 ?
                            <Button
                                label="Remover horário"
                                variant='danger'
                                onClickFn={ () => removeClasstimeAndDurationInputs()}
                            />
                            : null
                        }
                    </div>
                }
            </Form.Group>

            <Form.Group as="section"  className='row mb-3'>
                <div className="col-12">
                    <Form.Label>Ambiente</Form.Label>
                    <FormSelect
                        disabled={ !update }
                        value={ isOnline }
                        defaultOptionText="Escolha o ambiente"
                        data={[
                            {
                                id: 0,
                                name: 'Presencial',
                            },
                            {
                                id: 1,
                                name: 'Online',
                            },
                        ]}
                        onChangeFn={ (e) => setIsOnline(parseInt(e.target.value))}
                    />
                </div>
            </Form.Group>

            <Form.Group as="section"  className='row mb-3'>
                <div className="col-12 col-md-6 mb-3">
                    <Form.Label>Dias das aulas</Form.Label>
                    <div className="d-flex flex-wrap">
                        {
                            classDays.map((day, index) => (
                                <Form.Check
                                    key={ index }
                                    className='text-capitalize col-6'
                                    type='checkbox'
                                    checked={ day.checked }
                                    id={ index + 1  }
                                    label={ day.label }
                                    onChange={ (e) => handleClassDayCheck(e) }
                                    disabled={ !update }
                                />
                            ))
                        }
                    </div>
                </div>
            </Form.Group>

            <Form.Group as="section" className='d-flex align-items-center justify-content-end gap-2'>
                <Spinner show={ showSpinner } />
                <Button
                    variant="success"
                    label={!update ? 'Editar' : 'Salvar'}
                    Icon={ !update ? null : <BsCheck size={ 23 }/> }
                    onClickFn={ () => !update ? setUpdate(true) : submit()  }
                />
                <Button
                    variant="danger"
                    label={!update ? 'Excluir' : 'Cancelar'}
                    Icon={ !update ? null : <BsX size={ 23 }/> }
                    onClickFn={ () => update ? cancelUpdate() : deleteEnrollment() }
                />
            </Form.Group>
        </Form>
    );
}