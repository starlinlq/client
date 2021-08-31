import { makeAutoObservable, runInAction } from "mobx";
import { Register, Story, Login, Profile } from "../interfaces";
import { agent } from "../api/agent";
import axios from "axios";
import { history } from "../../";

export class UserStore {
  name: string = "";
  id: number = 0;
  loading: boolean = false;
  isAuth: boolean = false;
  profile: Profile[] = [];
  editMode = false;
  posts: Story[] = [];
  bookmark: any[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  handlebookmark = () => {
    let index = 0;
    let bookmark = [];
    console.log(this.bookmark + "");

    do {
      if (this.bookmark[index].post) {
        bookmark.push({
          ...this.bookmark[index].post,
        });
      }
      index += 1;
    } while (index < this.bookmark.length);

    return bookmark;
  };

  validate = () => {
    this.loading = true;
    axios
      .get("http://127.0.0.1:3333/api/validate", {
        headers: { Authorization: `${localStorage.getItem("Authorization")}` },
      })
      .then((r: any) => {
        runInAction(() => {
          this.name = r.data.name;
          this.id = r.data.id;
          this.profile = [r.data.profile];
          this.bookmark = r.data.bookmark;
          this.isAuth = true;
          this.loading = false;
        });
      })
      .catch((error) => {
        runInAction(() => {
          this.loading = false;
          this.isAuth = false;
        });
      });
    console.log(this.bookmark);
  };

  registerUser = async ({
    name,
    email,
    password,
    city,
    about,
    photo_url,
  }: Register) => {
    this.loading = true;
    agent.user
      .register({ name, email, password, photo_url, city, about })
      .then((r: any) => {
        runInAction(() => {
          this.name = r.name;
          this.id = r.id;
          this.profile = [r.profile];
          this.setToken(r.token.token);
          this.isAuth = true;
          this.loading = false;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getUser = ({ email, password }: Login) => {
    this.loading = true;
    agent.user
      .login({ email, password })
      .then((r: any) => {
        if (r.token) {
          this.setToken(r.token);
          this.validate();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  logOutUser = async () => {
    this.loading = true;

    try {
      await agent.user.logOut();
      runInAction(() => {
        this.isAuth = false;
        this.loading = false;
      });
      this.removeToken();
      history.push("/");
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  /*
  loadProfile = async (id: number) => {
    this.loading = true;
    try {
      let data = await agent.user.loadProfile(id);
      console.log(data);
      runInAction(() => {
        this.profile = data.profile;
        this.posts = data.posts;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
    }
  };

  */

  editUserProfile = async (userData: {
    name: string;
    about: string;
    url: string;
    city: string;
  }) => {
    this.editMode = true;
    try {
      await agent.user.editProfile(userData);
      runInAction(() => {
        this.editMode = false;
        this.name = userData.name;
        this.profile = [
          {
            id: this.id,
            city: userData.city,
            profile_pic_url: userData.url,
            about_me: userData.about,
            user_name: userData.name,
          },
        ];
      });
    } catch (error) {
      console.log(error);
    }
  };

  setToken = (token: string) => {
    let t = ` bearer ${token}`;
    localStorage.setItem("Authorization", t);
  };

  removeToken = () => {
    localStorage.removeItem("Authorization");
  };
}
