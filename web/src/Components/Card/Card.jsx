import { Card as BsCard } from 'react-bootstrap';
import { minutesToHours } from '../../utils';

export default function Card({ data, className, today }) {

    function displayClassTimeSpan() {
        const days = data.classDays.split(',');
        const times = data.classTime.split(',');
        const durations = data.duration.split(',');
        const todayIndex = days.indexOf(today.toString());
        const todayClassTime = days.length === times.length ? parseInt(times[todayIndex]) : parseInt(times[0]);
        const todayClassDuration = days.length === times.length ? parseInt(durations[todayIndex]) : parseInt(durations[0]);        
        return minutesToHours(todayClassTime) + ' - ' + minutesToHours(todayClassTime + todayClassDuration);
    }

    return (
        <BsCard className={ `container-sm ${className}` }>
            <BsCard.Body className="d-flex justify-content-between align-items-center">
                <div>
                    <BsCard.Title>{ data.students.name }</BsCard.Title>
                    <BsCard.Text>{ data.course.name } ({ data.isOnline ? 'Online' : 'Presencial' })</BsCard.Text>
                </div>
                <BsCard.Subtitle className="text-muted">{ displayClassTimeSpan() }</BsCard.Subtitle>
            </BsCard.Body>
        </BsCard>
    );
}