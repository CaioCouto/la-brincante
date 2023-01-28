import { Alert as BsAlert } from 'react-bootstrap';
import { BsFillXCircleFill, BsFillCheckCircleFill, BsExclamationTriangleFill } from 'react-icons/bs';


export default function Alert({ alert, setAlert }) {
    const alertIconSize = 23;
    const alertIconComponent = {
        'success': <BsFillCheckCircleFill size={ alertIconSize } />,
        'danger': <BsFillXCircleFill size={ alertIconSize } />,
        'warning': <BsExclamationTriangleFill size={ alertIconSize } />,
    }
    
    if(!alert.show) return null;
    return (
        <BsAlert 
            className='d-flex align-items-center gap-3 fs-5'
            variant={ alert.variant }
            onClose={ () => setAlert({ show: false }) }
            dismissible
        >
            { alertIconComponent[alert.variant] }
            { alert.message }
        </BsAlert>
    );
}