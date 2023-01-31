import React, { useEffect, useState } from 'react';
import { Form, Card as BsCard } from 'react-bootstrap';

import styles from './home.module.css';
import { Enrollments } from '../../Models';
import { Alert, Spinner, Divider } from '../../Components';
import { minutesToHours, weekdays } from '../../utils';

export default function Home() {
    const [ classes, setClasses ] = useState([]);
    const [ loading, setLoading ] = useState(false );
    const [ alert, setAlert ] = useState({ show: false });
    const [ chosenDay, setChosenDay ] = useState(new Date().getDay());

    function displayClassTimeSpan(data) {
        const days = data.classDays.split(',');
        const times = data.classTime.split(',');
        const durations = data.duration.split(',');
        const todayIndex = days.indexOf(chosenDay.toString());
        const todayClassTime = days.length === times.length ? parseInt(times[todayIndex]) : parseInt(times[0]);
        const todayClassDuration = days.length === times.length ? parseInt(durations[todayIndex]) : parseInt(durations[0]);        
        return minutesToHours(todayClassTime) + ' - ' + minutesToHours(todayClassTime + todayClassDuration);
    }

    async function getAllClasses() {
        const alert = {};
        setLoading(true);
        try {
            let response = await Enrollments.getAll();
            response = response.data.filter(datum => datum.classDays.search(chosenDay.toString()) !== -1);
            setClasses(response);
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

    useEffect(() => {
        getAllClasses();
    }, [ chosenDay ])
    
    return (
        <>
            <Alert
                alert={ alert }
                setAlert={ setAlert }
            />

            <h1 className={ styles['title'] }>Aulas do dia</h1>

            <Form>
                <Form.Label as={"h3"}>Lista de todas as aulas para</Form.Label>
                <Form.Select value={ chosenDay.toString() } onChange={ (e) => setChosenDay(e.target.value) }>
                    {
                        weekdays.map((day, index) => (
                            <option key={ index } value={ index } className="text-capitalize">{ day }</option>
                            ))
                        }
                </Form.Select>
            </Form>

            <Divider/>

            {
                loading ?
                <Spinner show={ loading } /> :
                classes.length === 0 ?
                <h4>Não há aulas para { weekdays[chosenDay] }.</h4> :
                classes.map(data => 
                    <BsCard key={ data.id } className={ `container-sm ${styles['card']}` }>
                        <BsCard.Body className="d-flex justify-content-between align-items-center">
                            <div>
                                <BsCard.Title>{ data.students.name }</BsCard.Title>
                                <BsCard.Text>{ data.course.name } ({ data.isOnline ? 'Online' : 'Presencial' })</BsCard.Text>
                            </div>
                            <BsCard.Subtitle className="text-muted">{ displayClassTimeSpan(data) }</BsCard.Subtitle>
                        </BsCard.Body>
                    </BsCard>
                )
                
            }
        </>
    );
}