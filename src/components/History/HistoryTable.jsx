import React, { useEffect, useState } from 'react';
import { Container, Card, Table } from 'react-bootstrap';
import { connect } from 'react-redux';

const HistoryTable = ({ Stype, Sname, token }) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchData();

        // Fetch data every 60 seconds
        const interval = setInterval(fetchData, 60000);

        return () => clearInterval(interval);
    }, [Stype, Sname, token]);

    const fetchData = () => {
        fetch(`http://127.0.0.1:5000/api/${Stype}/data?name=${Sname}&all=true`, {
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
                setHistory(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Container>
                <Card>
                    <Card.Header>
                        <Card.Title>History</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        {history?.length === 0 ? (
                            <p>Loading...</p>
                        ) : (
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    {Stype === 'sensor' ? (
                                        <th>Value</th>
                                    ) : (
                                        <>
                                            <th>Weight</th>
                                            <th>BMI</th>
                                            <th>Body Fat %</th>
                                            <th>Subcutaneous Fat %</th>
                                            <th>Visceral Fat</th>
                                            <th>Body Water %</th>
                                            <th>Skeletal Muscle Rate %</th>
                                            <th>Muscle Mass</th>
                                            <th>Bone Mass</th>
                                            <th>Protein %</th>
                                            <th>BMR</th>
                                        </>
                                    )}
                                    <th>Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                {history?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.value}</td>
                                        <td>{item.createdAt}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

const mapStateToProps = (state) => ({
    token: state.auth.token,
});

export default connect(mapStateToProps)(HistoryTable);
