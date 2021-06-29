import React, { useContext, createContext } from "react";
import { UserStore } from "./userStore";
import { PostStore } from "./postStore";

interface Store {
  user: UserStore;
  post: PostStore;
}

export const store: Store = {
  user: new UserStore(),
  post: new PostStore(),
};

export const StoreContext = createContext(store);
export function useStore() {
  return useContext(StoreContext);
}
