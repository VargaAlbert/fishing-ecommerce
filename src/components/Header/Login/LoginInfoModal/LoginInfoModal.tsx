import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useAuthContext } from "../../../../context/AuthContext";
import style from "./LoginInfoModal.module.scss";
import "../../../../scss/ancestor-class.scss"
const LoginInfoModal: React.FC = () => {

    const { loginMessage, modalInfo, toggleInfoModal, toggleDropdownLogin } = useAuthContext();

    const textTSX = () => {
        switch (loginMessage[0]) {
            case "successful": {
                return ["Sikeres Bejelentkezés!", "Jó vásárlást", "Rendben"]
            }
            case "error": {
                return ["Sikerestelen Bejelentkezés!", "Hibás felhasználónév vagy jelszó.", "Értettem"]
            }
            case "incomplete": {
                return ["Sikerestelen Bejelentkezés!", "Töltsön ki a felhasználónevet és a jelszót.", "Értettem"]
            }
            case "reg-incomplete": {
                return ["Sikerestelen Regisztráció!", "Töltsön ki minden * jelölt mezöt.", "Értettem"]
            }
            case "reg-successful": {
                return ["Sikeres Regisztráció!", "Jelentkeze be a folytatáshoz", "Bejelentkezés"]
            }
            case "reg-error": {
                return ["Sikerestelen Regisztráció!", "Valami hiba törént a regisztráció közben", "Értettem"]
            }
            case "reg-error-password": {
                return ["Sikerestelen Regisztráció!", "A két jelszó nem egyezik meg!", "Értettem"]
            }
            case "reg-error-existingEmail": {
                return ["Sikerestelen Regisztráció!", `A ${loginMessage[1]} már foglalt emailcím, kérjük, jelentkezzen be.`, "Értettem"]
            }
            default: {
                return ["HIBA", "Valami nincs rendben jöjjön vissza késöbb.", "Értettem"]
            }
        }
    }

    const text = textTSX();

    const buttonFunction = () => {
        if (loginMessage[0] === "reg-successful") {
            toggleDropdownLogin()
            toggleInfoModal()
        } else {
            toggleInfoModal()
        }
    }

    return (
        <div>
            <Modal show={modalInfo} onHide={toggleInfoModal}>
                <Modal.Header className="backgroundModal" closeButton>
                    <Modal.Title>
                        {text[0]}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="backgroundModal">
                    {text[1]}
                </Modal.Body>
                <Modal.Footer className="backgroundModal">
                    <button className={style.btn} onClick={buttonFunction}>
                        {text[2]}
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default LoginInfoModal;