import { useState } from "react";
import axios from 'axios';
import Style from "./Registration.module.scss"

const Registration: React.FC = () => {

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setlastName] = useState<string>('');
    const [passwords, setPasswords] = useState<string[]>(['', '']);
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');



    const handlePasswordChange = (index: number, value: string) => {
        const updatedPasswords = [...passwords];
        updatedPasswords[index] = value;
        setPasswords(updatedPasswords);
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (firstName === "" || lastName === "" || email === "" || passwords[0] === "" || passwords[1] === "") {
            alert("Tölts ki minden * jelölt mezöt.");
        } else if (passwords[0] !== passwords[1]) {
            alert("A két jelszó nem egyezik!");
        } else {
            const password = passwords[0];
            try {
                const response = await axios.post('http://localhost:5000/auth/register', { firstName, lastName, password, email, phone });
                console.log('Sikeres regisztráció:', response.data);

            } catch (error) {
                console.error('Hiba történt a regisztráció közben:', error);
            }
        }
    };

    return (
        <section className={Style.mainContainer}>
            <div className={Style.container}>
                <h2>Regisztráció</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus quia ipsam officiis quaerat sit animi nihil dolorem optio, repellat iure, excepturi a odit obcaecati asperiores laborum nulla repudiandae fugiat ipsum.</p>
                <form className={Style.registration} onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            placeholder="Vezetékneved*"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Keresztneved*"
                            value={lastName}
                            onChange={(e) => setlastName(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Jelszó*"
                            value={passwords[0]}
                            onChange={(e) => handlePasswordChange(0, e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Jelszó ujra*"
                            value={passwords[1]}
                            onChange={(e) => handlePasswordChange(1, e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="E-mail címed*"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="tel"
                            placeholder="Telefonszámod"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <button type="submit">REGISZTRÁCIÓ</button>
                </form>
            </div>
        </section>
    );
}

export default Registration;