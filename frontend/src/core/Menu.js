import React, { Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";


import io from 'socket.io-client';

let socket;
const serverUrl = 'http://localhost:5000';


const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#608bd2" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => {

  const user = isAuthenticated();

  useEffect(() => {

    if (user && user.user && user.user._id) {
      socket = io(serverUrl);

      console.log({user})

      socket.emit('join', `user_${user.user._id}`)

      socket.on('updateOrderStatus', (data) => {
          console.log('data::', data);
      });
    }
}, []);

  return (
    <header className="header-fixed">
      <div className="header-limiter">
        <h1>
          <Link to="/" className="nav-item">
            Chapter<span>Chase</span>
          </Link>
        </h1>
        <nav>
          <li className="nav-item">
            <Link className="nav-link" style={isActive(history, "/")} to="/">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/shop")}
              to="/shop"
            >
              Shop
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/cart")}
              to="/cart"
            >
              Cart{" "}
              <sup>
                <small className="cart-badge">{itemTotal()}</small>
              </sup>
            </Link>
          </li>

          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/user/dashboard")}
                to="/user/dashboard"
              >
                Dashboard
              </Link>
            </li>
          )}

          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/admin/dashboard")}
                to="/admin/dashboard"
              >
                Dashboard
              </Link>
            </li>
          )}

          {!isAuthenticated() && (
            <Fragment>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/signin")}
                  to="/signin"
                >
                  Signin
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/signup")}
                  to="/signup"
                >
                  Signup
                </Link>
              </li>
            </Fragment>
          )}

          {isAuthenticated() && (
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ cursor: "pointer", color: "#ffffff" }}
                onClick={() =>
                  signout(() => {
                    history.push("/");
                  })
                }
              >
                Signout
              </span>
            </li>
          )}
        </nav>
      </div>
    </header>
  )
};

export default withRouter(Menu);
