import { Spinner as BsSpinner } from 'react-bootstrap';


export default function Spinner({ show }) {    
    if(!show) return null;
    return (
        <BsSpinner animation='border' variant="success"/>
    );
}