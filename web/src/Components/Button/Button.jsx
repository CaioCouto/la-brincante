import { Button as BsButton } from 'react-bootstrap';

import styles from './button.module.css';

export default function Button({ label, variant='info', Icon, onClickFn }) {
    const classNames = {
        'success': styles['successBtn'],
        'danger': styles['dangerBtn'],
        'info': styles['infoBtn'],
    }
    return (
        <BsButton 
            className={ `d-flex align-items-center gap-2 ${classNames[variant] || ''}`}
            onClick={ onClickFn }
        >
            { Icon }
            <p className='m-0'>{ label }</p>
        </BsButton>
    );
}