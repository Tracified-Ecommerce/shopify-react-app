import React, { Component } from 'react';
// import CollapseMain from './CollapseMain';
import Uncollapsed from './Uncollapsed';
import * as axios from 'axios';
import { Container, Row, Col} from 'reactstrap';
import { Thumbnail, Card, Page, List, Badge, Button, Stack, RadioButton, TextContainer } from '@shopify/polaris';
import Loading from './Loading';
import Pagination from './pagination';
// import ErrorMsg from './errorMsg';

const QRCode = require('qrcode.react');

class Part2Cards extends Component {
    constructor() {
        super();
        // this.handleClick = this.handleClick.bind(this);
        // this.toggleCardType = this.toggleCardType.bind(this);
        this.state = {
            orders: [],
            orderProducts: [] ,
            // cardStateArray: [],
            products: {},
            isOrderListLoading: true,
            search: '',
            isExpanded : true,
            isCheckedCus:false,
            isCheckedOrd:true,
            isError:false,
            pageOfItems: []
        };

        
        this.onChangePage = this.onChangePage.bind(this);
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    // handleClick = (index, isClosed) => {
  
    //     if(!isClosed){
    //     //reset all values in array to false -> (sets all cards' "isOpen" attributes to false)
    //     this.state.cardStateArray.fill(false);

    //     }

    //     //set only this card's collapse attribute to true
    //     var temp = this.state.cardStateArray.slice();
    //     temp[index] = !(temp[index]);
    //     // replace array with modified temp array
    //     this.setState({cardStateArray: temp});
    
    // }

    // toggleCardType() {
    //     this.setState({ isExpanded: !this.state.isExpanded });  
    // }

    componentDidMount() {
        axios.get('https://tracified-react-api.herokuapp.com/shopify/shop-api/products')
            .then(response => {
                const products = response.data.products;
                this.setState({ products: response.data.products });
            }).catch((err) => {
                console.log("error in shopAPI call : " + err);
            });
        axios.get('https://tracified-react-api.herokuapp.com/shopify/shop-api/orders')
            .then(response => {

                let arr = [];
                response.data.orders.forEach((order) => {
                    arr.push(false);
                });

                this.setState({ 
                    orders: response.data.orders,
                    isOrderListLoading: false,
                    cardStateArray: arr
                });
            }).catch((err) => {
                this.setState({ 
                    isError:true,
                    isOrderListLoading:false
                });
            });
    }

    updateSearch(event){
        console.log("Nisha");

        console.log(this.state.isCheckedCus);
        console.log(this.state.isCheckedOrd);

   this.setState({
            search: event.target.value.substr(0, 20),

        });
    } 
   
    clickOrder(){
        console.log("Nisha");
    
        this.setState({
            isCheckedCus: false,
            isCheckedOrd:true

        });} 
    
    clickCustomer(){
        console.log("Nishaniii");
    
       
        this.setState({
            isCheckedCus: true,
            isCheckedOrd:false

        });
    } 

    render() {

        // let buttonText = this.state.isExpanded ? {text:"Switch to collapsed view"} : {text:"Switch to expanded view"}

        if(this.state.isOrderListLoading){
            return <Loading/> ;
        } 
        else if(this.state.isError){
            // return <ErrorMsg error={[status,ErrorMsg]}/>
        }
        
        else{
        // All the order details
       // var orders = this.state.orders;
       console.log(this.state.isCheckedCus);
       console.log(this.state.isCheckedOrd);
    
    
       if(this.state.isCheckedCus){
           console.log("if conditon work");

       let orders = this.state.orders.filter(
           (order) => {
               const customer = order.customer.first_name+ " "+order.customer.last_name;
               const customer1 =customer.toLowerCase();
               const customer2 =customer.toUpperCase();
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

       else if(this.state.isCheckedOrd){
           console.log("else if works");


           let orders = this.state.orders.filter(
               (order) => {
                   return order.name.indexOf(this.state.search) !== -1 ;
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
     
                let customer = "customer";
                if(order.customer && (order.customer.first_name || order.customer.last_name)) {
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
            
            // console.log(orderArray);

             
       }

    else{
      var orders = this.state.orders;
      console.log("else works");
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

          var inputStyle={
            marginLeft: '1%',
            float: 'center',
            fontSize: '14px',
            marginTop: '-4%',
            marginBottom:'1%'
        }
        return (
            <Page title="Untracified Orders" separator>
                     <Stack 
                        distribution="trailing"
                    >

                    <div style={{paddingBottom:10}}>
                    <Stack.Item>
                            {/* <Button 
                                plain
                                size="slim" 
                                outline  
                                onClick={this.toggleCardType} 
                                style={{ marginBottom: '1rem' }}
                            >
                                {buttonText.text}
                            </Button> */}
                        </Stack.Item>
                    </div>
                      
                    </Stack>
                    <div style={{paddingBottom:5}}>  
                    <Stack alignment="center" >
                        <Stack.Item>
                            <div style={{padding:"0.4rem", marginBottom:5,fontWeight:"bold",fontSize:"140%", paddingBottom:'9%'}}>
                             Filter By :
                             </div>
                        </Stack.Item>
                        <Stack.Item>
                            <RadioButton
                                  
                                  id= "id1"
                                  label="Order ID"
                                  checked= {this.state.isCheckedOrd}
                                  onFocus= {this.clickOrder.bind(this)}
                            />   
                        </Stack.Item>
                        <Stack.Item>
                            
                            <RadioButton
                              label="Customer Name"
                               checked= {this.state.isCheckedCus}
                               onFocus= {this.clickCustomer.bind(this)}

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
                
                    <div className="text-center">
                        {this.state.pageOfItems.map(item =>
                            <div key={item.id}>{item.line_items[0].title}</div>
                        )}
                        <Pagination pageitems={this.state.orders} onChangePage={this.onChangePage} />
                    </div>

                    {orderArray.map((order, index) => {
                        const qrValue = order.order_number.toString();
                        const title = "Order ID: " + order.order_number;

                        if(this.state.isExpanded){
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
                </Page>
        );
    }
    }
}

export default Part2Cards;
