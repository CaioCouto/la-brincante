import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { BsCheck, BsX } from 'react-icons/bs';

import { Students, Errors } from '../../../../Models';
import { closeAlertTimeout } from '../../../../utils';
import { Alert, Button, Spinner } from '../../../../Components';

export default function NewStudentForm({ handleCloseModal, setAlert }) {
    const [ name, setName ] = useState('');
    const [ showSpinner, setShowSpinner ] = useState(false);
    const [ formAlert, setFormAlert ] = useState({ show: false });

    function handleNameChange(inputName) {
        const name = inputName.replace(/([^a-zA-z\s])/g, '').replace(/\s{2,}/g, ' ');
        setName(name);
    }

    function validateForm() {
        if(name.length <= 2) throw new Errors.FormInputError("Digite um nome válido");
    }

    async function submit () {
        let alert = { show: true };
        setShowSpinner(true);
        try {
            validateForm();
            await Students.create(name);
            alert.variant = 'success';
            alert.message = 'Aluno cadastrado com sucesso.';
        } catch (error) {
            alert.variant = 'danger';
            alert.message = 'Ocorreu um erro no sistema.';
            if(error instanceof Errors.FormInputError) {
                alert.variant = 'warning';
                alert.message = error.message;
            }
        } finally {
            setShowSpinner(false);
            setFormAlert(alert);
            if(alert.variant === 'success' || alert.variant === 'danger') {
                setAlert(alert);
                handleCloseModal(false);
                closeAlertTimeout(setAlert, 5000);
            }
        }
    }

    return (
        <Form className='p-2'>
            <Alert
                alert={ formAlert }
                setAlert={ setFormAlert }
            />

            <Form.Group as="section" className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    onChange={(e) => handleNameChange(e.target.value)}
                    value={ name }
                />
            </Form.Group>
            
            <Form.Group as="section" className='d-flex align-items-center justify-content-end gap-2'>
                <Spinner show={ showSpinner } />
                <Button
                    variant="success"
                    label='Salvar'
                    Icon={ <BsCheck size={ 23 }/> }
                    onClickFn={ () => submit() }
                />
                <Button 
                    variant="danger"
                    label='Cancelar'
                    Icon={ <BsX size={ 23 }/> }
                    onClickFn={ () => handleCloseModal(false) }
                />
            </Form.Group>
        </Form>
    );
}