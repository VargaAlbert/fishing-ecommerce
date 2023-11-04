import logo from "../../img/logo.png";

import {
  FaSquareFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaLocationDot,
  FaPhoneFlip,
  FaRegEnvelope,
  FaCcVisa,
  FaCcMastercard,
} from "react-icons/fa6";

import "./Footer.scss";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-main-container">
        <div className="my-container">
          <div className="footer-label-container">
            <h3>Iratkozz fel hírlevelünkre!</h3>
            <h4>
              Mindig értesülj akcióinkról, újdonságainkról, és tartsd napra készre a horgász tudásod.
            </h4>
          </div>
          <div className="footer-form-container">
            <form action="">
              <div className="input-cont">
                <div>
                  <input type="text" placeholder="Neved" />
                </div>
                <div>
                  <input type="text" placeholder="E-mail címed." />
                </div>
                <div>
                  <button>Feliratkozás!</button>
                </div>
              </div>

              <div className="afsz-cont">
                <input type="checkbox" />
                <p>
                  A gombra kattintva elfogadom a személyes adatok felhasznál hatóságát,
                  a rendelés feldolgozásához, a weboldalon történő vásárlási élmény
                  fenntartásához és más célokra., melyeket az Adatkezelési tájékoztató tartalmaz.
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="my-container">
          <div className="footer-logo-container">
            <img src={logo} alt="logo" />
            <p>

              Albi horgász bolt, kis és nagykerek, horgászegyesület.
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur alias tempora molestias atque porro quos omnis
              debitis, sed dolore dolor accusamus dicta.
            </p>
          </div>
          <div className="footer-text-container">
            <div className="info-text">
              <h4>Általános</h4>
              <ul>
                <li>Klubb kártya</li>
                <li>Rólunk</li>
                <li>Garanciális javitás</li>
              </ul>
            </div>
            <div className="info-text">
              <h4>Információ</h4>
              <ul>
                <li>Vásárlási feltételek</li>
                <li>Adatvédelmi nyilatkozat</li>
                <li>Viszonteladóknak</li>
              </ul>
            </div>
            <div className="contact">
              <h4>Kapcsolat</h4>
              <ul>
                <li>
                  <FaLocationDot className="icon" /> Debrecen
                </li>
                <li>
                  <FaPhoneFlip className="icon" /> +36 55 555 5555
                </li>
                <li>
                  <FaRegEnvelope className="icon" /> horgaszbolt@gmail.com
                </li>
              </ul>
            </div>
            <div>
              <h4 className="media-title">Media</h4>
              <div className="media-cont">
                <div>
                  <FaSquareFacebook className="icon" />
                </div>
                <div>
                  <FaInstagram className="icon" />
                </div>
                <div>
                  <FaYoutube className="icon" />
                </div>
                <div>
                  <FaTiktok className="icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-end">
          <div className="footer-end-container my-container">
            <div>
              <FaCcVisa className="icon" />
              <FaCcMastercard className="icon" />
            </div>
            <p>© Varga Albert</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;