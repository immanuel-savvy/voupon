import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { to_title } from "../assets/js/utils/functions";

const Custom_toggle = React.forwardRef(({ children, onClick }, ref) => {
  return (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <img
        src={require("../assets/img/ellipsis-vertical-solid.png")}
        height={24}
        width={24}
      />
    </a>
  );
});

class Dropdown_menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { button, items, style } = this.props;

    return (
      <Dropdown style={{ ...style }}>
        <Dropdown.Toggle as={button || Custom_toggle}>X</Dropdown.Toggle>

        <Dropdown.Menu>
          {items
            ? items.map((item, index) =>
                item ? (
                  <Dropdown.Item
                    key={index}
                    style={{ ...item.style }}
                    onClick={item.action}
                  >
                    {to_title(item.title)}
                  </Dropdown.Item>
                ) : null
              )
            : null}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default Dropdown_menu;
