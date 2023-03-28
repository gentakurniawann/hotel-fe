import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Dashboard from "./pages/dashboard/dashboard";
import Profile from "./pages/profile/profile";
import User from "./pages/user/user";
import Customer from "./pages/customer/customer";
import RoomType from "./pages/roomType/roomType";
import Room from "./pages/room/room";
import Transaction from "./pages/transaction/transaction";
export default class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/" component={Dashboard}></Route>
        <Route exact path="/profile" component={Profile}></Route>
        <Route exact path="/user" component={User}></Route>
        <Route exact path="/customer" component={Customer}></Route>
        <Route exact path="/room-type" component={RoomType}></Route>
        <Route exact path="/room" component={Room}></Route>
        <Route exact path="/transaction" component={Transaction}></Route>
      </Switch>
    );
  }
}
