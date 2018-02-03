import React, { Component } from 'react';
import * as axios from 'axios';
import { Page } from '@shopify/polaris';
import FulfilledOrder from './FulfilledOrder';
import Loading from './Loading';
// import autoBind from 'react-autobind';
// import { debounce, inRange, isNil, omit } from 'lodash';


class FulfilledOrdersPage extends Component {
    constructor(props
    ) {
        super();
        this.state = {
            orders: [],
            products: {},
            isOrderListLoading: true,
            search: ''
        };

       
    }

    componentDidMount() {
        axios.get('https://tracified-local-test.herokuapp.com/shopify/shop-api/products')
            .then(response => {
                const products = response.data.products;
                this.setState({ products: response.data.products });
            });
        axios.get('https://tracified-local-test.herokuapp.com/shopify/shop-api/fulfilled-orders')
            .then(response => {
                this.setState({
                    orders: response.data.fulfilledOrders,
                    isOrderListLoading: false
                });
            });
    }

   
               
    updateSearch(event){
        this.setState({
            search: event.target.value.substr(0, 20)
        });
    }
               
    render() {

        if (this.state.isOrderListLoading) {
            return <Loading />;
        }
        else {
             


            // All the order details
            let orders = this.state.orders.filter(
               (order1) => {
                   return order1.name.indexOf(this.state.search) !== -1;
               }
            );
            console.log(orders);
            // ..............................................................
            //declare customer variable (changed code)
            var customer;
            // ..............................................................

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

                customer = order.customer.first_name + " " + order.customer.last_name;

                orderArray.push({
                    id: order.id,
                    order_number: order.order_number,
                    lineItems: lineItems,
                    customer: customer,
                    created_at: order.created_at.substring(0, 10)
                });
            });
           
           
            // .......................................................................................................
            // check whether the customer name is there in create order in admin view. if its not there make the customer name is displays as admin. (changed code)
            if (customer==null){
                customer="Admin";
                console.log("customer name has turn into Admin !!!!");
            }
            else{
                console.log("customer name is there in the create order in admin view.");
            }        
            // .......................................................................................................

            
            var inputStyle1={
                marginLeft: '2%',
                float: 'left',
                padding: '1%',
                fontSize: '17px',
                marginTop: '2%',
                borderStyle: 'dotted',
                marginBottom:'2%',
                height:'45px'
            }

            var tableStyle={
                backgroundColor:"white"
            }
    

            return (
                <Page title="Fulfilled Orders" separator>
                    <table className="table table-striped" style={tableStyle}>
                       
                        <thead>
                            <tr>
                            <input
                             type="text"
                             placeholder="Enter the order id"
                             value={this.state.search}
                             onChange={this.updateSearch.bind(this)}
                             style={inputStyle1}
                             />

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