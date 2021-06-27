import react, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import RegisterForm from "./components/forms/RegisterForm";
import LoginForm from "./components/forms/LoginForm";
import NavBar from "./components/navbar/NavBar";
import { Container } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { useStore } from "./app/stores/stores";
import { observer } from "mobx-react-lite";

function App() {
  const { user } = useStore();

  useEffect(() => {
    let token = localStorage.getItem("Authorization");
    if (token) {
      user.validate();
    }
  }, []);
  return (
    <>
      <NavBar />
      <Switch>
        <Container style={{ marginTop: "7em" }}>
          <Route path="/register">
            {user.isAuth ? <Redirect to="/" /> : <RegisterForm />}
          </Route>
          <Route path="/login">
            {user.isAuth ? <Redirect to="/" /> : <LoginForm />}
          </Route>
        </Container>
      </Switch>
    </>
  );
}

export default observer(App);
