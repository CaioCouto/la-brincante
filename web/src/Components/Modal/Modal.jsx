import { Modal as BsModal } from 'react-bootstrap';

export default function Modal({ title, show, setShow, setAlert, BodyComponent }) {
    const handleClose = () => setShow(false);

    return (
        <BsModal show={ show } onHide={ handleClose }>
            <BsModal.Header closeButton>
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