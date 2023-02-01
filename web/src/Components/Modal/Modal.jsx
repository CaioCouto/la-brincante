import { Modal as BsModal } from 'react-bootstrap';

export default function Modal({ title, show, setShow, setAlert, BodyComponent }) {
    const handleClose = () => setShow(previous => ({...previous, register: false }));

    return (
        <BsModal show={ show.register } onHide={ handleClose }>
            <BsModal.Header>
                <BsModal.Title>{ title }</BsModal.Title>
            </BsModal.Header>
            <BsModal.Body>
                <BodyComponent 
                    handleCloseModal={ handleClose }
                    setAlert={ setAlert }
                />
            </BsModal.Body>
        </BsModal>
    );
}