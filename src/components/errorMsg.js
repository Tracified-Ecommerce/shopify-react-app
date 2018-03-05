import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TraciLogo from '../assets/TracifiedLogo.png';

class ErrorMsg extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        var logoStyle={
            height:'250px',
            width:'100%',
        }

        return (
            <div className="errorMsg-page">
                <div className="banner">
                    {/*<img src={TraciLogo} style={logoStyle}/>*/}
                </div>
                <p className="status">{this.props.errorStatus}</p>
                <p className="msg">{this.props.errorMessage}</p>
            </div>
        );
    }
}


export default ErrorMsg;
