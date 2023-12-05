import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

type props = {
    toggle: () => void;
    show: boolean;
    id: string;
}

const LoginInfoModal: React.FC<props> = ({ toggle, show, id }) => {

    const textTSX = () => {
        switch (id) {
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
            <Modal show={show} onHide={toggle}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {text[0]}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {text[1]}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggle}>
                        {text[2]}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default LoginInfoModal;