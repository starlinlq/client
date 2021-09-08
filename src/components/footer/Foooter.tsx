import { GiPhotoCamera } from "react-icons/gi";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { ImPinterest2 } from "react-icons/im";

export default function Footer() {
  return (
    <div className="footer_container">
      <footer>
        <section className="social_links_wrapper">
          <div className="social">
            <div className="logo">
              {" "}
              <GiPhotoCamera className="icon" /> <p>STORYNARY</p>
            </div>
            <div className="social_links ">
              <ImPinterest2 />
              <AiOutlineFacebook />
              <AiOutlineInstagram />
              <AiFillTwitterSquare />
            </div>
          </div>
          <div className="footer_links">
            <ul>
              <li>
                <a href="/home">HOME</a>
              </li>
              <li>
                <a href="/stories">STORIES</a>
              </li>
              <li>
                <a href="/login">LOGIN</a>
              </li>
              <li>
                <a href="/register">REGISTER</a>
              </li>
            </ul>
          </div>
        </section>
        <div className="rights">
          <p>Memories will always live forever</p>
        </div>
      </footer>
    </div>
  );
}
