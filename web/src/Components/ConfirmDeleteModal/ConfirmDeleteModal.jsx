import { Modal as BsModal } from 'react-bootstrap';
import Button from '../Button';
import Spinner from '../Spinner';

export default function ConfirmDeleteModal({ show, setShow, showSpinner, id, deleteFn, }) {
    const handleClose = () => setShow(previous => ({ ...previous, confirmation: false }));

    return (
        <BsModal show={ show.confirmation } onHide={ handleClose }>
            <BsModal.Header>
                <BsModal.Title>Você tem certeza disso?</BsModal.Title>
            </BsModal.Header>
            <BsModal.Body>
                Caso decida seguir em frente, esta
                operação <strong>não poderá ser desfeita</strong>.
            </BsModal.Body>
            <BsModal.Footer>
                <Spinner show={ showSpinner }/>
                <Button
                    label="Mudei de ideia"
                    variant='info'
                    onClickFn={() => handleClose()}
                />
                <Button
                    label="Seguir em frente"
                    variant='danger'
                    onClickFn={ () => deleteFn(id) }
                />
            </BsModal.Footer>
        </BsModal>
    );
}