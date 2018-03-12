import React, { Component } from 'react';
import {Tabs} from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import SubTabs from './subTabs';
import Installation from './Install';
import Mapping from './ProductMappingModule/ProductMapping';
import ErrorMsg from './errorMsg';


class TabsView extends Component {
  constructor(props) {
    super(props);

    this.handleTabChange = this.handleTabChange.bind(this);

    this.state = {
      selectedTab: 0,
    };
  }

  handleTabChange(selectedTab) {
    this.setState({selectedTab});
  }

  render() {
    const {selectedTab} = this.state;
    
    const error1 = {
      errorStatus:"404",
      errorMessage:"Page not found"
    };
    const error2 = {
      errorStatus:"405",
      errorMessage:"Five found five"
    };

    let errorArray = [];

    errorArray.push(error1);
    errorArray.push(error2);

    const tabs = [
      {
        id: 'tab1',
        title: 'Order Details',
        panelID: 'panel2',
      },
      {
        id: 'tab2',
        title: 'Settings',
        panelID: 'panel2',
      },
      {
        id: 'tab3',
        title: 'Configuration',
        panelID: 'panel2',
      },
      {
        id: 'tab4',
        title: 'Error msg',
        panelID: 'panel4',
      },
    ];

    const tabPanels = [
      (
        <Tabs.Panel id="panel1">
          <SubTabs/>
        </Tabs.Panel>
      ),
      (
        <Tabs.Panel id="panel2">
          <Mapping/>
        </Tabs.Panel>
      ),
      (
        <Tabs.Panel id="panel3">
          <Installation/>
        </Tabs.Panel>
      ),
      (
        <Tabs.Panel id="panel4">
          <ErrorMsg errors={errorArray}/>
        </Tabs.Panel>
      ),
    ];

    return (
      <div>
        <Tabs
          selected={selectedTab}
          tabs={tabs}
          onSelect={this.handleTabChange}
        />
        {tabPanels[selectedTab]}
      </div>
    );
  }
}

export default TabsView;