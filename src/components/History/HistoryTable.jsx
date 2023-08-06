import React, {Component} from "react";
import {Container, Card, Table} from "react-bootstrap";
import {connect} from "react-redux";

class HistoryTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [],
        };
    }

    componentDidMount() {

        fetch(`http://localhost:5000/api/${this.props.type}/data?name=${this.props.Sname}?all=true`, {
            method: 'GET',
            headers: new Headers({
                Authorization: 'Bearer ' + this.props.token,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({ history: data });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {
        const type = this.props.type;
        return (
            <>
                <Container>
                    <Card>
                        <Card.Header>
                            <Card.Title>History</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    {type === 'sensor' ? (
                                        <>
                                            <th>Value</th>
                                        </>
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
                                {this.state.history.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.value}</td>
                                        <td>{item.createdAt}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Container>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
});

export default connect(mapStateToProps)(HistoryTable);