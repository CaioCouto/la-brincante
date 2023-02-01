import { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { BsCheck, BsX } from 'react-icons/bs';

import { Students, Errors } from '../../../../Models';
import { closeAlertTimeout, validateForm } from '../../../../utils';
import { Alert, Button, Spinner } from '../../../../Components';

function FormSelect({ defaultOptionText, data, onChangeFn, value, disabled }) {
    return (
        <Form.Select
            className={`${disabled ? styles['disabled'] : null}`} 
            onChange={ onChangeFn } 
            value={ value } 
            disabled={ disabled }>
            <option value="-1">{ defaultOptionText }</option>
            {
                data.map(datum => (
                    <option key={ datum.id } value={ datum.id }>{ datum.name }</option>
                ))
            }
        </Form.Select>
    )
}

const {
    validateStudentName,
    validateBillingDay,
    validateDiscount
} = validateForm;

export default function NewStudentForm({ handleCloseModal, setAlert }) {
    const [ showSpinner, setShowSpinner ] = useState(false);
    const [ formAlert, setFormAlert ] = useState({ show: false });
    const [ name, setName ] = useState('');
    const [ billingDay, setBillingDay ] = useState('');
    const [ discount, setDiscount ] = useState('0');

    function handleNameChange(inputName) {
        const name = inputName.replace(/([\d!@#$%¨&*(){}\[\]<>,.:;/?\\|+=*-+'"])/g, '').replace(/\s{2,}/g, ' ');
        setName(name);
    }

    async function submit () {
        let alert = { show: true };
        setShowSpinner(true);
        try {
            validateStudentName(name);
            validateBillingDay(billingDay);
            validateDiscount(discount);

            await Students.create({
                name: name,
                billingDay: billingDay,
                discount: parseInt(discount),
            });
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

            <Form.Group as="section" className="mb-3" controlId="formBasicEmail">
                <Form.Label>Dia da fatura</Form.Label>
                <FormSelect
                    value={ billingDay }
                    data={Array.from(Array(31), (_, i) => ({ id: i+1, name: i+1 }))}
                    defaultOptionText="Escolha o melhor dia para a cobrança"
                    onChangeFn={(e) => setBillingDay(e.target.value)}
                />
            </Form.Group>

            <Form.Group as="section" className='mb-3'>
                <Form.Label>Desconto</Form.Label>
                <InputGroup>
                    <Form.Control 
                        value={ discount }
                        onChange={ (e) => setDiscount(e.target.value) }
                        />
                    <InputGroup.Text>%</InputGroup.Text>
                </InputGroup>
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