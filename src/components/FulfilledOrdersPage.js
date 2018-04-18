import React, { Component } from 'react';
import SearchInput, { createFilter } from 'react-search-input'
import CollapaseCards from './collapase';
import * as axios from 'axios';
import { Page, RadioButton, Card, Stack } from '@shopify/polaris';
import FulfilledOrder from './FulfilledOrder';
import Loading from './Loading';

import { Container, Row, Col } from 'reactstrap';
const KEYS_TO_FILTER = ['order.order_number']
const QRCode = require('qrcode.react');



class FulfilledOrdersPage extends Component {
    constructor(props
    ) {
        super();
        this.state = {
            orders: [],
            products: {},
            isOrderListLoading: true,
            search: '',
            isCheckedCus: false,
            isCheckedOrd: true
        };


    }


    componentDidMount() {
        axios.get('https://tracified-react-api.herokuapp.com/shopify/shop-api/products')
            .then(response => {
                const products = response.data.products;
                this.setState({ products: response.data.products });
            });
        axios.get('https://tracified-react-api.herokuapp.com/shopify/shop-api/fulfilled-orders')
            .then(response => {
                this.setState({
                    orders: response.data.fulfilledOrders,
                    isOrderListLoading: false
                });
            });

    }



    updateSearch(event) {
        console.log("Nisha");

        console.log(this.state.isCheckedCus);
        console.log(this.state.isCheckedOrd);

        this.setState({
            search: event.target.value.substr(0, 20),

        });
    }

    clickOrder() {
        console.log("Nisha");

        this.setState({
            isCheckedCus: false,
            isCheckedOrd: true

        });


    }

    clickCustomer() {
        console.log("Nishaniii");


        this.setState({
            isCheckedCus: true,
            isCheckedOrd: false

        });



    }

    render() {

        if (this.state.isOrderListLoading) {
            return <Loading />;
        }
        else {



            // All the order details
            console.log(this.state.isCheckedCus);
            console.log(this.state.isCheckedOrd);


            if (this.state.isCheckedCus) {
                console.log("cus works");

                let orders = this.state.orders.filter(
                    (order) => {
                        const customer = order.customer.first_name + " " + order.customer.last_name;
                        const customer1 = customer.toLowerCase();
                        const customer2 = customer.toUpperCase();
                        console.log(customer1);
                        return customer1.indexOf(this.state.search) !== -1 || customer2.indexOf(this.state.search) !== -1 || customer.indexOf(this.state.search) !== -1;
                    }
                );
                console.log(orders);

                var orderArray = [];
                orders.forEach((order) => {
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

                    const customer = order.customer.first_name + " " + order.customer.last_name;



                    orderArray.push({
                        id: order.id,
                        order_number: order.order_number,
                        lineItems: lineItems,
                        customer: customer,
                        created_at: order.created_at.substring(0, 10)
                    });
                });




                console.log(orderArray);

            }

            else if (this.state.isCheckedOrd) {
                console.log("ord works");


                let orders = this.state.orders.filter(
                    (order) => {
                        return order.name.indexOf(this.state.search) !== -1;
                    }
                );
                console.log(orders);

                console.log(orders);

                var orderArray = [];
                orders.forEach((order) => {
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
                    if (order.customer && (order.customer.first_name || order.customer.last_name)) {
                        customer = order.customer.first_name + " " + order.customer.last_name;
                    }

                    orderArray.push({
                        id: order.id,
                        order_number: order.order_number,
                        lineItems: lineItems,
                        customer: customer,
                        created_at: order.created_at.substring(0, 10)
                    });
                });

                console.log(orderArray);


            }

            else {
                var orders = this.state.orders;


                console.log(orders);

                var orderArray = [];
                orders.forEach((order) => {
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

                    const customer = order.customer.first_name + " " + order.customer.last_name;



                    orderArray.push({
                        id: order.id,
                        order_number: order.order_number,
                        lineItems: lineItems,
                        customer: customer,
                        created_at: order.created_at.substring(0, 10)
                    });
                });



                console.log(orderArray);
            }


            var inputStyle = {
                marginLeft: '1%',
                float: 'center',
                fontSize: '14px',
                marginTop: '1%',
                marginBottom: '2%'
            }


            var tableStyle = {
                backgroundColor: "white"
            }

            var filterByStyle = {
                padding: "0.4rem",
                marginBottom: 5,
                fontWeight: "bold",
            }

            return (
                <Page title="Tracified Orders" separator>

                    <div className="filterWrapper" style={{ marginBottom: 5 }}>
                        <Stack alignment="center" >
                            <Stack.Item>
                                <div style={{ padding: "0.4rem", marginBottom: 5, fontWeight: "bold", fontSize: "140%", paddingBottom: '9.5%' }}>
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
                    <table className="table table-striped" style={tableStyle}>

                        <thead>
                            <tr>


                            </tr>
                            <tr>
                                <td ><b>Order No</b></td>
                                <td ><b>Customer</b></td>
                                <td ><b>Order Item to View</b></td>
                                <td ><b>Trace</b></td>
                            </tr>
                        </thead>
                        <tbody>

                            {orderArray.map((order, index) => {

                                return (
                                    <FulfilledOrder key={order.order_number} order={order} />
                                )
                            })}

                        </tbody>
                    </table>
                </Page>

            );
        }
    }
}

export default FulfilledOrdersPage;

// {orderArray.map((order, index) => {
//     const qrValue = order.order_number.toString();
//     const title = "Order No: " + order.order_number;
//     return (
//         <Card key={order.order_number} color="white">

//             <Row>
//                 <Col sm="2">
//                 <span>{title}</span>
//                 </Col>
//                 <Col sm="3">
//                 <span>Customer : {order.customer}</span>                                    
//                 </Col>
//                 <Col sm="4">
//                 <Select
//                     options={[
//                         'two',
//                         'three',
//                         {
//                             label: 'four',
//                             value: '4',
//                         },
//                     ]}
//                     placeholder="Select an Item to view"
//                 />
//                 </Col>
//                 <Col sm="3">
//                 <Button primary>View Trace More Timeline</Button>

//                 </Col>
//             </Row>
//         </Card>
//     )
// })}

// let resourceList = orderArray.map((resItem, index) => {    
//     let resource = {
//         url: '#',
//         attributeOne: "Order No: " + resItem.order_number + "  Customer: " + resItem.customer,
//         attributeTwo:  <Select
//                             options={[
//                                 'two',
//                                 'three',
//                                 {
//                                     label: 'four',
//                                     value: '4',
//                                 },
//                             ]}
//                             placeholder="Select an Item to view"
//                         />,
//         attributeThree: <Button primary> View Trace More Timeline</Button>
//     }

//     return (
//         resource
//     );
// });

{/* <ResourceList
                        items={resourceList}
                        renderItem={(item, index) => {
                            return <ResourceList.Item key={index} {...item} />;
                        }}
                    />   */}

{/* <Page title="Unfulfilled Orders" separator>
                    {orderArray.map((order, index) => {
                        const title = "Order No: " + order.order_number;
                        return (
                            <FulfilledOrder key={order.order_number} order={order} />
                        )
                    })}
                </Page> */}