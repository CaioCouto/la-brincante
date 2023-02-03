import styles from './PDFTemplate.module.css';
import { displayClassTimeSpan, weekdays } from '../../utils';
import { Table } from 'react-bootstrap';
import React from 'react';

export default function PDFTemplate({ enrollments }) {
    return (
        <section className='d-flex flex-column align-items-center'>
        {
            enrollments.map((enrollment, i) => (
                enrollment.classes.length === 0 ?
                null :
                <React.Fragment key={ i }>
                    <h3 className={ `text-capitalize ${ styles['timeTable-title'] }` }>{ weekdays[enrollment.day] }</h3>
                    <Table className={ styles['timeTable-table'] }>
                        <tbody>
                        {
                            enrollment.classes.map((c, j) => (
                                <tr key={ j } className={`${ styles['timeTable-text'] }`}>
                                    <td className='p-0 py-2 text-center text-capitalize'>{ c.students.name }</td>
                                    <td className='p-0 py-2 text-center text-capitalize'>{ c.course.name }</td>
                                    <td className='p-0 py-2 text-center text-capitalize'>{ displayClassTimeSpan(c, enrollment.day) }</td>
                                    <td className='p-0 py-2 text-center text-capitalize'>{ c.isOnline ? 'Online' : 'Presencial' }</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </React.Fragment>
            ))
        }
        </section>
    )
}