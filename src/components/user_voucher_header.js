import React from "react";
import { to_title } from "../assets/js/utils/functions";
import Dropdown_menu from "./dropdown_menu";
import Small_btn from "./small_btn";
import Text_btn from "./text_btn";

const User_voucher_header = ({
  set_voucher_filter,
  voucher_type,
  voucher_filters,
  toggle_create_voucher,
  side_buttons,
  filter,
}) => {
  return (
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="short_wraping">
          <div class="row m-0 align-items-center justify-content-between">
            <div class="col-lg-4 col-md-5 col-sm-12  col-sm-6">
              <div class="shorting_pagination_laft">
                <h6 class="m-0">{voucher_type}</h6>
              </div>
            </div>

            <div class="col-lg-8 col-md-7 col-sm-12 col-sm-6">
              <div class="dlks_152">
                <div class="lmk_485">
                  <ul class="shorting_grid">
                    {side_buttons && side_buttons.length
                      ? side_buttons.map((btn) =>
                          btn ? (
                            <li class="list-inline-item">
                              <Small_btn
                                style={{
                                  textTransform: "capitalize",
                                }}
                                title={btn.title}
                                action={btn.action}
                              />
                            </li>
                          ) : null
                        )
                      : null}
                  </ul>
                </div>

                {voucher_filters && voucher_filters.length ? (
                  <div class="shorting-right mr-2">
                    <label>Filter By:</label>
                    <Dropdown_menu
                      items={
                        voucher_filters &&
                        voucher_filters.map(
                          (filter) =>
                            new Object({
                              title: filter,
                              action: () => set_voucher_filter(filter),
                            })
                        )
                      }
                      button={
                        voucher_filters &&
                        React.forwardRef(({ onClick }, ref) => {
                          return (
                            <div
                              class="dropdown show"
                              ref={ref}
                              onClick={(e) => {
                                e.preventDefault();
                                onClick(e);
                              }}
                            >
                              <a
                                class="btn btn-filter dropdown-toggle"
                                href="#"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <span class="selection">
                                  {to_title(voucher_filters[0])}
                                </span>
                              </a>
                            </div>
                          );
                        })
                      }
                    />
                  </div>
                ) : null}
                <div class="lmk_485">
                  <ul class="shorting_grid">
                    {toggle_create_voucher ? (
                      <li class="list-inline-item">
                        <Text_btn
                          text="Create Voucher"
                          action={toggle_create_voucher}
                        />
                      </li>
                    ) : null}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User_voucher_header;
