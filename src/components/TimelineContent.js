import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';
import { Button, Stack } from '@shopify/polaris';
import { isObject } from 'util';
import { isEmpty } from "lodash";
import './timelineMediaQueries.css';

class TimelineContent extends Component {

    constructor(props) {
        super(props);
        this.height = 0;
        this.onClick = this.props.onClick;
        this.state = {
            collapseArray: this.props.collapseArray,
            isCollsapsible: false
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ collapseArray: props.collapseArray });  
    }

    componentDidMount() {
        this.height = document.getElementById(this.props.componentID).clientHeight+15;
        if(this.height > 112) {
            this.setState({isCollsapsible:true});
        }  
    }

    render() {

        var stageData = this.props.data;
        var isClosed = this.props.collapseArray[this.props.collapseArrayKey];
        var buttonText = this.props.collapseArray[this.props.collapseArrayKey] ? {text: "see less \u25B2"} : {text: "see more  \u25BC"};
        var divStyle = this.state.isCollsapsible ? (!this.state.collapseArray[this.props.collapseArrayKey] ? {overflow:"hidden", height:120, transition: 'all 0.7s ease-in-out'} : {overflow:"hidden", height:this.height, transition: 'all 0.7s ease-in-out'}) : {} ;
        var buttonCode = <p></p>;
        var seeMoreStyle = !this.props.collapseArray[this.props.collapseArrayKey] ? {background: 'linear-gradient(rgba(255,255,255,1), white)', position:'relative', bottom:'0px', boxShadow:'0px -8px 10px -1px rgba(255,255,255,1)'}: {};

        if(this.state.isCollsapsible){
            buttonCode =     <Button plain 
                                    onClick={(e) => {this.props.onClick(this.props.collapseArrayKey, isClosed)}} 
                            >
                                {buttonText.text}
                            </Button>
        }
        
        return(
            <div className="timelineContentWrapper">
                    
                <div className="componentClass" style={divStyle} id={this.props.componentID} >                
                { 
                    
                    Object.keys(stageData).map(function (key) {
                        
                        let subGroup = stageData[key];

                        if(subGroup.hasOwnProperty("value")){

                            if(isObject(subGroup.value)) {
                                console.log("found an object subGroup.value: " + subGroup.value);
                            } else {
                                console.log("not an object : " + subGroup.value);
                                return(  
                                    <div className="compClass" key={key} style={{ height:24, paddingLeft:14}}> <span className="compSpanClass" style={{fontWeight:'bold', fontSize: 14}}>&#8227; {subGroup.title} :</span> {subGroup.value}</div> 
                                ) 
                            }
                        } else {

                            return(
                                <div className="wrapperClass" key={key} style={{boxShadow:'0px 1px 5px 1px rgba(189,189,189,0.52)', margin:7, padding:5, borderRadius:4, backgroundColor:'#fafafa',marginBottom:'4%'}}>
                                <div style={{minHeight:24}}>
                                    <span style={{fontWeight:'bold', fontSize: 14, color:'green'}}>
                                        &#8227; {stageData[key].title} :
                                    </span>
                                </div>
                                    <Row>
                                    {
                                        Object.keys(subGroup).map((innerKey)=>{
                                
                                            if(isObject(subGroup[innerKey])){
                                                console.log("found an object subGroup[innerKey] : " + JSON.stringify(subGroup[innerKey]));
                                                return(
                                                    <Col key={innerKey} xs='12' sm='6'>
                                                    <div className="keyClass" style={{height:24}}><span className="spanClass" style={{fontWeight: 'bold', paddingLeft: '3em'}}>{subGroup[innerKey].title}</span> : <span className="innerSpanClass">{subGroup[innerKey].value}</span></div>
                                                    </Col>
                                                )
                                            } else {
                                                console.log("found a non object subGroup[innerKey] : " + subGroup[innerKey]);
                                            }
                                            return null;
                                            
                                        })
                                    }
                                    </Row>
                                    
                                </div>       
                            );
                           
                        }
                        
                    })
                } 
                </div>
                
                <div style={seeMoreStyle}>
                    {buttonCode}
                </div>
                   
            </div>
        );    
    
    
    }

}

export default TimelineContent;