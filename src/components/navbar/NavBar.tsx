import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/stores";

function NavBar() {
  const [active, setActive] = useState(false);
  const { user } = useStore();
  const { isAuth } = user;

  function handleLogOut() {
    user.logOutUser();
  }

  function handleClick() {
    setActive(!active);
  }

  return (
    <header className="nav_container">
      <nav className="_nav container d-flex">
        <div className="logo">
          <h4>storynary</h4>
        </div>

        <div className="n-link d-flex">
          <a href="/stories">Stories</a>
          <a href="/top">Top</a>
        </div>

        <div className="user-links d-flex">
          {isAuth ? (
            <>
              <a href="/create" className="button">
                Create Story
              </a>
              <div onClick={handleClick} className="account">
                <p>account</p>
                <div className={active ? "active" : "not_active"}>
                  <a href="/account">Account</a>
                  <a href={`/profile/${user.id}`}>Profile</a>
                  <button className="button" onClick={handleLogOut}>
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
      </nav>
    </header>
  );
}

export default observer(NavBar);
