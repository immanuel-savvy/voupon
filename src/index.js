import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Voupon from "./Voupon";
import reportWebVitals from "./reportWebVitals";
import ReactGA from "react-ga4";

const measurement_id = "G-6KJBEPGLG9";
ReactGA.initialize(measurement_id);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Voupon />);

const send_analytics = () =>
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
  });
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(send_analytics);
