import React, { Component } from 'react';
import Loading from './Loading';
import * as axios from 'axios';
import ErrorPage from './ErrorPage';
import TimelineContent from './TimelineContent';
import { Timeline, TimelineEvent } from 'react-event-timeline';
import { isEmpty } from 'lodash';
import {
    Spinner,
    DisplayText,
    TextStyle,
    Card,
    Page,
    Avatar,
    Heading
} from '@shopify/polaris';
import { Row, Col, Container } from 'reactstrap';


class TraceTimeLine extends Component {

    constructor(props) {
        super(props);
        // this.handleClick = this.handleClick.bind(this);
        this.state = {
            // array: [],
            timeline: "",
            istimelineLoading: true,
            errorArray: [],
            filteredTimeline: [],
            isError: false,
        };
    }

    // handleClick = (index, isClosed) => {

    //     if (!isClosed) {
    //         //reset all values in array to false -> (sets all cards' "isOpen" attributes to false)
    //         this.state.array.fill(false);

    //     }

    //     //set only this card's collapse attribute to true
    //     var temp = this.state.array.slice();
    //     temp[index] = !(temp[index]);
    //     // replace array with modified temp array
    //     this.setState({ array: temp });

    // }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://tracified-mock-api.herokuapp.com/Traceability_data/Saaraketha-customer/timeline/1005', headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
        })
        .then(response => {
            // console.log(response.data);
            const responseData = response.data;
            let timeline = responseData.tabs[2];
            let itms = timeline.items;
            // let arr = [];

            // itms.map((e, i) => {
            //     arr.push(false);
            //     return true;
            // });

            this.setState({
                timeline: timeline,
                istimelineLoading: false,
                // array: arr
            }, () => {
                this.setState({
                    filteredTimeline: this.state.timeline.items.filter(stage => !isEmpty(stage.data))
                });
            });
        }).catch((error) => {

            if (error.response) {
                var errorMessageObj = {};

                if(error.response.data.error.startsWith("<")) {
                    errorMessageObj = {err: "internal server error"}
                } else {
                    errorMessageObj = JSON.parse(error.response.data.error);
                }
                
                console.log("timeline status : " + error.response.status + "timeline error : " + errorMessageObj.err);

                const error1 = {
                    errorStatus: error.response.status,
                    errorMessage: errorMessageObj.err
                };

                let tempErrorArray = []
                tempErrorArray.push(error1);

                this.setState({
                    errorArray: tempErrorArray,
                    isError: true,
                });

                this.setState({
                    istimelineLoading: false,
                });
            } else {
                console.error("error in timeline : " + error);
            }
        });

    }

    render() {

        

        let timelineTopStyle = {
            backgroundColor: 'rgba(0,0,0,0.8)',
            height: 90,
            width: 220,
            marginLeft: 10,
            padding: 10
        };

        if (this.state.istimelineLoading) {
            return <Loading />;
        }
        else if (this.state.isError) {
            console.log("inside timeline iserror block");
            console.log("errorArrray : " + this.state.errorArray);
            return <ErrorPage errors={this.state.errorArray} />;
        } else {
            return (
                <div className="traceTimelineWrapper" style={{ backgroundColor: '#f4f6f8' }}>
                    <div style={timelineTopStyle}>
                        <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '5px', fontSize: '15px' }}>
                            <span style={{ color: 'white' }}>
                                Traci
                            </span>
                            <span style={{ color: 'green' }}>
                                fied
                            </span>
                        </h1>

                        <p style={{ color: 'white', fontSize: 14, textAlign: 'center', marginBottom: 1 }}>Order ID:&nbsp;{this.props.match.params.orderID}</p>
                        <p style={{ color: 'white', fontSize: 14, textAlign: 'center', marginBottom: 1 }}>Item Name:&nbsp;{this.props.match.params.itemName}</p>

                    </div>
                    <div style={{ paddingLeft: 30 }}>
                        <Timeline>
                            {
                                this.state.filteredTimeline.map((stage, index) => {

                                if(isEmpty(stage.data)) {
                                    console.log("stage is empty");
                                }
                                // } else {
                                    let titleText = (index + 1) + ". " + stage.title;
                                let descriptionText = stage.description;

                                var ico = (<svg height="30" width="30" >
                                    <image width="30" height="30" xlinkHref={stage.icon} />
                                </svg>);

                                var stageData = stage.data;

                                return (
                                    <TimelineEvent
                                        key={index}
                                        title={titleText}
                                        titleStyle={{ fontSize: 17, fontWeight: "bold" }}
                                        subtitle={descriptionText}
                                        subtitleStyle={{ fontSize: 15 }}
                                        icon={ico}
                                        contentStyle={{ fontSize: 13 }}
                                        bubbleStyle={{ border: "none" }}
                                    // onclick={this.showMessage}
                                    >

                                        <div id={index}>
                                            <TimelineContent
                                                // collapseArray={this.state.array}
                                                // collapseArrayKey={index}
                                                data={stageData}
                                                componentID={"component" + index}
                                                // onClick={this.handleClick}
                                            />
                                        </div>
                                    </TimelineEvent>
                                );
                                // }
                            })}
                        </Timeline>
                    </div>
                </div>
            );
        }
    }
}

export default TraceTimeLine;
