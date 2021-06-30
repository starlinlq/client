import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import RegisterForm from "./components/forms/RegisterForm";
import LoginForm from "./components/forms/LoginForm";
import NavBar from "./components/navbar/NavBar";
import { Redirect } from "react-router-dom";
import { useStore } from "./app/stores/stores";
import { observer } from "mobx-react-lite";
import StoryCard from "./components/storyCard/StoryCard";
import CreateStory from "./components/forms/CreateStory";
import { ToastContainer } from "react-toastify";
import Loading from "./features/loader/Loading";
import DisplayStories from "./components/displaystories/DisplayStories";
import SingleStory from "./components/singlestory/SingleStory";

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
      <ToastContainer
        position="bottom-right"
        hideProgressBar
        closeOnClick
        pauseOnHover
      />
      <div className="container">
        <Switch>
          <Route path="/register">
            {user.isAuth ? <Redirect to="/" /> : <RegisterForm />}
          </Route>
          <Route path="/login">
            {user.isAuth ? <Redirect to="/" /> : <LoginForm />}
          </Route>
          <Route path="/stories" component={DisplayStories} />
          <Route path="/create" component={CreateStory} />
          <Route path="/story/:id" component={SingleStory} />
          <Route path="/test" component={Loading} />
        </Switch>
      </div>
    </>
  );
}

export default observer(App);
