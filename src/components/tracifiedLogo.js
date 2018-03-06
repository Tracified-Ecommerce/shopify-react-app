import React, {Component} from 'react';
import TraciLogo1 from '../assets/TracifiedLogo.png';

class TracifiedLogo extends Component{
    render(){
        var logoStyle={
            height: '250px'             
        }

        var backStyle={
            backgroundColor:"black",
            textAlign: 'center',
        }

        return(
            <div style={backStyle}>
                <img src={TraciLogo1} style={logoStyle}/>
            </div>
        );
    }
}

export default TracifiedLogo;