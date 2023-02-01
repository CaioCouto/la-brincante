import React, { useEffect, useState } from 'react';
import { BsArrowReturnLeft } from 'react-icons/bs';

import { Alert, Button, Spinner } from '../../Components';
import { Enrollments as EnrollmentsModel} from '../../Models';
import { EnrollmentDetailsForm } from './EnrollmentDetailsComponents';
import { useNavigate } from 'react-router-dom';

export default function EnrollmentDetails() {
    const navigate = useNavigate();
    const [ enrollment, setEnrollment ] = useState({});    
    const [ update, setUpdate ] = useState(false);
    const [ alert, setAlert ] = useState({ show: false });

    async function getEnrollment() {
        const enrollmentId = location.pathname.split('/').pop();
        const response = await EnrollmentsModel.getOne(enrollmentId);
        setEnrollment(response.data);
    }

    useEffect(() => { getEnrollment(); }, [ update ]);

    return (
        <>
            <Button
                label="Voltar"
                variant="info"
                Icon={ <BsArrowReturnLeft size={ 23 }/> }
                onClickFn={ () => navigate(-1) }
            />

            <Alert
                alert={ alert }
                setAlert={ setAlert }
            />

            {
                Object.keys(enrollment).length === 0 ?
                <Spinner show={ true }/> :
                <>
                    <h1>Matrícula nº { `${enrollment.id}` }</h1>
                    <EnrollmentDetailsForm
                        data={ enrollment }
                        update={ update }
                        setUpdate={ setUpdate }
                    />
                </>
            }
        </>
    );
}