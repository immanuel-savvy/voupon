import React from "react";
import "./assets/css/styles.css";
import "./assets/css/custom.css";
import { Loggeduser, Nav_context } from "./Contexts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

class Voupon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  script_paths = new Array(
    "jquery.min.js",
    "popper.min.js",
    "bootstrap.min.js",
    "select2.min.js",
    "slick.js",
    "moment.min.js",
    "daterangepicker.js",
    "summernote.min.js",
    "metisMenu.min.js",
    "custom.js",
    "my_custom.js"
  );

  append_script = (path) => {
    const script = document.createElement("script");
    script.src = `http://localhost:3000/js/${path}`;
    script.type = "text/babel";
    script.async = false;
    document.body.appendChild(script);
  };

  componentDidMount = () => {
    this.script_paths.map((scr) => this.append_script(scr));
  };

  render = () => {
    return (
      <Loggeduser.Provider>
        <Nav_context.Provider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
            </Routes>
          </BrowserRouter>
        </Nav_context.Provider>
      </Loggeduser.Provider>
    );
  };
}

export default Voupon;
