import React, { useEffect, useState } from 'react';
import { Card, Form, InputGroup } from 'react-bootstrap';
import { BsArrowReturnLeft, BsCheck, BsX } from 'react-icons/bs';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import styles from './StudentDetails.module.css';
import { Students} from '../../Models';
import { Alert, Button, Spinner } from '../../Components';
import { closeAlertTimeout, minutesToHours, weekdays } from '../../utils';

function calculateTotalMonthyValue(enrollments) {
    if (enrollments.length === 0) return 0;
    const moreThanOneDayOfClass = enrollments.length === 2 || enrollments[0].classDays.split(',').length === 2;
    if (moreThanOneDayOfClass) { return import.meta.env.VITE_BASE_MONTHLY_FULL_VALUE; }
    return import.meta.env.VITE_BASE_MONTHLY_DISCOUNT_VALUE;
}

function displayPeriods(enrollment, index) {
    const times = enrollment.classTime.split(',');
    const todayClassTime = times[index] ? parseInt(times[index]) : parseInt(times[0]);
    return minutesToHours(todayClassTime)
}

export default function StudentDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const [ student, setStudent ] = useState({});
    const [ studentName, setStudentName ] = useState('');
    const [ update, setUpdate ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ alert, setAlert ] = useState({ show: false });

    async function getStudent() {
        let alert = { show: true, variant: 'danger' };
        try {
            const response = await Students.getById(id);
            setStudentName(response.data.name)
            setStudent(response.data);
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
        try {
            await Students.update(student.id, studentName);
            alert.variant = 'success';
            alert.message = 'As informações do aluno atualizado com sucesso.';
            setUpdate(false)
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
        try {
            await Students.delete(student.id);
            navigate('/alunos', { replace: true, state: { deleted: true } });
        } catch (error) {
            alert.variant = 'danger';
            alert.message = 'Um erro ocorreu ao excluir o aluno.';
            setAlert(alert);
            closeAlertTimeout(setAlert, 5000);
        }
    }

    function cancelUpdate() {
        setStudentName(student.name);
        setUpdate(false);
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

        {
            Object.keys(student).length === 0 ?
            <Spinner show={ true }/> :
            <>
                <section className='d-flex justify-content-between align-items-center'>
                    <h1>Detalhes do Aluno</h1>
                </section>
                
                <Form className='row'>
                    <Form.Group as="section" className='col-12 col-md-6 mb-3'>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control 
                            className={`text-capitalize ${update ? null : styles['disabled']}`}
                            onChange={(e) => setStudentName(e.target.value)}
                            value={ studentName }
                            disabled={ !update }
                        />
                    </Form.Group>
                    <Form.Group as="section" className='col-12 col-md-6 mb-3'>
                        <Form.Label>Total a pagar</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>R$</InputGroup.Text>
                            <Form.Control 
                                className={`text-capitalize ${styles['disabled']}`}
                                onChange={(e) => console.log(e.target.value)}
                                value={ calculateTotalMonthyValue(student.enrollments) }
                                disabled
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as="section" className='d-flex align-items-center justify-content-end gap-2'>
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
                            onClickFn={ () => !update ? deleteStudent() : cancelUpdate() }
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