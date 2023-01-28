import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { BsCheck, BsX } from 'react-icons/bs';

import { Courses, Errors } from '../../../../Models';
import { Alert, Button, Spinner } from '../../../../Components';
import { closeAlertTimeout } from '../../../../utils';

function applyBRLCurrencyMask(value) {
    let amount = Number(value.replace(/\D/g, '')) ? Number(value.replace(/\D/g, '')) : 0;
    return (amount/100)
        .toFixed(2)
        .toLocaleString('pt-BR', { currency:'BRL', maximumFractionDigits: 2, useGrouping:true })
        .replace('.', ',');
}

export default function NewCourseForm({ handleCloseModal, setAlert }) {
    const [ showSpinner, setSpinner ] = useState(false);
    const [ formAlert, setFormAlert ] = useState({ show: false });
    const [ name, setName ] = useState('');
    const [ value, setValue ] = useState('');

    function handleNameChange(inputName) {
        const name = inputName.replace(/[-_+=§\[\]\{\}\\/?~^´`\d!@#$%¨&*()¹²³£¢¬ªº;:,.<>|°'"]/g, '').replace(/\s{2,}/g, ' ');
        setName(name)
    }
    
    function handleValueChange(inputValue) {
        let tmp = applyBRLCurrencyMask(inputValue);
        setValue(tmp)
    }

    function validateForm() {
        if(name.length <= 3) throw new Errors.FormInputError("Digite um nome válido.");
        else if(value.length === 0) throw new Errors.FormInputError("Digite um valor válido.");
    }

    async function submit () {
        let alert = { show: true };
        setSpinner(true);
        try {
            validateForm();
            await Courses.create(name, value);
            alert.variant = 'success';
            alert.message = 'Curso cadastrado com sucesso.';
        } catch (error) {
            if(error instanceof Errors.FormInputError) {
                alert.variant = 'warning';
                alert.message = error.message;
            }
            else {
                alert.variant = error.response.status === 400 ? 'warning' : 'danger';
                alert.message = error.response.status === 400 ? 'Este curso já existe.' : 'Um erro ocorreu durante a operação.';
            }
        }
        finally {
            setSpinner(false);
            if(alert.variant === 'success' || alert.variant === 'danger') {
                setAlert(alert);
                handleCloseModal(false);
                closeAlertTimeout(setAlert, 5000);
            }
            else {
                setFormAlert(alert);
            }
        }
    }

    return (
        <Form className='p-2'>
            <Alert
                alert={ formAlert }
                setAlert={ setFormAlert }
            />

            <Form.Group as="section" className="mb-3" controlId="name">
                <Form.Label>Nome</Form.Label>
                <Form.Control 
                    placeholder="Violão" 
                    onChange={(e) => handleNameChange(e.target.value)}
                    value={ name }
                    required
                />
            </Form.Group>
            
            <Form.Group as="section" className="mb-3" controlId="value">
                <Form.Label>Valor</Form.Label>
                <Form.Control 
                    placeholder="100,50"
                    onChange={(e) => handleValueChange(e.target.value)}
                    value={ value }
                    required
                />
            </Form.Group>
            
            <Form.Group as="section" className='d-flex align-items-center justify-content-end gap-2'>
                <Spinner show={ showSpinner }/>
                <Button
                    variant='success'
                    label='Salvar'
                    Icon={ <BsCheck size={ 23 }/> }
                    onClickFn={ () => submit() }
                />
                <Button 
                    variant='danger'
                    label='Cancelar'
                    Icon={ <BsX size={ 23 }/> }
                    onClickFn={ () => handleCloseModal(false) }
                />
            </Form.Group>
        </Form>
    );
}