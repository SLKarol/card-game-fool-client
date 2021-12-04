import type { FC } from "react";

import { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";

import GameInfo from "pages/GameInfo/GameInfo";
import AppError from "pages/AppError/AppError";
import Game from "pages/Game/Game";
import OpenGames from "pages/OpenGames/OpenGames";
import Home from "pages/Home/Home";

const Login = lazy(() => import("pages/Login/Login"));
const Register = lazy(() => import("pages/Register/Register"));
const NewGame = lazy(() => import("pages/NewGame/NewGame"));
const NotAccess = lazy(() => import("pages/NotAccess/NotAccess"));
const UserInfo = lazy(() => import("pages/UserInfo/UserInfo"));
const Reports = lazy(() => import("pages/Reports"));
const About = lazy(() => import("pages/About"));

const AppRoute: FC = () => (
  <Suspense fallback={<div className="page">Загрузка...</div>}>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/start">
        <NewGame />
      </Route>
      <Route path="/game/:id">
        <Game />
      </Route>
      <Route path="/reports">
        <Reports />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/not-access">
        <NotAccess />
      </Route>
      <Route path="/game-info/:id">
        <GameInfo />
      </Route>
      <Route path="/error">
        <AppError />
      </Route>
      <Route path="/open">
        <OpenGames />
      </Route>
      <Route path="/userinfo">
        <UserInfo />
      </Route>
    </Switch>
  </Suspense>
);

export default AppRoute;
