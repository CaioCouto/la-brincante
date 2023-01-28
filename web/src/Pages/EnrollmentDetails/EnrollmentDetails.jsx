import React, { useEffect, useState } from 'react';
import { BsArrowReturnLeft } from 'react-icons/bs';

import { Alert, Button } from '../../Components';
import { Enrollments as EnrollmentsModel} from '../../Models';
import { EnrollmentDetailsForm } from './EnrollmentDetailsComponents';

export default function EnrollmentDetails() {
    const [ enrollment, setEnrollment ] = useState({});    
    const [ update, setUpdate ] = useState(false);
    const [ alert, setAlert ] = useState({ show: false });

    async function getEnrollment() {
        const enrollmentId = location.pathname.split('/').pop();
        const response = await EnrollmentsModel.getOne(enrollmentId);
        setEnrollment(response.data);
    }

    useEffect(() => { getEnrollment(); }, [ update ]);

    console.log(enrollment);

    return (
        <>
            <h1>RA { `${enrollment.id}`.padStart(7, '0') }</h1>

            <Alert
                alert={ alert }
                setAlert={ setAlert }
            />
            
            <section className='d-flex justify-content-between'>
                <Button
                    label="Voltar"
                    variant="info"
                    Icon={ <BsArrowReturnLeft size={ 23 }/> }
                    onClickFn={ () => location.pathname = '/matriculas' }
                />
            </section>

            {
                Object.keys(enrollment).length === 0 ?
                null:
                <EnrollmentDetailsForm
                    data={ enrollment }
                    update={ update }
                    setUpdate={ setUpdate }
                />
            }
        </>
    );
}