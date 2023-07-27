import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import temp from "../img/temperature-high.png";
import humidity from "../img/humidity-high.png";

class Sensor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            value: 0,
            time: new Date().toLocaleTimeString(),
        }
    }

    render() {
        return (
            <>
                <Card className="text-center">
                    {this.props.name === "Temperature" ? (
                        <Card.Header className="fw-bold" style={{backgroundColor: '#93baff'}}>{this.props.name}: {this.state.value}</Card.Header>
                    ) : (
                        <Card.Header className="fw-bold" style={{backgroundColor: '#ffbf6c'}}>{this.props.name}: {this.state.value}</Card.Header>
                    )}
                    <Card.Body>
                        {this.props.name === "Temperature" ? (
                            <img src={temp} alt="temperature" />
                        ) : (
                            <img src={humidity} alt="humidity" />
                        )}
                    </Card.Body>
                    <Card.Footer>
                        <p className="m-0"><b>Update:</b> {this.state.time}</p>
                    </Card.Footer>
                </Card>
            </>
        );
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            fetch("http://localhost:5000/api/sensor/data?name="+this.props.name)
                .then(res => res.json())
                .then(data => {
                    let dateO = new Date(data.createdAt);
                    let dateT = dateO.toLocaleTimeString();
                    let dateD = dateO.toLocaleDateString();
                    let dateL = dateD + " " + dateT;
                    this.setState({
                        value: data.value,
                        //convert to local time
                        time: dateL,
                    });
                });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
}

export default Sensor;