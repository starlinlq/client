import { useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/stores";
import { RiMenu3Fill, RiCloseLine, RiAccountCircleLine } from "react-icons/ri";
import { GiPhotoCamera } from "react-icons/gi";
import MobileMenu from "../mobilemenu/MobileMenu";
import useComponentVisible from "../../hooks/useComponentVisible";
import { BsBookmarks } from "react-icons/bs";
import Search from "../search/Search";
import DisplaySearch from "../displaySearch/DisplaySearch";

function NavBar() {
  const [mobile, setMobile] = useState(false);
  const { ref, visible } = useComponentVisible(false);
  const { user, features } = useStore();
  const { isAuth } = user;
  const mobileNavRef = useRef<HTMLDivElement>(null);

  function handleLogOut() {
    user.logOutUser();
  }

  function handleMobile() {
    if (mobileNavRef.current) {
      mobileNavRef.current.classList.toggle("is-nav-open");
    }
    setMobile(!mobile);
  }

  return (
    <div className="nav_container box-shadow">
      <nav className="_nav container d-flex">
        <div className="search_container_nav">
          <Search />
        </div>
        <div className="mobile_nav" ref={mobileNavRef}>
          <MobileMenu active={mobile} />
        </div>

        <div className="logo">
          <GiPhotoCamera className="icon" />
          <a href="/">STORYNARY</a>
        </div>

        <div className="nav-links d-flex">
          <a href="/">HOME</a>
          <a href="/stories">STORIES</a>
        </div>
        <div className="nav_menus">
          <div className="user-links d-flex">
            {isAuth ? (
              <>
                <a href="/create" className="link_to_create">
                  SHARE
                </a>
                <a href="/bookmark">
                  <BsBookmarks className="icon" />
                </a>

                <div
                  ref={window.innerWidth < 700 ? null : ref}
                  className="user_account_menu"
                >
                  <div className="user">
                    <img src={user.profile_pic} alt="profile" />
                    <p> HI {user.name.toUpperCase()}</p>
                  </div>

                  <div className={visible ? "active box-shadow" : "not_active"}>
                    <a href="/account">Account</a>
                    <a href={`/profile/${user.id}`}>Profile</a>

                    <button className="" type="button" onClick={handleLogOut}>
                      Log out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <a href="/login" className="button ">
                  Log In
                </a>
                <a href="/register" className="button ">
                  Register
                </a>
              </>
            )}
          </div>
          <div className="b_menu">
            {mobile ? (
              <RiCloseLine className="burger" onClick={handleMobile} />
            ) : (
              <RiMenu3Fill onClick={handleMobile} className="burger" />
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default observer(NavBar);
