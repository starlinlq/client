import React, { useContext, createContext } from "react";
import { UserStore } from "./userStore";

interface Store {
  user: UserStore;
}

export const store: Store = {
  user: new UserStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
