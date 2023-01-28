import React, { useEffect, useState } from 'react';
import { Form, Table } from 'react-bootstrap';

import styles from './home.module.css';
import { Enrollments } from '../../Models';
import { Alert, Spinner, Card, Divider } from '../../Components';
import { minutesToHours, weekdays } from '../../utils';

export default function Home() {
    const [ chosenDay, setChosenDay ] = useState(new Date().getDay() - 1);
    const [ loading, setLoading ] = useState({ show: false });
    const [ alert, setAlert ] = useState({ show: false });
    const [ classes, setClasses ] = useState([]);

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
                classes.map(data => <Card key={ data.id } data={ data } className={ styles['card'] }/>)
                
            }
        </>
    );
}