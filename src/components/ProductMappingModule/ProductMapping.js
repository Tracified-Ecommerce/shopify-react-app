// ProductMapping.js

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ProductMappingService from './ProductMappingService';
import axios from 'axios';
import ProductMappingTableRow from './ProductMappingTableRow';
import {
  Layout,
  Page,
  FooterHelp,
  Card,
  Link,
  Button,
  FormLayout,
  TextField,
  AccountConnection,
  ChoiceList,
  SettingToggle,
  Stack,
  Badge,
  Heading,
  PageActions,
  Select,
  Checkbox,
  Spinner, 
  DisplayText,
  TextStyle 
} from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import './AppMP.css';
import './ProductMapping.css';
import { setTimeout } from 'timers';
// import Spinner from '../../lib/components/Spinner';
import { request } from 'http';
import { Row, Col, Container} from 'reactstrap';
import Loading from '../Loading';
import { StickyContainer, Sticky } from 'react-sticky';


class ProductMapping extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isTraceListLoading: true,
      isProductListLoading: true,
      shopifyProducts: [],
      tracedata: [],
      permission: {},
      mapping: {},
      initialMapping: {}
    };

    this.productMappingService = new ProductMappingService();
    this.updateMapping = this.updateMapping.bind(this);
    this.updatePermission = this.updatePermission.bind(this);
    this.onItemChange = this.onItemChange.bind(this);
    this.onPermissionChange = this.onPermissionChange.bind(this);

  }

  updatePermission(permission, shopifyProductID) {
    this.state.permission[shopifyProductID] = permission;
    if (this.state.permission.hasOwnProperty(shopifyProductID)) {
      this.state.mapping[shopifyProductID][1] = permission;
    }

    console.log(this.state.permission);
  }
  updateMapping(tracifiedItemID, shopifyProductID) {
    console.log(shopifyProductID);
    if (this.state.permission.hasOwnProperty(shopifyProductID)) {
      this.state.mapping[shopifyProductID] = [tracifiedItemID, true];
    }
    else {
      this.state.mapping[shopifyProductID] = [tracifiedItemID, false];
    }

    console.log(this.state.mapping);

  }

  onItemChange(tracifiedItemID, shopifyProductID) {

    if (this.state.mapping.hasOwnProperty(shopifyProductID)) {
      if (!(tracifiedItemID == "noItem")) {
        this.state.mapping[shopifyProductID][0] = tracifiedItemID;
      }
      else {
        let tempMapping = this.state.mapping;
        delete tempMapping[shopifyProductID];
        this.state.mapping = tempMapping;
      }
    }
    else {
      this.state.mapping[shopifyProductID] = [tracifiedItemID, false];
    }
    console.log(this.state.mapping);
  }

  onPermissionChange(permission, shopifyProductID) {
    console.log(this.state.mapping[shopifyProductID]);
    console.log(permission);
    console.log(shopifyProductID);
    this.state.mapping[shopifyProductID][1] = permission;
    console.log(this.state.mapping);
  }


  componentDidMount() {
    axios.get('https://tracified-react-api.herokuapp.com/shopify/config/mapping')
      .then(response => {
        this.setState({
          initialMapping: response.data,
          mapping: response.data
        });
        console.log(this.state.initialMapping);

      });
    axios.get('https://tracified-react-api.herokuapp.com/shopify/shop-api/products')
      .then(response => {
        var products = response.data.products;

        products = products.reduce(function (reducedJson, product) {
          reducedJson.push({
            id: product.id,
            title: product.title

          });
          return reducedJson;
        }, []);
        this.setState({ shopifyProducts: products });

        if (response.status == 200) {
          this.setState({ isProductListLoading: false });


        }

      })
      .catch(function (error) {
        console.log(error);
      });


    axios({
      method: 'get',
      url: 'https://tracified-react-api.herokuapp.com/shopify/tracified/item-list',      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
    })
      .then(response_ => {
        this.setState({ tracedata: response_.data });
        console.log("mapping response sttus : " + response_.status);
        console.log("mapping response data : " + JSON.stringify(response_.data));

        let responseTxt = "";
        for ( const obj of response_.data) {
          const itemname = obj.itemName.replace(/\s/g, "-");
          responseTxt += obj.itemID + " : " + itemname + " , ";
      }

      this.setState({ tracedata: responseTxt });
        if (response_.status == 200) {
          this.setState({ isTraceListLoading: false });

        }
      })
      .catch(function (error) {
        console.log("error gettin mapping list :" + error);
      })
  }


  tabRow() {
    const trace = this.state.tracedata;
    if (this.state.shopifyProducts instanceof Array) {
      return this.state.shopifyProducts.map((object, i) => {
        return <ProductMappingTableRow
          onItemChange={this.onItemChange}
          onPermissionChange={this.onPermissionChange}
          obj={object}
          key={i}
          tracelist={trace}
          mapping={this.state.mapping}
        />;

      })

    }
  }

  onChange = (e) => {
    // Because we named the inputs to match their corresponding values in state, it's super easy to update the state
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }


  onSubmit = (e) => {
    e.preventDefault();
    // get our form data out of state
    const mapping = this.state.mapping;

    /**
     * write functions to adust dynamically a state attribute that holds the current selections by the user.
     * then assign that attribute to the following "mapping:" instead of "{productName, tracifiedItemID, tracifiedItemtitle, permission }"
     * means it should look like " mapping: this.state.mapping"
     * make sure that state.mapping holds the current selections
     */
    axios.post('https://tracified-react-api.herokuapp.com//shopify/config/mapping', { mapping })
      .then((result) => {
        alert("Mapping Successfully Saved!");
        console.log(result);
      });

      // axios({
      //   method: 'post',
      //   url: 'https://tracified-local-test.herokuapp.com/shopify/tracified/item-list',      headers: {
      //     'Content-Type': 'text/plain;charset=utf-8',
      //   },
      // })

  }



  render() {
    const { productName, tracifiedItemID, tracifiedItemtitle, permission, isTraceListLoading, isProductListLoading } = this.state;

    var stickyStyle={
      width:'100%',
    }

    if (isTraceListLoading || isProductListLoading) {
      return (
              <Loading/>
      );
      console.log('spinner');
    } else {
      console.log('not spinner');
    }


    return (
      <StickyContainer>
      <div class="loader" id="productmapping">

        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.1/react.js"></script>

        
          
              
        <Sticky topOffset={80}>
          {
            ({
              style,

              // the following are also available but unused in this example
              isSticky,
              wasSticky,
              distanceFromTop,
              distanceFromBottom,
              calculatedHeight
            }) => {
              return (
                <header style={style}>
                   
                </header>
              )
            }
          }
          <div className="saveBtn">
          <Row>
            <Col sm="10">
            </Col>
            <Col sm="2">
              <Button primary onClick={this.onSubmit}>Save</Button>
            </Col>
          </Row>
          </div>

          <Card title="Product Mapping Details">
            <br />
            <form>
              <table className="table table-striped">
              
              {/*Head section*/}
              {/*<div className="headSection">              */}
                <thead>
                  <tr>
                    <td >Product Name</td>
                    <td >Product Item ID</td>
                    <td >Tracified Item title</td>
                    <td >Permission</td>
                  </tr>
                </thead>
                {/*</div>*/}
                {/*end of head section*/}
                <tbody>
                   {this.tabRow()}
              </tbody>
            </table>            
            </form>
          </Card>
      
      
        </Sticky>
      </div>      
      </StickyContainer> 
    );
    <ProductMapping /> , document.getElementById('productmapping')
    
    console.log('document thing works');
    
  }


}

export default ProductMapping;
