import styles from './PDFTemplate.module.css';
import { displayClassTimeSpan, weekdays } from '../../utils';

export default function PDFTemplate({ enrollments }) {
    return (
        <section id="timeTable">
        {
            enrollments.map(enrollment => (
                enrollment.classes.length === 0 ?
                null :
                <article key={ enrollment.day } className="mb-3 py-2">
                    <h3 className='text-center text-capitalize'>{ weekdays[enrollment.day] }</h3>
                    {
                        enrollment.classes.map(c => (
                            <div key={ c.id } className={`${ styles['timeTable-text'] } d-flex justify-content-between align-items-items p-2`}>
                                <p className='m-0'>{ c.students.name } ({ c.isOnline ? 'Online' : 'Presencial' })</p>
                                <p className='m-0'>{ displayClassTimeSpan(c, enrollment.day) }</p>
                            </div>
                        ))
                    }
                </article>
            ))
        }
        </section>
    )
}