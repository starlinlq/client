import axios, { AxiosResponse } from "axios";
import { request } from "http";
import { string } from "yup/lib/locale";
import { Login, Register, Story, User } from "../interfaces";

const response = <T>(response: AxiosResponse<T>) => response.data;

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
  get: (id: string) => requests.get<Story>(`post/show/${id}`),
};

export const agent = { user, story };
/*

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: () => requests.get<Activity[]>("/activities"),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => axios.post<void>("/activities", activity),
  update: (activity: Activity) =>
    axios.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => axios.delete<void>(`/activities/${id}`),
};
const agent = {
  Activities,
};


*/
