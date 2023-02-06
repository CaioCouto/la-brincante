/**
 * Select para ser usado em
 *      -- NewEnrollmentForm
 *      -- EnrollmentDetailsForm
 * Seu propósito é facilitar o cadastro
 * exibição e atualização de matrículas.
 * 
 * @param {String} label - String to be displayed as the label 
 * @param {String} className - className to be rendered with element 
 * @param {Boolean} disabled - sets disabled attribute 
 * @param {String} defaultOptionText - String to be displayed as default option
 * @param {Object} data - Array of objects containing the options
 * @param {Function} onChangeFn - Logic to be eecuted when value changes
 * @returns <Ract.Fragment /> > label + select
 */

import { Form } from "react-bootstrap";
import { capitalize } from "../../utils";

export default function FormSelect({ label, className, disabled, value, defaultOptionText, data, onChangeFn }) {
    return (
        <>
            <Form.Label>{ label }</Form.Label>
            <Form.Select className={ className } onChange={ onChangeFn } disabled={ disabled } value={ value }>
                <option value="-1">{ defaultOptionText }</option>
                {
                    data.map(datum => (
                        <option key={ datum.id } value={ datum.id }>{ capitalize(datum.name) }</option>
                    ))
                }
            </Form.Select>
        </>
    )
}