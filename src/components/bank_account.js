import React from "react";

class Bank_account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { account, action } = this.props;
    let { bank, account_number } = account;

    return (
      <div class="col-lg-6 col-md-6 col-sm-12">
        <a href="#" onClick={() => action && action(account)}>
          <div class="edu_cat_2 cat-1">
            {/* <div class="edu_cat_icons">
            <a class="pic-main" href="#">
              <img src="assets/img/content.png" class="img-fluid" alt="" />
            </a>
          </div> */}
            <div class="edu_cat_data">
              <h4 class="title">
                <a href="#">{bank.name}</a>
              </h4>
              <ul class="meta">
                <li class="video">
                  <i class="ti-video-clapper"></i>
                  {account_number}
                </li>
              </ul>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export default Bank_account;
