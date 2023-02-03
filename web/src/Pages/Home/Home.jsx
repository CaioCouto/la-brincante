import React, { useEffect, useState } from 'react';
import { Form, Card as BsCard } from 'react-bootstrap';
import { renderToStaticMarkup } from 'react-dom/server';

import styles from './home.module.css';
import { Enrollments } from '../../Models';
import { Alert, Spinner, Divider, Button, PDFTemplate } from '../../Components';
import { weekdays, sortClassesByClassTime, displayClassTimeSpan, generatePDF } from '../../utils';

function groupEnrollmentsByClassDay(data) {
    /**
     * @param Array<enrollment>: data
     * @returns Array<Object{day:int, classes:enrollment[]}>
     * 
     * Retorna um array de objetos, os quais
     * contém dois atributos: "day", que guarda
     * índice do dia da semana; e "classes", um
     * array contendo todas as aulas daquele dia
     * em específico.
     */
    return weekdays.map((_, index) => {
        const classes = data.filter(d => d.classDays.indexOf(index.toString()) !== -1);
        if (classes.length > 1) { sortClassesByClassTime(classes, index.toString()) };
        return { day: index, classes: classes };
    });
}

function ClassCards({ enrollments, today }) {
    return (
        <>
        {
            enrollments[today].classes.map(data => 
                <BsCard key={ data.id } className={ `container-sm ${styles['card']}` }>
                    <BsCard.Body className="d-flex justify-content-between align-items-center">
                        <div>
                            <BsCard.Title>{ data.students.name }</BsCard.Title>
                            <BsCard.Text>{ data.course.name } ({ data.isOnline ? 'Online' : 'Presencial' })</BsCard.Text>
                        </div>
                        <BsCard.Subtitle className="text-muted">{ displayClassTimeSpan(data, today) }</BsCard.Subtitle>
                    </BsCard.Body>
                </BsCard>
            )
        }
        </>
    );
}

export default function Home() {
    const [ enrollments, setEnrollments ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ alert, setAlert ] = useState({ show: false });
    const [ chosenDay, setChosenDay ] = useState(new Date().getDay().toString());

    async function getAllClasses() {
        const alert = {};
        setLoading(true);
        try {
            const responseEnrollments = await Enrollments.getAll();
            const groupedEnrollments = groupEnrollmentsByClassDay(responseEnrollments.data);
            setEnrollments(groupedEnrollments);
        } catch (error) {
            alert.show = true;
            alert.variant = 'danger';
            alert.message = 'Ocorreu um erro ao buscar as aulas.';
        }
        finally {
            setAlert(alert);
            setLoading(false);
        }
    }

    async function generateFullTimeTable() {
        setLoading(true)
        await generatePDF(renderToStaticMarkup(<PDFTemplate enrollments={ enrollments }/>));
        setLoading(false);
    }

    useEffect(() => { getAllClasses(); }, []);

    return (
        <>
            <Alert
                alert={ alert }
                setAlert={ setAlert }
            />

            <h1 className={ styles['title'] }>Aulas do dia</h1>

            <Form>
                <Form.Group as="section">
                    <article className='d-flex justify-content-between align-items-center mb-2'>
                        <Form.Label as={"h3"} className='m-0'>Lista de todas as aulas para</Form.Label>
                        <div className='d-flex gap-2'>
                            <Spinner show={ loading }/>
                            <Button
                                label="Ver horário completo"
                                variant="info"
                                onClickFn={ () => generateFullTimeTable()}
                            />
                        </div>
                    </article>
                    <Form.Select value={ chosenDay.toString() } onChange={ (e) => setChosenDay(e.target.value) }>
                        {
                            weekdays.map((day, index) => (
                                <option key={ index } value={ index } className="text-capitalize">{ day }</option>
                                ))
                            }
                    </Form.Select>
                </Form.Group>
            </Form>

            <Divider/>

            {
                (!enrollments[chosenDay] || enrollments[chosenDay].classes.length === 0) ?
                <h4>Não há aulas para { weekdays[chosenDay] }.</h4> :
                <ClassCards 
                    enrollments={ enrollments }
                    today={ chosenDay }
                />               
            }
        </>
    );
}