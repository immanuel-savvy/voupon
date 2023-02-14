import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

class Dropdown_menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { button, items } = this.props;

    return (
      <Dropdown>
        <Dropdown.Toggle>
          {button || <i className="fa-solid fa-ellipsis-vertical"></i>}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {items
            ? items.map((item, index) => (
                <Dropdown.Item key={index} onClick={item.action}>
                  {item.title}
                </Dropdown.Item>
              ))
            : null}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default Dropdown_menu;
