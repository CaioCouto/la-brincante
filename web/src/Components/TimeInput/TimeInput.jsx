/**
 * Input[type="time"] para ser usado em
 *      -- NewEnrollmentForm
 *      -- EnrollmentDetailsForm
 * Seu propósito é facilitar o cadastro
 * exibição e atualização de matrículas
 * que sejam necessárias mais um horário.
 * 
 * @param {String} label - String to be displayed as the label 
 * @param {Value} value - String value of the time (format: HH:MM) 
 * @param {Function} onChangeFn - Logic to be eecuted when value changes
 * @returns <TimeInput />
 */

import { Form } from "react-bootstrap";

export default function TimeInput({ label, className, value, onChangeFn, disabled }) {
    return (
        <div className="col-12 col-sm-6">
            <Form.Label>{ label }</Form.Label>
            <Form.Control 
                type="time"
                className={ className }
                value={ value }
                onChange={ onChangeFn }
                disabled={ disabled }
                required
            />
        </div>
    )
}