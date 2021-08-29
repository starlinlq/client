import axios, { AxiosError, AxiosResponse } from "axios";
import {
  Login,
  Register,
  Story,
  User,
  Profile,
  SingleStory,
} from "../interfaces";
import { toast } from "react-toastify";
import { history } from "../../";
import { request } from "http";

const response = <T>(response: AxiosResponse<T>) => response.data;
const headers = {
  headers: { Authorization: `${localStorage.getItem("Authorization")}` },
};
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
  create: (comment: { comment: string; story_id: number }) =>
    requests.post<Comment>(`comment/create/${comment.story_id}`, comment, {
      headers: { Authorization: `${localStorage.getItem("Authorization")}` },
    }),
  edit: (comment: { comment: string; id: number }) =>
    requests.put(`comment/update/${comment.id}`, comment, {
      headers: { Authorization: `${localStorage.getItem("Authorization")}` },
    }),
  delete: (id: number) =>
    requests.delete<void>(`comment/delete/${id}`, {
      headers: { Authorization: `${localStorage.getItem("Authorization")}` },
    }),
};

export const user = {
  register: ({ name, email, password, photo_url, city, about }: Register) =>
    requests.post<User>("/register", {
      name,
      email,
      password,
      city,
      photo_url,
      about,
    }),
  login: ({ email, password }: Login) =>
    requests.post<User>("/login", { email, password }),
  validate: () => requests.get<User>("/validate"),
  logOut: () =>
    requests.get<void>("/logout", {
      headers: { Authorization: `${localStorage.getItem("Authorization")}` },
    }),
  loadProfile: (id: number) =>
    requests.get<{ posts: Story[]; profile: Profile[] }>(`/profile/${id}`, {
      headers: { Authorization: `${localStorage.getItem("Authorization")}` },
    }),
  editProfile: (userInfo: {
    name: string;
    about: string;
    url: string;
    city: string;
  }) =>
    requests.put("/profile/update", userInfo, {
      headers: { Authorization: `${localStorage.getItem("Authorization")}` },
    }),
};

export const features = {
  upload: (image: any) =>
    requests.post<{ status: string; url: string }>("/upload", image, {
      headers: { Authorization: `${localStorage.getItem("Authorization")}` },
    }),
};

export const story = {
  create: ({ title, story, photo_url, category_title }: Story) =>
    requests.post<Story>(
      "/post/create",
      { title, story, photo_url, category: category_title },
      { headers: { Authorization: `${localStorage.getItem("Authorization")}` } }
    ),
  edit: ({ title, story, photo_url, id }: Story) =>
    requests.put<Story>(
      "/post/update",
      { title, story, photo_url },
      { headers: { Authorization: `${localStorage.getItem("Authoriation")}` } }
    ),
  show: (id: string) => requests.get<SingleStory>(`post/show/${id}`),
  delete: (id: number) => requests.delete(`post/delete/${id}`, headers),
  all: (page: number, category: string) =>
    requests.get<any>(`/post/stories/page/${page}`, {
      headers: { category },
    }),
  category: (category: string, limit?: number) =>
    requests.get<Story[]>(`/post/category/${category}`, { headers: { limit } }),
  limit: (limit: number, category?: string) =>
    requests.get<Story[]>(`post/show/amount/${limit}`),
  disLike: (like_id: number) =>
    requests.delete(`post/like/${like_id}`, headers),
  like: (story_id: number) =>
    requests.post<{
      user_id: number;
      post_id: number;
      created_at: string;
      id: number;
      updated_at: string;
    }>(`post/like/${story_id}`, {}, headers),
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

export const agent = { user, story, _comments, features };
