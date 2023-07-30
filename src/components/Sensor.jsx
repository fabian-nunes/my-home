import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import temp from "../img/temperature-high.png";
import humidity from "../img/humidity-high.png";
import scale from "../img/scale.png";

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
                        <Card.Header className="fw-bold" style={{backgroundColor: '#A1CCD1'}}>{this.props.name}: {this.state.value} ºC</Card.Header>
                    ) : this.props.name === "Humidity" ? (
                        <Card.Header className="fw-bold" style={{backgroundColor: '#F4F2DE'}}>{this.props.name}: {this.state.value} %</Card.Header>
                    ) : (
                        <Card.Header className="fw-bold" style={{backgroundColor: '#E9B384'}}>{this.props.name}: {this.state.value} Kg</Card.Header>
                    )}
                    <Card.Body>
                        {this.props.name === "Temperature" ? (
                            <img src={temp} alt="temperature" />
                        ) : this.props.name === "Humidity" ? (
                            <img src={humidity} alt="humidity" />
                        ) : (
                            <img src={scale} alt="scale"/>
                        )}
                    </Card.Body>
                    <Card.Footer>
                        <p className="m-0"><b>Update:</b> {this.state.time} - <a href="#">History</a></p>
                    </Card.Footer>
                </Card>
            </>
        );
    }

    componentDidMount() {
        this.fetchData(); // Call the function when the component is first mounted
        this.interval = setInterval(this.fetchData, 60000); // Set up the interval to call the function every 60 seconds
    }

    fetchData = () => {
        fetch("http://localhost:5000/api/" + this.props.type + "/data?name=" + this.props.name)
            .then((response) => {
                if (response.status !== 200) {
                    console.log("Error: " + response.status);
                    return;
                }
                return response.json();
            })
            .then((data) => {
                let dateO = new Date(data.createdAt);
                let dateT = dateO.toLocaleTimeString();
                let dateD = dateO.toLocaleDateString();
                let dateL = dateD + " " + dateT;
                this.setState({
                    value: data.value,
                    //convert to local time
                    time: dateL,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    }
}

export default Sensor;