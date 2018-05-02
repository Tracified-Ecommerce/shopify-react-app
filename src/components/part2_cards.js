import React, { Component } from "react";
// import CollapseMain from './CollapseMain';
import Uncollapsed from "./Uncollapsed";
import * as axios from "axios";
import { Container, Row, Col } from "reactstrap";
import "./pagination.css";
import {
  Thumbnail,
  Card,
  Page,
  List,
  Badge,
  Button,
  Stack,
  RadioButton,
  TextContainer,
  Select,
  Icon
} from "@shopify/polaris";
import Loading from "./Loading";
// import ErrorMsg from './errorMsg';

const QRCode = require("qrcode.react");

class Part2Cards extends Component {
  constructor() {
    super();
    // this.handleClick = this.handleClick.bind(this);
    this.selectPreviousPage = this.selectPreviousPage.bind(this);
    this.selectNextPage = this.selectNextPage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      orders: [],
      // cardStateArray: [],
      pageNo: 1,
      itemsPerPage: 10,
      products: {},
      isOrderListLoading: true,
      search: "",
      isExpanded: true,
      isCheckedCus: false,
      isCheckedOrd: true,
      isError: false,
      selected: 10,
      buttonDisable: false
    };

    this.orderArray = [];
    this.paginatedArray = [];
    this.totalPages;
  }

  handleChange = (newValue, id) => {
    this.setState({ selected: newValue });

    if (newValue == 10) {
      this.setState({
        itemsPerPage: 10,
        pageNo: 1
      });
    } else if (newValue == 25) {
      this.setState({
        itemsPerPage: 25,
        pageNo: 1
      });
    } else if (newValue == 50) {
      this.setState({
        itemsPerPage: 50,
        pageNo: 1
      });
    } else if (newValue == 100) {
      this.setState({
        itemsPerPage: 100,
        pageNo: 1
      });
    } else {
      this.setState({
        itemsPerPage: 1000,
        pageNo: 1
      });
    }
  };

  selectPreviousPage() {
    this.totalPages = Math.ceil(
      this.orderArray.length / this.state.itemsPerPage
    );
    console.log("total pages : " + this.totalPages);
    // this.state.startPage = 1;
    // this.state.endPage = this.state.totalPages;

    if (this.state.pageNo == 1) {
      this.setState({
        buttonDisable: true
      });
    } else {
      this.setState({
        pageNo: this.state.pageNo - 1
      });
    }
  }

  selectNextPage() {
    this.totalPages = Math.ceil(
      this.orderArray.length / this.state.itemsPerPage
    );
    console.log("total pages : " + this.totalPages);

    if (this.state.pageNo == this.totalPages) {
      this.setState({
        buttonDisable: true
      });
    } else {
      this.setState({
        pageNo: this.state.pageNo + 1
      });
    }
  }

  setPage(pageNumber) {
    this.setState({
      pageNo: pageNumber + 1
    });
  }

  componentDidMount() {
    axios
      .get(
        "https://tracified-react-api.herokuapp.com/shopify/shop-api/products"
      )
      .then(response => {
        const products = response.data.products;
        this.setState({ products: response.data.products });
      })
      .catch(err => {
        console.log("error in shopAPI call : " + err);
      });
    axios
      .get("https://tracified-react-api.herokuapp.com/shopify/shop-api/orders")
      .then(response => {
        let arr = [];
        response.data.orders.forEach(order => {
          arr.push(false);
        });

        this.setState({
          orders: response.data.orders,
          isOrderListLoading: false,
          cardStateArray: arr
        });
      })
      .catch(err => {
        // this.setState({
        //     isError:true,
        //     isOrderListLoading:false
        // });
      });
  }

  updateSearch(event) {
    this.setState({
      search: event.target.value.substr(0, 20)
    });
  }

  clickOrder() {
    this.setState({
      isCheckedCus: false,
      isCheckedOrd: true
    });
  }

  clickCustomer() {
    this.setState({
      isCheckedCus: true,
      isCheckedOrd: false
    });
  }

  paginateArray(pageNumber, itemsPerPage, array) {
    return array.filter(function(item, i) {
      return (
        i >= itemsPerPage * (pageNumber - 1) && i < pageNumber * itemsPerPage
      );
    });
  }

  render() {
    // let buttonText = this.state.isExpanded ? {text:"Switch to collapsed view"} : {text:"Switch to expanded view"}

    if (this.state.isOrderListLoading) {
      return <Loading />;
    } else if (this.state.isError) {
      // return <ErrorMsg error={[status,ErrorMsg]}/>
    } else {
      if (this.state.isCheckedCus) {
        console.log("cus works");

        let orders = this.state.orders.filter(order => {
          const customer =
            order.customer.first_name + " " + order.customer.last_name;
          const customer1 = customer.toLowerCase();
          const customer2 = customer.toUpperCase();
          console.log(customer1);
          return (
            customer1.indexOf(this.state.search) !== -1 ||
            customer2.indexOf(this.state.search) !== -1 ||
            customer.indexOf(this.state.search) !== -1
          );
        });
        console.log(orders);

        this.orderArray = [];
        orders.forEach(order => {
          var items = order.line_items;
          var lineItems = [];
          items.forEach(item => {
            lineItems.push({
              id: item.id,
              title: item.title,
              quantity: item.quantity,
              variant_title: item.variant_title,
              product_id: item.product_id
            });
          });

          const customer =
            order.customer.first_name + " " + order.customer.last_name;

          this.orderArray.push({
            id: order.id,
            order_number: order.order_number,
            lineItems: lineItems,
            customer: customer,
            created_at: order.created_at.substring(0, 10)
          });
        });
        // this.state.totalOrders = this.orderArray.length
        this.paginatedArray = this.paginateArray(
          this.state.pageNo,
          this.state.itemsPerPage,
          this.orderArray
        );
        console.log(this.orderArray);
      } else if (this.state.isCheckedOrd) {
        console.log("ord works");

        let orders = this.state.orders.filter(order => {
          return order.name.indexOf(this.state.search) !== -1;
        });

        this.orderArray = [];
        orders.forEach(order => {
          var items = order.line_items;
          var lineItems = [];
          items.forEach(item => {
            lineItems.push({
              id: item.id,
              title: item.title,
              quantity: item.quantity,
              variant_title: item.variant_title,
              product_id: item.product_id
            });
          });

          let customer = "customer";
          if (
            order.customer &&
            (order.customer.first_name || order.customer.last_name)
          ) {
            customer =
              order.customer.first_name + " " + order.customer.last_name;
          }

          this.orderArray.push({
            id: order.id,
            order_number: order.order_number,
            lineItems: lineItems,
            customer: customer,
            created_at: order.created_at.substring(0, 10)
          });
        });
        // this.state.totalOrders = this.orderArray.length
        this.paginatedArray = this.paginateArray(
          this.state.pageNo,
          this.state.itemsPerPage,
          this.orderArray
        );

        this.totalPages = Math.ceil(
          this.orderArray.length / this.state.itemsPerPage
        );

        this.pages = Array.apply(null, { length: this.totalPages });

        if (this.totalPages <= 10) {
          var startPage, endPage;

          startPage = 1;
          endPage = this.totalPages;
        } else {
          if (this.state.pageNo <= 6) {
            startPage = 1;
            endPage = 10;
          } else if (this.state.pageNo + 4 >= this.totalPages) {
            startPage = this.totalPages - 9;
            endPage = this.totalPages;
          } else {
            startPage = this.state.pageNo - 5;
            endPage = this.state.pageNo + 4;
          }
        }
      } else {
        var orders = this.state.orders;

        this.orderArray = [];
        orders.forEach(order => {
          var items = order.line_items;
          var lineItems = [];
          items.forEach(item => {
            lineItems.push({
              id: item.id,
              title: item.title,
              quantity: item.quantity,
              variant_title: item.variant_title,
              product_id: item.product_id
            });
          });

          const customer =
            order.customer.first_name + " " + order.customer.last_name;

          this.orderArray.push({
            id: order.id,
            order_number: order.order_number,
            lineItems: lineItems,
            customer: customer,
            created_at: order.created_at.substring(0, 10)
          });
        });

        // this.state.totalOrders = this.orderArray.length

        this.paginatedArray = this.paginateArray(
          this.state.pageNo,
          this.state.itemsPerPage,
          this.orderArray
        );
      }

      var inputStyle = {
        marginLeft: "1%",
        float: "center",
        fontSize: "14px",
        marginTop: "-4%",
        marginBottom: "1%"
      };

      return (
        <Page title="Untracified Orders" separator>
          <Stack wrap={false} distribution="trailing">
            <Stack.Item />
            <div> Items per page</div>
            <Stack.Item>
              <Select
                options={[
                  { label: "10", value: 10 },
                  { label: "25", value: 25 },
                  { label: "50", value: 50 },
                  { label: "100", value: 100 }
                ]}
                onChange={this.handleChange}
                value={this.state.selected}
              />
            </Stack.Item>
          </Stack>
          <div style={{ paddingBottom: 5 }}>
            <Stack alignment="center">
              <Stack.Item>
                <div
                  style={{
                    padding: "0.4rem",
                    marginBottom: 5,
                    fontWeight: "bold",
                    fontSize: "140%",
                    paddingBottom: "9%"
                  }}
                >
                  Filter By :
                </div>
              </Stack.Item>
              <Stack.Item>
                <RadioButton
                  id="id1"
                  label="Order ID"
                  checked={this.state.isCheckedOrd}
                  onFocus={this.clickOrder.bind(this)}
                />
              </Stack.Item>
              <Stack.Item>
                <RadioButton
                  label="Customer Name"
                  checked={this.state.isCheckedCus}
                  onFocus={this.clickCustomer.bind(this)}
                />
              </Stack.Item>
              <Stack.Item>
                <input
                  type="text"
                  value={this.state.search}
                  onChange={this.updateSearch.bind(this)}
                  style={inputStyle}
                />
              </Stack.Item>
            </Stack>
          </div>

          {this.paginatedArray.map((order, index) => {
            const qrValue = order.order_number.toString();
            const title = "Order ID: " + order.order_number;

            if (this.state.isExpanded) {
              return (
                <Uncollapsed
                  order={order}
                  productsProp={this.state.products}
                  qrVal={qrValue}
                  title={title}
                />
              );
            }
          })}
          <div className="pagination_stack">
            <Stack distribution="center">
              <Stack.Item>
                {/* <Button
                  // disabled= {this.state.buttonDisable}
                  plain
                  size="slim"
                  outline
                  onClick={this.selectPreviousPage}
                  style={{ marginBottom: "1rem" }}
                >
                  <Icon source="arrowLeft" color="blue" />
                </Button> */}
                <ul className="paginationUl">
                  <li className={this.state.pageNo === 1 ? "disabled" : ""}>
                    <a onClick={() => this.setPage(0)}>First</a>
                  </li>
                  <li className={this.state.pageNo === 1 ? "disabled" : ""}>
                    <a onClick={() => this.selectPreviousPage()}>
                      Previous
                    </a>
                  </li >
                  {this.pages.map((page, index) => (
                    <li key={index} >
                      <a onClick={() => this.setPage(index)}>{index + 1}</a>
                    </li>
                  ))}
                  <li className={
                      this.state.pageNo === this.totalPages ? "disabled" : ""}>
                    <a onClick={() => this.selectNextPage()}>
                      Next
                    </a>
                  </li>
                  <li className={
                      this.state.pageNo === this.totalPages ? "disabled" : "" }>
                    <a onClick={() => this.setPage(this.totalPages - 1)}>Last</a>
                  </li>
                </ul>

                {/* <Button
                  plain
                  // disabled= {this.state.buttonDisable}
                  size="slim"
                  outline
                  onClick={this.selectNextPage}
                  style={{ marginBottom: "1rem" }}
                >
                  <Icon source="arrowRight" color="blue" />
                </Button> */}
              </Stack.Item>
            </Stack>
          </div>
        </Page>
      );
    }
  }
}

export default Part2Cards;
