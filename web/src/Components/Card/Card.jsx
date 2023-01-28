import { Card as BsCard } from 'react-bootstrap';
import { displayClassTimeSpan } from '../../utils';

export default function Card({ data, className }) {

    return (
        <BsCard className={ `container-sm ${className}` }>
            <BsCard.Body className="d-flex justify-content-between align-items-center">
                <div>
                    <BsCard.Title>{ data.students.name }</BsCard.Title>
                    <BsCard.Text>{ data.course.name } ({ data.isOnline ? 'Online' : 'Presencial' })</BsCard.Text>
                </div>
                <BsCard.Subtitle className="text-muted">{ displayClassTimeSpan(data.classTime, data.duration ) }</BsCard.Subtitle>
            </BsCard.Body>
        </BsCard>
    );
}