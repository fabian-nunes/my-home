import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import scale from '../../img/scale.png';
import { updateSensorData } from '../../redux/actions';

const Sensor = ({ sensor, token, updateSensorData }) => {
    const { name, value, time, type, color } = sensor;
    const [sensorImage, setSensorImage] = useState(null);

    useEffect(() => {
        fetchData();

        // Fetch data every 60 seconds
        const interval = setInterval(fetchData, 60000);

        return () => clearInterval(interval);
    }, [name, token, type, color]);

    useEffect(() => {
        // Fetch the specific sensor's image using the API
        fetch(`http://192.168.1.200:5000/api/sensor/image?name=${name}`, {
            method: 'GET',
        })
            .then((response) => response.blob()) // Use blob() to get image data as a Blob
            .then((imageBlob) => {
                const reader = new FileReader();
                reader.onload = () => {
                    setSensorImage(reader.result); // Set the fetched image data
                };
                reader.readAsDataURL(imageBlob);
            })
            .catch((error) => {
                console.error('Error fetching sensor image:', error);
            });
    }, [name]);

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
        <Card className="text-center">
            <Card.Header className="fw-bold" style={{ backgroundColor: color }}>
                {name}: {value}
            </Card.Header>
            <Card.Body>
                {name === 'Scale' ? (
                    <img src={scale} alt="temperature" />
                ) : (
                    sensorImage && (
                        <img
                            src={sensorImage}
                            alt="Sensor"
                        />
                    )
                )}
            </Card.Body>
            <Card.Footer>
                <p className="m-0">
                    <b>Update:</b> {time} - <a href="#">History</a>
                </p>
            </Card.Footer>
        </Card>
    );
};

const mapStateToProps = (state, ownProps) => ({
    sensor: state.sensors.sensors.find(sensor => sensor.name === ownProps.name),
    token: state.auth.token,
});

const mapDispatchToProps = {
    updateSensorData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sensor);
