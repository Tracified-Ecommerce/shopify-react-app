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
    <Router basename="/shopify" >
        <div>
            <Route path='/main-view' component={Logo}/>
            <Route path='/main-view' component={Tabs}/>
            <Route exact path='/add-item' component={AddItem} />
            <Route exact path='/index' component={IndexItem}/>
            <Route exact path='/edit/:id' component={EditItem} />
            <Route exact path='/product-mapping' component={ProductMapping} />
            <Route exact path='/fulfilled-orders' component={FulfilledOrdersPage} />
            <Route exact path='/install-guide' component={Install} />
            <Route exact path='/trace/:orderID/:itemID' component={Logo} />
            <Route exact path='/trace/:orderID/:itemID' component={TraceTimeLine} />
            <Route exact path='/new-trace/:orderID/:itemID' component={newTimeLine} />
            <Route exact path='/account-verify' component={AccountVerify} />
            

        </div>
    </Router>,
    document.getElementById('root')
  
);



