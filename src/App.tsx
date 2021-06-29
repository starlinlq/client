import react, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import RegisterForm from "./components/forms/RegisterForm";
import LoginForm from "./components/forms/LoginForm";
import NavBar from "./components/navbar/NavBar";
import { Container } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { useStore } from "./app/stores/stores";
import { observer } from "mobx-react-lite";
import StoryCard from "./components/storyCard/StoryCard";
import CreateStory from "./components/forms/CreateStory";

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
      <div className="container">
        <Switch>
          <Route path="/register">
            {user.isAuth ? <Redirect to="/" /> : <RegisterForm />}
          </Route>
          <Route path="/login">
            {user.isAuth ? <Redirect to="/" /> : <LoginForm />}
          </Route>
          <Route path="/stories" component={StoryCard} />
          <Route path="/create" component={CreateStory} />
        </Switch>
      </div>
    </>
  );
}

export default observer(App);
