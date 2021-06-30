import { makeAutoObservable, runInAction } from "mobx";
import { Register, User, Login, Profile } from "../interfaces";
import { agent } from "../api/agent";
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
        if (r.data) {
          this.loading = false;
          this.name = r.data.name;
          this.id = r.data.id;
          this.profile = r.data.profile;
        }
      })
      .catch((error) => {
        runInAction(() => {
          this.loading = false;
          this.isAuth = false;
        });
      });

    runInAction(() => {
      this.isAuth = true;
      this.loading = false;
    });
  };

  registerUser = async ({ name, email, password }: Register) => {
    this.loading = true;
    agent.user
      .register({ name, email, password })
      .then((r: any) => {
        console.log(r);
        this.name = r.name;
        this.id = r.id;
        this.profile = r.profile;
        this.setToken(r.token.token);
        runInAction(() => {
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
