import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import temp from '../img/temperature-high.png';
import humidity from '../img/humidity-high.png';
import scale from '../img/scale.png';
import { updateSensorData } from '../actions';

class Sensor extends Component {
    componentDidMount() {
        this.fetchData();
        this.interval = setInterval(this.fetchData, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    fetchData = () => {
        const { name, type } = this.props;
        fetch(`http://localhost:5000/api/${type}/data?name=${name}`)
            .then((response) => {
                if (response.status !== 200) {
                    console.log('Error: ' + response.status);
                    return;
                }
                return response.json();
            })
            .then((data) => {
                let dateO = new Date(data.createdAt);
                let dateT = dateO.toLocaleTimeString();
                let dateD = dateO.toLocaleDateString();
                let dateL = dateD + ' ' + dateT;
                this.props.updateSensorData(name, data.value, dateL, data.alert);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        const { name, value, time } = this.props;
        return (
            <>
                <Card className="text-center">
                    {name === 'Temperature' ? (
                        <Card.Header className="fw-bold" style={{ backgroundColor: '#A1CCD1' }}>
                            {name}: {value} ºC
                        </Card.Header>
                    ) : name === 'Humidity' ? (
                        <Card.Header className="fw-bold" style={{ backgroundColor: '#F4F2DE' }}>
                            {name}: {value} %
                        </Card.Header>
                    ) : (
                        <Card.Header className="fw-bold" style={{ backgroundColor: '#E9B384' }}>
                            {name}: {value} Kg
                        </Card.Header>
                    )}
                    <Card.Body>
                        {name === 'Temperature' ? (
                            <img src={temp} alt="temperature" />
                        ) : name === 'Humidity' ? (
                            <img src={humidity} alt="humidity" />
                        ) : (
                            <img src={scale} alt="scale" />
                        )}
                    </Card.Body>
                    <Card.Footer>
                        <p className="m-0">
                            <b>Update:</b> {time} - <a href="#">History</a>
                        </p>
                    </Card.Footer>
                </Card>
            </>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    ...state.sensors[ownProps.name],
});

const mapDispatchToProps = {
    updateSensorData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sensor);