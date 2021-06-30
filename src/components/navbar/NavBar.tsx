import react from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/stores";

function NavBar() {
  const { user } = useStore();
  const { isAuth } = user;
  const test = true;
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
              <div className="account">
                <a href="/account">Account</a>
                <div>
                  <a href="/dashboard">dashboard</a>
                  <a href="/">Log out</a>
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
