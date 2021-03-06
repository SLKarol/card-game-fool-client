import { createContext, useContext } from "react";

import { UserStore } from "./user";
import { ErrorStore } from "./error";

export class RootStore {
  userStore: UserStore;
  errorStore: ErrorStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.errorStore = new ErrorStore(this);
    this.userStore.fetchUserInfo();
  }
}

export const RootStoreContext = createContext<RootStore>({} as RootStore);

export const useRootStore = () => {
  return useContext(RootStoreContext);
};
