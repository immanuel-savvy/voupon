import React from "react";
import { get_request, post_request } from "../assets/js/utils/services";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer from "../sections/footer";
import Custom_nav from "../sections/nav";

class Search_results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let search_param = window.location.search.split("=")[1];

    let results = await post_request("search_site", search_param);

    this.setState({ search_param, results });
  };

  render() {
    let { search_param, results } = this.state;

    return (
      <div>
        <Custom_nav page="search" />
        <Padder />
        <Breadcrumb_banner title={search_param} page="Search Results" />

        <section>{results ? <></> : <Loadindicator />}</section>

        <Footer />
      </div>
    );
  }
}

export default Search_results;
