import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../assets/js/utils/functions";

const scroll_to_top = () => window.scrollTo({ top: 0, behavior: "smooth" });

const Explore_more = ({ to }) => {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-7 col-md-8 mt-2">
        <div className="text-center">
          <Link to={`/${to}`} onClick={scroll_to_top}>
            <a className="btn btn-md theme-bg-light theme-cl">
              Explore More {to_title(to)}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Explore_more;
export { scroll_to_top };
