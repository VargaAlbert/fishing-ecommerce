import { useState } from 'react';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

import Style from "./LoginModal.module.scss";

type props = {
    toggle: () => void;
    show: boolean;
}

const LoginModal: React.FC<props> = ({ toggle, show }) => {

    const [email, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/auth/login', { email, password });
            const token = response.data.token;
            // Itt további műveleteket végezhetsz a tokennel, pl. tárolhatod a localStorage-ban vagy a state-ben
            console.log('Sikeres bejelentkezés, kapott token:', token);
        } catch (error) {
            console.error('Hiba történt a bejelentkezés közben:', error);
        }
    };

    return (
        <div className={Style.mainContainer}>
            <Modal
                show={show}
                onHide={toggle}
                backdrop="static"
                keyboard={false}
                data-bs-theme="dark"
                className={Style.position}
            >
                <Modal.Header data-bs-theme="dark" className={Style.background} closeButton>
                    <Modal.Title><h3>BEJELENTHEZÉS</h3></Modal.Title>
                </Modal.Header>

                <Modal.Body className={Style.background}>

                    <form className={Style.login} onSubmit={handleSubmit}>

                        <input
                            type="email"
                            value={email}
                            placeholder="E-mail címed:"
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <input
                            type="text"
                            value={password}
                            placeholder="Jelszavad:"
                            onChange={(e) => setPassword(e.target.value)}

                        />

                        <div className={Style.loginAssed}>

                            <label>Megjegyzés!
                                <input type="checkbox" />
                            </label>

                            <a>Elfelejtett jelszó</a>
                        </div>

                        <button type="submit">BEJELENTKEZEM</button>

                    </form>

                </Modal.Body>

                <Modal.Footer className={Style.background}>

                    <Link
                        className={Style.link}
                        to="/registration"
                    >
                        <button
                            className={Style.reg}
                            onClick={toggle}
                        >
                            REGISZTRÁCIÓ
                        </button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </div>
    );

}

export default LoginModal;