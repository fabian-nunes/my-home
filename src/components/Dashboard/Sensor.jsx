import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import temp from '../../img/temperature-high.png';
import humidity from '../../img/humidity-high.png';
import scale from '../../img/scale.png';
import { updateSensorData } from '../../redux/actions';

const Sensor = ({ name, value, time, token, updateSensorData, type }) => {
    useEffect(() => {
        fetchData();

        // Fetch data every 60 seconds
        const interval = setInterval(fetchData, 6000);

        return () => clearInterval(interval);
    }, [name, token, type]);

    const fetchData = () => {
        fetch(`http://192.168.1.200:5000/api/${type}/data?name=${name}&all=false`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
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
                updateSensorData(name, data.value, dateL, data.alert);
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
};

const mapStateToProps = (state, ownProps) => ({
    ...state.sensors[ownProps.name],
    token: state.auth.token,
});

const mapDispatchToProps = {
    updateSensorData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sensor);
