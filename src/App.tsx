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
import Profile from "./components/profile/Profile";
import Home from "./components/home/Home";

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
          <Route path="/register/:id?">
            {user.isAuth ? <Redirect to="/" /> : <RegisterForm />}
          </Route>
          <Route path="/login/:id?">
            {user.isAuth ? <Redirect to="/" /> : <LoginForm />}
          </Route>
          <Route exact path="/create">
            <CreateStory />
          </Route>
          <Route path="/stories" component={DisplayStories} />
          <Route path="/story/:id" component={SingleStory} />
          <Route path="/profile/:id" component={Profile} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </>
  );
}

export default observer(App);
