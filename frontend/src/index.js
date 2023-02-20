import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

socket.on("updateOrderStatus", (data) => {
    console.log('event received')
    console.log(data); // x8WIv7-mJelg7on_ALbx
});

ReactDOM.render(<Routes />, document.getElementById("root"));
