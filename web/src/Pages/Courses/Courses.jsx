import React, { useEffect, useState } from 'react';
import { Form, Table} from 'react-bootstrap';
import { BsX, BsPlus } from 'react-icons/bs';
import { Alert, Button, Divider, Modal, Spinner } from '../../Components';

import styles from './courses.module.css';
import { Courses as CoursesModel} from '../../Models';
import { NewCourseForm } from './CoursesComponents';
import { closeAlertTimeout } from '../../utils';

export default function Courses() {
    const [ showSpinner, setSpinner ] = useState(false);
    const [ showModal, setShowModal ] = useState(false);
    const [ alert, setAlert ] = useState({ show: false });
    const [ courses, setCourses ] = useState([]);
    const [ CourseName, setCourseName ] = useState('');
    const [ coursesFound, setCoursesFound ] = useState([]);

    async function getAllCourses() {
        const alert = {};
        setSpinner(true);
        try {
            const response = await CoursesModel.getAll();
            setCourses(response.data);
        } catch (error) {
            alert.show = true;
            alert.variant = error.response.status === 404 ? 'warning' : 'danger'; 
            alert.message = error.response.status === 404 ? 'Curso não existente.' : 'Um erro ocorreu durante a operação.'; 
        }
        finally {
            setSpinner(false);
        }
    }
    
    async function deleteCourse(id) {
        const alert = { show: true };
        setSpinner(true);
        try {
            await CoursesModel.delete(id);
            alert.variant = 'success';
            alert.message = 'Curso deletado com sucesso.';
        } catch (error) {
            alert.variant = error.response.status === 404 ? 'warning' : 'danger';
            alert.message = error.response.status === 404 ? 'Curso não existe.' : 'Um Erro ocorreu durante a operação.';
        }
        finally {
            setAlert(alert);
            setSpinner(false);
            closeAlertTimeout(setAlert, 5000);
        }
    }

    function filterCourses() {
        setCoursesFound([]);
        for(const course of courses) {
            const nameExists = course.name.toLowerCase().search(CourseName.toLowerCase()) !== -1;
            if(nameExists) {
                setCoursesFound(previous => ([
                    ...previous,
                    course
                ]));
            }
        }
    }

    useEffect(() => { getAllCourses() }, [ alert ]);
    useEffect(() => { filterCourses() }, [ CourseName ]);

    return (
        <>
            <h1>Cursos</h1>

            <Alert
                alert={ alert }
                setAlert={ setAlert }
            />
            
            <section className='d-flex gap-2 align-items-center'>
                <Button
                    label='Novo Curso'
                    variant="info"
                    Icon={ <BsPlus size={ 23 }/> }
                    onClickFn={ () => { setShowModal(true) } }
                />
                <Modal
                    title='Cadastrar Curso'
                    show={ showModal }
                    setShow={ setShowModal }
                    setAlert={ setAlert }
                    BodyComponent={ NewCourseForm }
                />
                <Spinner show={ showSpinner } />
            </section>

                  
            <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Buscar curso"
                    className="me-2"
                    aria-label="Search"
                    onChange={ (e) => setCourseName(e.target.value) }
                    value={ CourseName }
                />
            </Form>

            <Divider/>

            {
                courses.length === 0 ?
                <h3>Não há cursos cadastrados.</h3> :
                <CoursesTable 
                    data={ !CourseName ? courses : coursesFound }
                    deleteCourse={ deleteCourse }
                />
            }
        </>
    );
}

function CoursesTable({ data, deleteCourse }) {
    return (
        data.length === 0 ?
        null :
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th className='text-center'>Id</th>
                    <th className='text-center'>Curso</th>
                    <th className='text-center'>Valor</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map(datum => (
                        <tr key={ datum.id }>
                            <td className='text-capitalize text-center align-middle'>{ datum.id }</td>
                            <td className='text-capitalize text-center align-middle'>{ datum.name }</td>
                            <td className='text-capitalize text-center align-middle'>R$ { datum.value }</td>
                            <td className='d-flex flex-column flex-md-row justify-content-center align-items-center gap-2'>
                                <Button
                                    variant="danger"
                                    label="Deletar"
                                    Icon={ <BsX size={ 23 }/> }
                                    onClickFn={ () => deleteCourse(datum.id)  }
                                />
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
}