import React, { useEffect, useState } from 'react';
import { Card, Form, InputGroup } from 'react-bootstrap';
import { BsArrowReturnLeft, BsCheck, BsX } from 'react-icons/bs';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import styles from './StudentDetails.module.css';
import { Students} from '../../Models';
import { Alert, Button, ConfirmDeleteModal, Spinner } from '../../Components';
import { closeAlertTimeout, minutesToHours, weekdays } from '../../utils';

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

function calculateTotalMonthyValue(enrollments, studentDiscount) {
    if (enrollments.length === 0) return 0;
    const finalValue = (x) => x * (1 - studentDiscount/100);
    const oneDayLongClass = enrollments.length === 1 && parseInt(enrollments[0].duration) > 60;
    const moreThanOneDayOfClass = enrollments.length === 2 || enrollments[0].classDays.split(',').length === 2;
    if (moreThanOneDayOfClass || oneDayLongClass) return finalValue(import.meta.env.VITE_BASE_MONTHLY_FULL_VALUE);
    return finalValue(import.meta.env.VITE_BASE_MONTHLY_DISCOUNT_VALUE);
}

function displayPeriods(enrollment, index) {
    const times = enrollment.classTime.split(',');
    const todayClassTime = times[index] ? parseInt(times[index]) : parseInt(times[0]);
    return minutesToHours(todayClassTime)
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

export default function StudentDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ student, setStudent ] = useState({});
    const [ studentName, setStudentName ] = useState('');
    const [ studentBillingDay, setStudentBillingDay ] = useState('');
    const [ studentDiscount, setStudentDiscount ] = useState(0);
    const [ update, setUpdate ] = useState(false);
    const [ showModal, setShowModal ] = useState(false);
    const [ showSpinner, setShowSpinner ] = useState(false);
    const [ alert, setAlert ] = useState({ show: false });

    function handleNameChange(inputName) {
        const name = inputName.replace(/([\d!@#$%¨&*(){}\[\]<>,.:;/?\\|+=*-+'"])/g, '').replace(/\s{2,}/g, ' ');
        setStudentName(name);
    }

    function cancelUpdate() {
        setStudentName(student.name);
        setUpdate(false);
    }

    async function getStudent() {
        let alert = { show: true, variant: 'danger' };
        try {
            const response = await Students.getById(id);
            setStudent(response.data);
            setStudentName(response.data.name)
            setStudentDiscount(response.data.discount)
            setStudentBillingDay(response.data.billingDay)
        } catch (error) {
            alert.message = error.response.status === 404 ? 'O aluno que você busca não existe. ' : 'Um erro ocorreu enquanto tentáva buscar as informações do aluno. ';
            alert.message += 'Você será redirecionado para a tela de Alunos.';
            setTimeout(() => {
                navigate('/alunos', { replace: true });
            }, 3000);
            setAlert(alert);
        }
    }

    async function updateStudent() {
        const alert = { show: true };
        setShowSpinner(true);
        try {
            await Students.update(
                student.id,
                {
                    name: studentName,
                    billingDay: studentBillingDay,
                    discount: parseInt(studentDiscount),
                }
            );
            alert.variant = 'success';
            alert.message = 'As informações do aluno atualizado com sucesso.';
            setUpdate(false);
            setShowSpinner(false);
            getStudent();
        } catch (error) {
            alert.variant = 'danger';
            alert.message = 'Um erro ocorreu ao atualizar o aluno.';
        } finally {
            setAlert(alert);
            closeAlertTimeout(setAlert, 5000);
        }
    }
    
    async function deleteStudent() {
        const alert = { show: true };
        setShowSpinner(true);
        try {
            await Students.delete(student.id);
            navigate('/alunos', { replace: true, state: { deleted: true } });
            setShowModal(false);
            setShowSpinner(false);
        } catch (error) {
            alert.variant = 'danger';
            alert.message = 'Um erro ocorreu ao excluir o aluno.';
            setAlert(alert);
            closeAlertTimeout(setAlert, 5000);
        }
    }

    useEffect(() => { getStudent(); }, []);

    return (
        <>
            <Button
                label="Voltar"
                variant="info"
                Icon={ <BsArrowReturnLeft size={ 23 }/> }
                onClickFn={ () => navigate(-1) }
            /> 

            <Alert
                alert={ alert }
                setAlert={ setAlert }
            />

            <ConfirmDeleteModal
                show={ showModal }
                setShow={ setShowModal }
                showSpinner={ showSpinner }
                id={ id }
                deleteFn={ deleteStudent }
            />

        {
            Object.keys(student).length === 0 ?
            <Spinner show={ true }/> :
            <>
                <section className='d-flex justify-content-between align-items-center'>
                    <h1>Detalhes do Aluno</h1>
                </section>
                
                <Form className='row'>
                    <Form.Group as="section" className='col-12 mb-3'>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control 
                            className={`text-capitalize ${update ? null : styles['disabled']}`}
                            onChange={(e) => handleNameChange(e.target.value)}
                            value={ studentName }
                            disabled={ !update }
                        />
                    </Form.Group>
                    <Form.Group as="section" className='col-12 col-md-6 mb-3'>
                        {
                            update ?
                            <>
                                <Form.Label>Dia da fatura</Form.Label>
                                <FormSelect
                                    disabled={ false }
                                    value={ studentBillingDay }
                                    data={Array.from(Array(31), (_, i) => ({ id: i+1, name: i+1 }))}
                                    defaultOptionText="Escolha o melhor dia para a cobrança"
                                    onChangeFn={(e) => setStudentBillingDay(e.target.value)}
                                />
                            </>
                            :
                            <>
                                <Form.Label>Data da fatura</Form.Label>
                                <Form.Control
                                    disabled
                                    className={ styles['disabled'] }
                                    value={ getNextBillingDate(student.billingDay) }
                                />
                            </>
                        }
                    </Form.Group>
                    <Form.Group as="section" className='col-12 col-md-6 mb-3'>
                        <Form.Label>Desconto</Form.Label>
                        <InputGroup>
                            <Form.Control 
                                className={`text-capitalize ${ !update ? styles['disabled'] : null}`}
                                value={ studentDiscount }
                                onChange={ (e) => setStudentDiscount(e.target.value) }
                                disabled = { !update }
                                />
                            <InputGroup.Text>%</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as="section" className='col-12 mb-3'>
                        <Form.Label>Total a pagar</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>R$</InputGroup.Text>
                            <Form.Control 
                                className={`text-capitalize ${styles['disabled']}`}
                                value={ calculateTotalMonthyValue(student.enrollments, student.discount) }
                                disabled
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as="section" className='d-flex align-items-center justify-content-end gap-2'>
                        <Spinner show={ showSpinner && !showModal }/>
                        <Button
                            label={ !update ? 'Editar' : 'Salvar' }
                            variant="success"
                            Icon={ !update ? null : <BsCheck size={ 23 }/> }
                            onClickFn={ () => !update ? setUpdate(true) : updateStudent() }
                            />
                        <Button
                            label={ !update ? 'Excluir' : 'Cancelar' }
                            variant="danger"
                            Icon={ !update ? null : <BsX size={ 23 }/> }
                            onClickFn={ () => !update ? setShowModal(true) : cancelUpdate() }
                        />
                    </Form.Group>
                </Form>

                <section>
                    <h3>Matrículas</h3>
                    <article className='d-flex flex-column flex-md-row gap-2'>
                        {
                            student.enrollments.length === 0 ?
                            <h4>Este aluno ainda não foi matriculado em nenhum curso.</h4> :
                            student.enrollments.map(enrollment => (
                                <Card key={ enrollment.id } className={ `p-3 ${styles['student--card']}` } onClick={ () => navigate(`/matriculas/${enrollment.id}`)}>
                                    <Card.Header>
                                        <Card.Title>{ enrollment.course.name } ({ enrollment.isOnline ? 'Online' : 'Presencial' })</Card.Title>
                                    </Card.Header>
                                    <Card.Body className=''>
                                        {
                                            enrollment.classDays.split(',').map((day, index) => (
                                                <div key={ index } className='d-flex justify-content-between'>
                                                    <Card.Text>{ weekdays[parseInt(day)] }</Card.Text>
                                                    <Card.Text>{ displayPeriods(enrollment, index) }</Card.Text>
                                                </div>
                                            ))
                                        }
                                    </Card.Body>
                                </Card>
                            ))
                        }
                    </article>
                </section>
            </>
        }
        </>
    );
}