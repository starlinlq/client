import axios, { AxiosError, AxiosResponse } from "axios";
import { Login, Register, Story, User, Profile } from "../interfaces";
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
  get: <T>(url: string, headers?: {}) =>
    axios.get<T>(url, headers).then(response),
  post: <T>(url: string, body: {}, headers?: {}) =>
    axios.post<T>(url, body, headers).then(response),
  put: <T>(url: string, body: {}, headers: {}) =>
    axios.put<T>(url, body, headers).then(response),
  delete: <T>(url: string, headers: {}) =>
    axios.delete<T>(url, headers).then(response),
};

export const _comments = {
  create: (comment: { comment: string; story_id: string }) =>
    requests.post<Comment>(`comment/create/${comment.story_id}`, comment, {
      headers: { Authorization: `${localStorage.getItem("Authorization")}` },
    }),
  edit: (comment: { comment: string; id: string }) =>
    requests.put(`api/comment/update/${comment.id}`, comment, {
      headers: { Authorization: `${localStorage.getItem("Authorization")}` },
    }),
  delete: (id: string) =>
    requests.delete(`comment/delete/${id}`, {
      headers: { Authorization: `${localStorage.getItem("Authorization")}` },
    }),
};

export const user = {
  register: ({ name, email, password }: Register) =>
    requests.post<User>("/register", { name, email, password }),
  login: ({ email, password }: Login) =>
    requests.post<User>("/login", { email, password }),
  validate: () => requests.get<User>("/validate"),
  logOut: () =>
    requests.get<void>("/logout", {
      headers: { Authorization: `${localStorage.getItem("Authorization")}` },
    }),
  loadStories: (id: string) =>
    requests.get<{ posts: Story[]; profile: Profile[] }>(`/profile/${id}`, {
      headers: { Authorization: `${localStorage.getItem("Authorization")}` },
    }),
};

export const story = {
  create: ({ title, story, photo_url, category }: Story) =>
    requests.post<Story>(
      "/post/create",
      { title, story, photo_url, category },
      { headers: { Authorization: `${localStorage.getItem("Authorization")}` } }
    ),
  edit: ({ title, story, photo_url, id }: Story) =>
    requests.put<Story>(
      "/post/update",
      { title, story, photo_url },
      { headers: { Authorization: `${localStorage.getItem("Authoriation")}` } }
    ),
  show: (id: string) => requests.get<Story>(`post/show/${id}`),
  all: () => requests.get<Story[]>("/post/stories"),
};

axios.interceptors.response.use(
  async (response) => {
    await sleep(100);
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
        /* if (localStorage.getItem("Authorization")) {
          localStorage.removeItem("Authorization");
        }
        */
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

export const agent = { user, story, _comments };
