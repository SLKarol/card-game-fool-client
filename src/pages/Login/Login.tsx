import type { ChangeEvent, FC, FormEvent } from "react";
import { useReducer } from "react";
import { observer } from "mobx-react";
import type { AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";

import type { UserResponse } from "types/user";

import { useRootStore } from "stores/root";
import axios from "lib/axios";
import { useLocalStorage } from "lib/useLocalStorage";

import LoginDumb from "./LoginDumb";
import UserInfo from "pages/UserInfo/UserInfo";

interface State {
  email: string;
  password: string;
  busy: boolean;
}
type WhatCanChange = keyof Omit<State, "busy">;

type Action =
  | { type: "change"; payload: { value: string; name: WhatCanChange } }
  | { type: "submit" }
  | { type: "receive" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "change":
      const newState = { ...state };
      const { value, name } = action.payload;
      newState[name] = value;
      return { ...newState };
    case "submit":
      return { ...state, busy: true };
    case "receive":
      return { ...state, busy: false };

    default:
      throw new Error();
  }
}

const Login: FC = () => {
  const [{ busy, email, password }, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
    busy: false,
  });
  const {
    userStore: { fetchError, name, setName, setFetchError },
  } = useRootStore();
  const [, setToken] = useLocalStorage("gamerToken");
  let history = useHistory();

  // Если у юзера есть имя, значит он залогинился
  if (name) {
    return <UserInfo />;
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.currentTarget;
    dispatch({ type: "change", payload: { value, name: id as WhatCanChange } });
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "submit" });
    try {
      const response = (await axios({
        method: "POST",
        url: "users/login",
        data: { user: { email, password } },
      })) as AxiosResponse<UserResponse>;
      const { username, token } = response.data.user;
      setToken(token);
      setName(username);
      history.push("/");
    } catch (error) {
      setFetchError(error);
    }
    dispatch({ type: "receive" });
  };
  return (
    <LoginDumb
      email={email}
      busy={busy}
      errorMessage={fetchError}
      password={password}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default observer(Login);
