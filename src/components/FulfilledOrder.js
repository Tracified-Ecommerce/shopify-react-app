import React, { Component } from 'react';
import { Button, Select } from '@shopify/polaris';
import { EmbeddedApp, Alert, Modal } from '@shopify/polaris/embedded';
import FulfilledOrdersPage from './FulfilledOrdersPage';

class FulfilledOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNumber: this.props.order.order_number,
            itemID: this.props.order.lineItems[0].product_id,
            open: true
        };
        this.onSelectItem = this.onSelectItem.bind(this);
        this.onTraceSelect = this.onTraceSelect.bind(this);
    }

    onSelectItem(itemID, orderNumber) {
        this.setState({ itemID: itemID });
    }

    onTraceSelect() {
        alert("Item id : " + this.state.itemID + " Order Number : " + this.state.orderNumber);
    }

    render() {
        const order = this.props.order;
        var itemOptions = [];
        order.lineItems.forEach(item => {
            itemOptions.push({
                value: item.product_id,
                label: item.title
            });
        });
        return (
            
           
              <tr>
                  
                <td>
                    {order.order_number}
                </td>
                <td>
                    {order.customer}
                </td>
                <td>
                    <Select
                        options={itemOptions}
                        placeholder="Select an Item to view"
                        id={order.order_number}
                        onChange={this.onSelectItem}
                        value={this.state.itemID}
                    />
                </td>
                <td>
                    <Button size="slim" onClick={this.onTraceSelect}>View Trace More Timeline</Button>
                    <EmbeddedApp
                        apiKey="YOUR_APP_API_KEY"
                        shopOrigin="https://CURRENT_LOGGED_IN_SHOP.myshopify.com"
                    >
                        <Modal
                            src="https://my-app.com/update-information"
                            open={this.state.open}
                            title="Edit account information"
                            primaryAction={{
                                content: 'Update account',
                                onAction: () => this.setState({ open: false }),
                            }}
                            secondaryActions={[{
                                content: 'Change account',
                                onAction: () => this.setState({ open: false }),
                            }]}
                            onClose={() => this.setState({ open: false })}
                        />
                    </EmbeddedApp>
                </td>
            </tr>            
        );
    }
}

export default FulfilledOrder;

{/* <Card>
<Row>
    <Col sm="2">
        <span style={{textAlign:'center'}}>{order.order_number}</span>
    </Col>
    <Col sm="3">
        <span>{order.customer}</span>
    </Col>
    <Col sm="4">
        <Select
            options={itemOptions}
            placeholder="Select an Item to view"
        />
    </Col>
    <Col sm="3">
        <Button>View Trace More Timeline</Button>
    </Col>
</Row>
</Card> */}