import { Container, Card, Table} from "react-bootstrap";

const TableComponent = () => {
    return (
        <>
            <Container className="mt-4">
                <Card>
                    <Card.Header className="fw-bold pt-3 pb-3">
                        <h5 className="m-0 fw-bold float-start">Sensor's Table</h5>
                    </Card.Header>
                    <Card.Body>
                        <Table>
                            <thead>
                                <tr>
                                    <th scope="col">Type of IoT Device</th>
                                    <th scope="col">Value</th>
                                    <th scope="col">Update Date</th>
                                    <th scope="col">Alert State</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default TableComponent;