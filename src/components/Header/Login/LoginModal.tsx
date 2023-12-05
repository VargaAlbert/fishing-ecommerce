import { useState } from 'react';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

import Style from "./LoginModal.module.scss";
import LoginInfoModal from './LoginInfoModal/LoginInfoModal';

type props = {
    toggle: () => void;
    show: boolean;
}

const LoginModal: React.FC<props> = ({ toggle, show }) => {

    const [email, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginMessage, setLoginMessage] = useState<string>('');

    const [modalInfo, setModalInfo] = useState(false);
    const toggleInfoModal = () => setModalInfo(!modalInfo);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/auth/login', { email, password });
            //const token = response.data.token;
            setLoginMessage("successful");
            toggleInfoModal();
        } catch (error) {
            // console.error('Hiba történt a bejelentkezés közben:', error);
            setLoginMessage("error");
            toggleInfoModal();
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

                    <h3></h3>

                    <form className={Style.login} onSubmit={handleSubmit}>

                        <input
                            type="email"
                            value={email}
                            placeholder="E-mail címed:"
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <input
                            type="password"
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
            <LoginInfoModal toggle={toggleInfoModal} show={modalInfo} id={loginMessage} />
        </div>
    );

}

export default LoginModal;