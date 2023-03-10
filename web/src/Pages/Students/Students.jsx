import React, { useEffect, useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import { BsX, BsPlus } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';

import { closeAlertTimeout } from '../../utils';
import { Students as StdModel } from '../../Models';
import { NewStudentForm } from './StudentComponents';
import { Alert, Button, Divider, Modal, Spinner } from '../../Components';

export default function Students() {
    const navigate = useNavigate();
    const location = useLocation();
    const [ showSpinner, setShowSpinner ] = useState(false);
    const [ showModal, setShowModal ] = useState(false);
    const [ alert, setAlert ] = useState({ show: false });
    const [ students, setStudents ] = useState([]);
    const [ studentName, setStudentName ] = useState('');
    const [ studentsFound, setStudentsFound ] = useState([]);

    async function getAllStudents() {
        const alert = {};
        setShowSpinner(true);
        try {
            const response = await StdModel.getAll();
            setStudents(response.data);
        } catch (error) {
            alert.show = true;
            alert.variant = error.response.status === 404 ? 'warning' : 'danger'; 
            alert.message = error.response.status === 404 ? 'Curso não existente.' : 'Um erro ocorreu durante a operação.'; 
        }
        finally {
            setShowSpinner(false);
            closeAlertTimeout(setAlert, 5000);
        }
    }

    function checkDeletedEnrollent() {
        const deleted = location.state;
        if (deleted) {
            setAlert({
                show: true,
                variant: 'success',
                message: 'Registro de aluno deletado com sucesso!'
            });
            closeAlertTimeout(setAlert, 5000);
        }
    }

    function filterStudents() {
        setStudentsFound([]);
        for(const std of students) {
            const nameExists = std.name.toLowerCase().search(studentName.toLowerCase()) !== -1;
            if(nameExists) {
                setStudentsFound(previous => ([
                    ...previous,
                    std
                ]));
            }
        }
    }

    useEffect(() => { 
        checkDeletedEnrollent()
        getAllStudents() 
    }, [ showModal ]);
    useEffect(() => { filterStudents() }, [ studentName ]);

    return (
        <>
            <h1>Alunos</h1>

            <Alert
                alert={ alert }
                setAlert={ setAlert }
            />
            
            <section className='d-flex gap-2'>
                <Button
                    label='Novo Aluno'
                    variant="info"
                    Icon={ <BsPlus size={ 23 }/> }
                    onClickFn={ () => { setShowModal(true) } }
                />
                <Modal
                    title='Cadastrar Aluno'
                    show={ showModal }
                    setShow={ setShowModal }
                    setAlert={ setAlert }
                    BodyComponent={ NewStudentForm }
                />
                <Spinner show={ showSpinner } />
            </section>
                  
            <Form className="d-flex align-items-center">
                <Form.Control
                    type="search"
                    placeholder="Buscar aluno"
                    className="p-2 h-100"
                    aria-label="Search"
                    onChange={ (e) => setStudentName(e.target.value) }
                    value={ studentName }
                />
            </Form>

            <Divider/>

            {
                students.length === 0 ?
                <p>Não há alunos cadastrados.</p> :
                <StudentsTable
                    data={ !studentName ? students : studentsFound }
                    navigate={ navigate }
                />
            }
        </>
    );
}

function StudentsTable({ data, navigate }) {
    return (
        data.length === 0 ?
        null:
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th className='text-center'>Nome</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map(student => (
                        <tr key={ student.id }>
                            <td className='text-capitalize text-center align-middle'>{ student.name }</td>
                            <td className='d-flex flex-column flex-md-row justify-content-center align-items-center gap-2'>
                                <Button
                                    variant='info'
                                    label="Detalhes"
                                    onClickFn={ () => navigate(`${student.id}`)  }
                                />
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
}