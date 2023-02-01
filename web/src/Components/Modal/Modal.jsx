import { Modal as BsModal } from 'react-bootstrap';

export default function Modal({ title, show, setShow, setAlert, BodyComponent }) {
    const showIsBoolean = typeof show === 'boolean';
    const handleClose = () => {
        if(showIsBoolean) return setShow(false);
        setShow(previous => ({...previous, register: false }))
    };

    return (
        <BsModal show={ showIsBoolean ? show : show.register } onHide={ handleClose }>
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