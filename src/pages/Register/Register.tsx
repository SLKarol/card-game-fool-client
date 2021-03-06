import type { ChangeEvent, FC, FormEvent } from "react";
import { useReducer } from "react";
import { useHistory } from "react-router-dom";

import { UserResponse } from "types/user";
import type { ApiError } from "lib/parseError";
import axios from "../../lib/axios";
import { parseApiError } from "lib/parseError";
import { useLocalStorage } from "lib/useLocalStorage";

import RegisterDumb from "./RegisterDumb";
import { AxiosResponse } from "axios";

interface State {
  username: string;
  email: string;
  password: string;
  busy: boolean;
  errorMessage: string;
}
type WhatCanChange = keyof Omit<State, "busy">;

type Action =
  | { type: "change"; payload: { value: string; name: WhatCanChange } }
  | { type: "submit" }
  | { type: "success" }
  | { type: "failure"; payload: { error: string } };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "change":
      const newState = { ...state };
      const { value, name } = action.payload;
      newState[name] = value;
      return { ...newState };
    case "submit":
      return { ...state, busy: true };
    case "success":
      return { ...state, busy: false, errorMessage: "" };
    case "failure":
      return { ...state, busy: false, errorMessage: action.payload.error };

    default:
      throw new Error();
  }
}

const Login: FC = () => {
  const [{ busy, email, errorMessage, password, username }, dispatch] =
    useReducer(reducer, {
      username: "",
      email: "",
      password: "",
      busy: false,
      errorMessage: "",
    });
  let history = useHistory();
  const [, setToken] = useLocalStorage("gamerToken");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.currentTarget;
    dispatch({ type: "change", payload: { value, name: id as WhatCanChange } });
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "submit" });
    axios
      .post<{ user: Partial<State> }, AxiosResponse<UserResponse>>("users", {
        user: { email, password, username },
      })
      .then((response) => {
        // response.data.user
        const {
          data: {
            user: { token },
          },
        } = response;
        dispatch({ type: "success" });
        setToken(token);
        history.push("/");
      })
      .catch((error) => {
        const { message, response } = error;
        if (response) {
          const { data }: { data: ApiError } = response;
          return dispatch({
            type: "failure",
            payload: { error: parseApiError(data) },
          });
        }
        dispatch({ type: "failure", payload: { error: message } });
      });
  };
  return (
    <RegisterDumb
      email={email}
      busy={busy}
      errorMessage={errorMessage}
      password={password}
      onChange={onChange}
      onSubmit={onSubmit}
      username={username}
    />
  );
};

export default Login;
