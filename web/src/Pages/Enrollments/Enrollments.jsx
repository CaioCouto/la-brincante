import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { Form, Table as BsTable } from 'react-bootstrap';

import { weekdays, minutesToHours } from '../../utils';
import { Alert, Button, Divider } from '../../Components';
import { Enrollments as EnrollmentsModel} from '../../Models';

export default function Enrollments() {
    const location = useLocation();
    const navigate = useNavigate();
    const [ alert, setAlert ] = useState({ show: false });
    const [ enrollments, setEnrollments ] = useState([]);
    const [ studentName, setStudentName ] = useState('');
    const [ enrollmentsFound, setEnrollmentsFound ] = useState([]);
    
    function checkLocationState() {
        if(location.state) {
            const { deleted, created } = location.state;
            let alert = { show: true, variant: 'success' };
            if (deleted) { alert.message = 'Matrícula deletada com sucesso!'; }
            else if (created) { alert.message = 'Matrícula cadastrada com sucesso!'; }
            setAlert(alert);
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
        checkLocationState();
    }, []);
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
                    onClickFn={ () => navigate('/matriculas/registro') }
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
    const getDaysStr = (classDay) => classDay.split(',').map(day => weekdays[parseInt(day)]).join(', ');
    const getclassTimeStr = (classTimes) => classTimes.split(',').map(time => minutesToHours(parseInt(time))).join(', ');
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
                            <td className='d-none d-md-table-cell text-capitalize text-center align-middle'>{ getclassTimeStr(datum.classTime) }</td>
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