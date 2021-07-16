import React, { useContext, createContext } from "react";
import { UserStore } from "./userStore";
import { PostStore } from "./postStore";
import Features from "./features";

interface Store {
  user: UserStore;
  post: PostStore;
  features: Features;
}

export const store: Store = {
  user: new UserStore(),
  post: new PostStore(),
  features: new Features(),
};

export const StoreContext = createContext(store);
export function useStore() {
  return useContext(StoreContext);
}
