import axios, { AxiosError, AxiosResponse } from "axios";
import { request } from "http";
import { string } from "yup/lib/locale";
import { Login, Register, Story, User } from "../interfaces";
import { toast } from "react-toastify";
import { history } from "../../";

const response = <T>(response: AxiosResponse<T>) => response.data;

const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

axios.defaults.baseURL = "http://127.0.0.1:3333/api";

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(response),
  post: <T>(url: string, body: {}, headers?: {}) =>
    axios.post<T>(url, body, headers).then(response),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(response),
  delete: <T>(url: string) => axios.delete<T>(url).then(response),
};

export const user = {
  register: ({ name, email, password }: Register) =>
    requests.post<User>("/register", { name, email, password }),
  login: ({ email, password }: Login) =>
    requests.post<User>("/login", { email, password }),
  validate: () => requests.get<User>("/validate"),
};

export const story = {
  create: ({ title, story, photo_url, category }: Story) =>
    requests.post<Story>(
      "/post/create",
      { title, story, photo_url, category },
      { headers: { Authorization: `${localStorage.getItem("Authorization")}` } }
    ),
  edit: ({ title, story, photo_url, id }: Story) =>
    requests.put<Story>("/post/update", { title, story, photo_url }),
  show: (id: string) => requests.get<Story>(`post/show/${id}`),
  all: () => requests.get<Story[]>("/post/stories"),
};

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, config, status } = error.response!;
    switch (status) {
      case 400:
        if (typeof data === "string") {
          toast.error(data);
          break;
        }
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          history.push("/not-found");
          break;
        }
        toast.error("invalid account details");
        break;
      case 401:
        if (localStorage.getItem("Authorization")) {
          localStorage.removeItem("Authorization");
        }
        toast.error("Unathorize Request");
        break;
      case 404:
        history.push("/not-found");
        break;
      case 500:
        toast.error("server error, please try again later");
        break;

      default:
        break;
    }
    return Promise.reject(error);
  }
);

export const agent = { user, story };
