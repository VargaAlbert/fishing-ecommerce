import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useAuthContext } from "../../../../context/AuthContext";

const LoginInfoModal: React.FC = () => {

    const { loginMessage, modalInfo, toggleInfoModal } = useAuthContext();

    const textTSX = () => {
        switch (loginMessage) {
            case "successful": {
                return ["Sikeres Bejelentkezés!", "Jó vásárlást", "Rendben"]
            }
            case "error": {
                return ["Sikerestelen Bejelentkezés!", "valami nincs rendben", "értettem"]
            }
            default: {
                return []
            }
        }
    }

    const text = textTSX();

    return (
        <div>
            <Modal show={modalInfo} onHide={toggleInfoModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {text[0]}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {text[1]}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleInfoModal}>
                        {text[2]}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default LoginInfoModal;