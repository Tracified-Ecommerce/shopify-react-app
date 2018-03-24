import React , {Component} from 'react';
import ReactDOM from 'react-dom';

import router from 'router';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App';
import AddItem from './components/AddItem';
import IndexItem from './components/IndexItem';
import EditItem from './components/EditItem';
import Tabs from './components/TabsView';
import FulfilledOrdersPage from './components/FulfilledOrdersPage';
import AccountVerify from './components/AccountVerify';
import TraceTimeLine from './components/TraceTimeLine';
import Logo from './components/tracifiedLogo';
import ProductMapping from './components/ProductMappingModule/ProductMapping';
import Install from './components/Install';
import '@shopify/polaris/styles.css';
import newTimeLine from './components/newTimeLine';

ReactDOM.render(
    <Router basename="/tracified" >
        <div>
            {/* routes for shopify*/}
            <Route path='/shopify/main-view' component={Logo}/>
            <Route path='/shopify/main-view' render={(props) => <Tabs {...props} shopType={"SHOPIFY"} />} />
            <Route exact path='/shopify/add-item' component={AddItem} />
            <Route exact path='/shopify/index' component={IndexItem}/>
            <Route exact path='/shopify/edit/:id' component={EditItem} />
            <Route exact path='/shopify/product-mapping' component={ProductMapping} />
            <Route exact path='/shopify/fulfilled-orders' component={FulfilledOrdersPage} />
            <Route exact path='/shopify/install-guide' component={Install} />
            <Route exact path='/shopify/trace/:orderID/:itemID' component={Logo} />
            <Route exact path='/shopify/trace/:orderID/:itemID' component={TraceTimeLine} />
            <Route exact path='/shopify/new-trace/:orderID/:itemID' component={newTimeLine} />
            <Route exact path='/shopify/account-verify' component={AccountVerify} />

            {/* routes for woocommerce*/}
            <Route path='/woocommerce/main-view' component={Logo}/>
            <Route path='/woocommerce/main-view' render={(props) => <Tabs {...props} shopType={"WOOCOMMERCE"} />} />
            <Route exact path='/woocommerce/add-item' component={AddItem} />
            <Route exact path='/woocommerce/index' component={IndexItem}/>
            <Route exact path='/woocommerce/edit/:id' component={EditItem} />
            <Route exact path='/woocommerce/product-mapping' component={ProductMapping} />
            <Route exact path='/woocommerce/fulfilled-orders' component={FulfilledOrdersPage} />
            <Route exact path='/woocommerce/install-guide' component={Install} />
            <Route exact path='/woocommerce/trace/:orderID/:itemID' component={Logo} />
            <Route exact path='/woocommerce/trace/:orderID/:itemID' component={TraceTimeLine} />
            <Route exact path='/woocommerce/new-trace/:orderID/:itemID' component={newTimeLine} />
            <Route exact path='/woocommerce/account-verify' component={AccountVerify} />
        </div>
    </Router>,
    document.getElementById('root')
  
);



