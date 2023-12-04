import { useState } from 'react';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

import Style from "./LoginModal.module.scss";

type props = {
    toggle: () => void;
    show: boolean;
}

const LoginModal: React.FC<props> = ({ toggle, show }) => {

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

                    <form className={Style.login} action="">

                        <input id='login-email' type="email" placeholder='E-mail címed:' />

                        <input id='login-text' type="text" placeholder='Jelszavad:' />

                        <div className={Style.loginAssed}>

                            <label>Megjegyzés!
                                <input type="checkbox" />
                            </label>

                            <a>Elfelejtett jelszó</a>
                        </div>

                        <button>BEJELENTKEZEM</button>

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