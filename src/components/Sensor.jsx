import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import temp from "../img/temperature-high.png";
import humidity from "../img/humidity-high.png";

class Sensor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temperature: 0,
            humidity: 0
        };
    }

    render() {
        return (
            <>
                <Card className="text-center">
                    {this.props.name === "Temperature" ? (
                        <Card.Header className="fw-bold" style={{backgroundColor: '#93baff'}}>{this.props.name}: {this.state.temperature}</Card.Header>
                    ) : (
                        <Card.Header className="fw-bold" style={{backgroundColor: '#ffbf6c'}}>{this.props.name}: {this.state.humidity}</Card.Header>
                    )}
                    <Card.Body>
                        {this.props.name === "Temperature" ? (
                            <img src={temp} alt="temperature" />
                        ) : (
                            <img src={humidity} alt="humidity" />
                        )}
                    </Card.Body>
                    <Card.Footer>
                        <p className="m-0"><b>Update:</b></p>
                    </Card.Footer>
                </Card>
            </>
        );
    }
}

export default Sensor;