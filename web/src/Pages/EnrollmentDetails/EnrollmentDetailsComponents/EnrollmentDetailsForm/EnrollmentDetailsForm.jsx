import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { BsCheck, BsX } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import styles from './EnrollmentDetailsForm.module.css';
import { Enrollments, Errors } from '../../../../Models';
import { Alert, Button, Spinner } from '../../../../Components';
import { hoursToMinutes, minutesToHours, classDaysCheckBoxes, getCheckedDays, closeAlertTimeout } from '../../../../utils';

function setInitialClassDays(dataClassDays) {
    const classDaysArray = dataClassDays.split(',').map(day => parseInt(day));
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

function getNextBillingDate(billingDay) {
    /**
     * Calculates next Billing Date. 
     */
    const formatStr = (x) => x < 10 ? '0'+x : x;
    const today = new Date();
    if(today.getDate() > parseInt(billingDay)) today.setMonth(today.getMonth()+1);
    
    today.setDate(billingDay);
    return `${formatStr(today.getDate())}/${formatStr(today.getMonth()+1)}/${today.getFullYear()}`;
}

const { FormInputError } = Errors;

export default function NewEnrollmentForm({ data, update, setUpdate }) {
    const navigate = useNavigate();
    const [ showSpinner, setShowSpinner ] = useState(false);
    const [ formAlert, setFormAlert ] = useState({ show: false });
    const [ classTime, setClassTime ] = useState(data.classTime.split(','));
    const [ classDuration, setClassDuration ] = useState(data.duration.split(','));
    const [ classDays, setClassDays ] = useState(setInitialClassDays(data.classDays));
    const [ isOnline, setIsOnline ] = useState(Number(data.isOnline));
    const [ billingDay, setBillingDay ] = useState(data.billingDay);
    const [ discount, setDiscount ] = useState(data.discount);

    async function deleteEnrollment() {
        const alert = { show: true };
        setShowSpinner(true);
        try {
            await Enrollments.delete(data.id);
            navigate('/matriculas', { replace: true, state: { deleted: true } });            
        } catch (error) {
            alert.variant = error.response.status === 404 ? 'warning' : 'danger';
            alert.message = error.response.status === 404 ? 'Matrícula não existe.' : 'Um erro ocorreu.';
        }
        finally {
            setShowSpinner(false);
        }
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
        const tmp = classDays.map(day => { return {...day} });
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
        if(!classTime || classTime < '08:00' || classTime > '20:00') throw new FormInputError('Escolha um horário válido para a aula acontecer. De 08hr às 20hr.');
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
        setShowSpinner(true);
        try {
            validateForm();
            if(!showSpinner) {
                await Enrollments.update(
                    data.id,
                    {
                    studentId: data.studentId,
                    courseId: data.courseId,
                    classDays: getCheckedDays(classDays),
                    classTime: classTime,
                    billingDay: billingDay,
                    discount: discount || 0,
                    isOnline: isOnline,
                    duration: hoursToMinutes(classDuration.split(':'))
                    }
                );
                alert.variant = 'success';
                alert.message = 'Matrícula alterada com sucesso.';
                setUpdate(false);
            }            
        } catch (error) {
            alert.variant = 'danger';
            alert.message = 'Um erro ocorreu durante a operação.';
        }
        finally {
            setFormAlert(alert);
            setShowSpinner(false);
            closeAlertTimeout(setFormAlert, 5000);
        }
    }

    return (
        <Form>
            { !formAlert ? null : <Alert alert={ formAlert } setAlert={ setFormAlert } /> }

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
            
            <Form.Group as="section"  className='row mb-3'>
                <div className="col-12 col-md-4 mb-3">
                    <Form.Label>Horário</Form.Label>
                    <Form.Control 
                        className={`${!update ? styles['disabled'] : null}`}
                        type="time"
                        onChange={(e) => setClassTime(e.target.value)}
                        value={ classTime }
                        required
                        disabled={ !update }
                    />
                </div>
                
                <div className="col-12 col-md-4 mb-3">
                    <Form.Label>Duração</Form.Label>
                    <Form.Control
                        className={`${!update ? styles['disabled'] : null}`}
                        type="time" 
                        onChange={(e) => setClassDuration(e.target.value)}
                        value={ classDuration }
                        required
                        disabled={ !update }
                    />
                </div>

                <div className="col-12 col-md-4">
                    <Form.Label>Ambiente</Form.Label>
                    <FormSelect
                        disabled={ !update }
                        value={ isOnline }
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

                <div className="col-12 col-md-6">
                    <div className="d-flex justify-content-between gap-2">
                        <div as="div" className="mb-3">
                            <Form.Label>Desconto (%)</Form.Label>
                            <Form.Control
                                className={`${!update ? styles['disabled'] : null}`}
                                type="number" 
                                min="0"
                                max="100"
                                onChange={(e) => { setDiscount(parseInt(e.target.value)) }}
                                value={ discount.toString() }
                                required
                                disabled={ !update }
                            />
                        </div>

                        <div as="div" className="mb-3">
                            <Form.Label>Valor total(R$)</Form.Label>
                            <Form.Control
                                className={ styles['disabled'] }
                                value={ (data.course.value*(1 - data.discount/100)).toString() }
                                required
                                disabled
                            />
                        </div>
                    </div>

                    <div as="section" className="mb-3">
                        {
                            update ?
                            <>
                                <Form.Label>Dia da fatura</Form.Label>
                                <FormSelect
                                    disabled={ false }
                                    value={ billingDay }
                                    data={Array.from(Array(31), (_, i) => ({ id: i+1, name: i+1 }))}
                                    defaultOptionText="Escolha o melhor dia para a cobrança"
                                    onChangeFn={(e) => setBillingDay(e.target.value)}
                                    />
                            </>
                            :
                            <>
                                <Form.Label>Data da fatura</Form.Label>
                                <Form.Control
                                    disabled
                                    className={ styles['disabled'] }
                                    value={ getNextBillingDate(billingDay) }
                                />
                            </>
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
                    onClickFn={ () => update ? setUpdate(false) : deleteEnrollment() }
                />
            </Form.Group>
        </Form>
    );
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