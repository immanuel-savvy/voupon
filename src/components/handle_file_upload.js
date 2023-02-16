import React from "react";

class Handle_file_upload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handle_file = ({ target }, prefix, maxsize) => {
    let file = target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    let prop = "file",
      prop_hash = "file_hash",
      prop_size = "file_size",
      prop_filename = "filename",
      prop_oversize = "oversize",
      prop_loading = "file_loading";
    if (prefix) {
      prop_hash = `${prefix}_${prop_hash}`;
      prop_loading = `${prefix}_${prop_loading}`;
      prop_filename = `${prefix}_${prop_filename}`;
      prop_oversize = `${prefix}_${prop_oversize}`;
      prop_size = `${prefix}_${prop_size}`;
      prop = `${prefix}`;
    }
    this.setState({ [prop_loading]: true });

    reader.onloadend = async (e) =>
      this.setState({
        file,
        [prop]: reader.result,
        [prop_filename]: file.name,
        [prop_loading]: false,
        [prop_size]: file.size,
        [prop_oversize]: file.size > maxsize,
      });
  };
}

export default Handle_file_upload;
