import Style from "./Registration.module.scss"

const MenuList: React.FC = () => {

    return (
        <section className={Style.mainContainer}>
            <div className={Style.container}>
                <h2>Regisztráció</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus quia ipsam officiis quaerat sit animi nihil dolorem optio, repellat iure, excepturi a odit obcaecati asperiores laborum nulla repudiandae fugiat ipsum.</p>
                <form className={Style.registration} action="">
                    <div>
                        <input type="text" placeholder="Vezetékneved*" />
                        <input type="text" placeholder="Keresztneved*" />
                    </div>
                    <div>
                        <input type="text" placeholder="Jelszó*" />
                        <input type="text" placeholder="Jelszó ujra*" />
                    </div>
                    <div>
                        <input type="email" placeholder="E-mail címed*" />
                        <input type="tel" placeholder="Telefonszámod" />
                    </div>
                    <button>REGISZTRÁCIÓ</button>
                </form>
            </div>
        </section>
    );
}

export default MenuList;