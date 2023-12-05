import { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";

import Modal from 'react-bootstrap/Modal';
import Style from "./LoginModal.module.scss";
import LoginInfoModal from './LoginInfoModal/LoginInfoModal';

type props = {
    toggle: () => void;
    show: boolean;
}

const LoginModal: React.FC<props> = ({ toggle, show }) => {

    const {
        handleSubmit,
        getEmail,
        getPassword,
        email,
        password,
    } = useAuthContext();

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
                            onChange={getEmail}
                        />

                        <input
                            type="password"
                            value={password}
                            placeholder="Jelszavad:"
                            onChange={getPassword}

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
            <LoginInfoModal />
        </div>
    );

}

export default LoginModal;