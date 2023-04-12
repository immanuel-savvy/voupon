import React from "react";
import { get_request, post_request } from "../assets/js/utils/services";
import Listempty from "./listempty";
import Loadindicator from "./loadindicator";
import Transaction from "./transaction";

class Transactions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 20,
      page: 1,
    };
  }

  componentDidMount = async () => {
    let { user, wallet } = this.props;
    let { limit, page } = this.state;

    let transactions = await post_request("transactions", {
      wallet: user.wallet || wallet,
      limit,
      skip: limit * (page - 1),
    });

    this.setState({ transactions });
  };

  render() {
    let { wallet } = this.props;
    let { transactions } = this.state;

    return (
      <>
        {transactions ? (
          <>
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <span>Filter: </span>
                  <span>Sort: </span>
                </div>
                <div class="ground-list ground-hover-list">
                  <div className="row">
                    {transactions.length ? (
                      transactions.map((tx) => (
                        <Transaction
                          in_vendor={!!wallet}
                          transaction={tx}
                          key={tx._id}
                        />
                      ))
                    ) : (
                      <Listempty text="No transactions yet." />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Loadindicator />
        )}
      </>
    );
  }
}

export default Transactions;
