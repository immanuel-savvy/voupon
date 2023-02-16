import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../assets/js/utils/functions";

const scroll_to_top = () => window.scrollTo({ top: 0, behavior: "smooth" });

const Explore_more = ({ to }) => {
  return (
    <Link to={`/${to}`} onClick={scroll_to_top}>
      <div class="row justify-content-center">
        <div class="col-lg-7 col-md-8 mt-2">
          <div class="text-center">
            <a
              href="grid-layout-with-sidebar.html"
              class="btn btn-md theme-bg-light theme-cl"
            >
              Explore More {to_title(to)}
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Explore_more;
export { scroll_to_top };
