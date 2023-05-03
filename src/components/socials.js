import React from "react";

class Socials extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="fixed_on_page_box" id="fixed_socials">
        <div className="icon_whatsapp mb-3">
          <a
            style={{ color: "#fff" }}
            href="https://wa.me/+2347068700711/?text=Hello,%20I%20would%20like%20to%20inquire%20about%20Voucher%20Africa?"
            target="_blank"
          >
            <img src="https://giit.com.ng/assets/images/icon_whatsapp.png?1666193786" />
          </a>
        </div>

        <div className="icon_facebook mb-3 ml-1">
          <a
            style={{ color: "#fff" }}
            target="_blank"
            href="https://instagram.com/voucherafrica"
          >
            <img
              height={50}
              width={50}
              src={require(`../assets/img/ig_icon.webp`)}
              className="img-fluid"
            />
          </a>
        </div>
        <div className="icon_twitter pl3 mb-3">
          <a
            style={{ color: "#fff" }}
            target="_blank"
            href="https://twitter.com/voucherafrica"
          >
            <img src="https://giit.com.ng/assets/images/icon_twitter.png?1666193786" />
          </a>
        </div>
        {/* <div className="icon_linkedin pl3 mb-3">
          <a
            style={{ color: "#fff" }}
            target="_blank"
            href="https://www.linkedin.com/in/giit-africa-6074b796"
          >
            <img src="https://giit.com.ng/assets/images/icon_linkedin.png?1666193786" />
          </a>
        </div> */}
      </div>
    );
  }
}

export default Socials;
