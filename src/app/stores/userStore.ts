import { makeAutoObservable, runInAction } from "mobx";
import { Register, User, Login, Profile } from "../interfaces";
import { agent_user } from "../api/user";
import axios from "axios";

export class UserStore {
  name: string = "";
  id: number | undefined = undefined;
  loading: boolean = false;
  isAuth: boolean = false;
  profile: Profile | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  validate = () => {
    this.loading = true;
    axios
      .get("http://127.0.0.1:3333/api/validate", {
        headers: { Authorization: `${localStorage.getItem("Authorization")}` },
      })
      .then((r: any) => {
        console.log(r);
        this.name = r.data.name;
        this.id = r.data.id;
        this.profile = r.data.profile;
      });

    runInAction(() => {
      this.isAuth = true;
      this.loading = false;
    });
  };

  registerUser = async ({ name, email, password }: Register) => {
    this.loading = true;
    agent_user.user.register({ name, email, password }).then((r: any) => {
      console.log(r);
      this.name = r.name;
      this.id = r.id;
      this.profile = r.profile;
      this.setToken(r.token.token);
      runInAction(() => {
        this.isAuth = true;
        this.loading = false;
      });
    });
  };

  getUser = ({ email, password }: Login) => {
    this.loading = true;
    agent_user.user.login({ email, password }).then((r: any) => {
      console.log(r);
      this.setToken(r.token);
      this.validate();
    });
  };
  logOutUser = () => {
    this.loading = true;
    this.removeToken();
    runInAction(() => {
      this.isAuth = false;
      this.loading = false;
    });
  };

  setToken = (token: string) => {
    let t = ` bearer ${token}`;
    localStorage.setItem("Authorization", t);
  };

  removeToken = () => {
    localStorage.removeItem("Authorization");
  };
}
