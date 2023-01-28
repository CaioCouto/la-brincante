import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { Form, Table as BsTable } from 'react-bootstrap';

import styles from './enrollments.module.css';
import { weekdays } from '../../utils';
import { Alert, Button, Divider, Modal } from '../../Components';
import { NewEnrollmentForm } from './EnrollmentsComponents';
import { Enrollments as EnrollmentsModel} from '../../Models';

export default function Enrollments() {
    const location = useLocation();
    const [ showModal, setShowModal ] = useState(false);
    const [ alert, setAlert ] = useState({ show: false });
    const [ enrollments, setEnrollments ] = useState([]);
    const [ studentName, setStudentName ] = useState('');
    const [ enrollmentsFound, setEnrollmentsFound ] = useState([]);

    function checkDeletedEnrollent() {
        const deleted = location.state;
        if (deleted) {
            setAlert({
                show: true,
                variant: 'success',
                message: 'Matrícula deletada com sucesso'
            });
        }
    }

    async function getAllEnrollments() {
        const response = await EnrollmentsModel.getAll();
        setEnrollments(response.data);
    }

    function filterEnrollments() {
        setEnrollmentsFound([]);
        for(const enrollment of enrollments) {
            const nameExists = enrollment.students.name.toLowerCase().search(studentName.toLowerCase()) !== -1;
            if(nameExists) {
                setEnrollmentsFound(previous => ([
                    ...previous,
                    enrollment
                ]));
            }
        }
    }

    useEffect(() => { 
        getAllEnrollments();
        checkDeletedEnrollent(); 
    }, [ showModal ]);
    useEffect(() => { filterEnrollments() }, [ studentName ]);

    return (
        <>
            <h1>Matrículas</h1>

            <Alert
                alert={ alert }
                setAlert={ setAlert }
            />
            
            <section>
                <Button
                    label='Nova Matrícula'
                    variant='info'
                    Icon={ <BsPlus size={ 23 }/> }
                    onClickFn={ () => { setShowModal(true) } }
                />
                <Modal
                    title='Cadastro de Matrícula'
                    show={ showModal }
                    setShow={ setShowModal }
                    setAlert={ setAlert }
                    BodyComponent={ NewEnrollmentForm }
                />
            </section>

                  
            <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Buscar por aluno"
                    className="me-2"
                    aria-label="Search"
                    onChange={ (e) => setStudentName(e.target.value) }
                    value={ studentName }
                />
            </Form>

            <Divider/>

            {
                enrollments.length === 0 ?
                <h3>Não há matrículas cadastradas.</h3> :
                <EnrollmentsTable 
                    data={ !studentName ? enrollments : enrollmentsFound } 
                />
            }
        </>
    );
}

function EnrollmentsTable({ data }) {
    const getDaysStr = (classDay) => classDay.split(',').map(day => weekdays[parseInt(day)]).join(', ')
    return (
        data.length === 0 ?
        <h3>Não há registros cadastrados ainda.</h3> :
        <BsTable striped bordered>
            <thead>
                <tr>
                    <th className='d-none d-md-table-cell text-center align-middle'>Id</th>
                    <th className='text-center align-middle'>Aluno</th>
                    <th className='text-center align-middle'>Curso</th>
                    <th className='d-none d-md-table-cell text-center align-middle'>Dias da Semana</th>
                    <th className='d-none d-md-table-cell text-center align-middle'>Horário</th>
                    <th className='text-center align-middle'></th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map(datum => (
                        <tr key={ datum.id }>
                            <td className='d-none d-md-table-cell text-capitalize text-center align-middle'>{ datum.id }</td>
                            <td className='text-capitalize text-center align-middle'>{ datum.students.name }</td>
                            <td className='text-capitalize text-center align-middle'>{ datum.course.name }</td>
                            <td className='d-none d-md-table-cell text-capitalize text-center align-middle'>{ getDaysStr(datum.classDays) }</td>
                            <td className='d-none d-md-table-cell text-capitalize text-center align-middle'>{ datum.classTime }</td>
                            <td className='d-flex justify-content-center align-items-center'>
                                <Button
                                    label='Ver detalhes'
                                    variant='info'
                                    onClickFn={ () => location.pathname = `/matriculas/${datum.id}` }
                                />
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </BsTable>
    );
}