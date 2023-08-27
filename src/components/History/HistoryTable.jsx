import React, { useEffect, useState } from 'react';
import { Container, Card, Table, Pagination } from 'react-bootstrap';
import { connect } from 'react-redux';
import ReactPaginate from "react-paginate";

const HistoryTable = ({ Stype, Sname, token }) => {
    const [history, setHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10

    useEffect(() => {
        fetchData();

        // Fetch data every 60 seconds
        const interval = setInterval(fetchData, 60000);

        return () => clearInterval(interval);
    }, [Stype, Sname, token]);

    const fetchData = () => {
        fetch(`http://192.168.1.200:5000/api/${Stype}/data?name=${Sname}&all=true`, {
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
                setTotalPages(Math.ceil(data.length / itemsPerPage));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const subset = history.slice(startIndex, endIndex);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    return (
        <>
            <Container>
                <Card>
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
                                {subset?.map((item, index) => (
                                    //if stype is sensor, only show value
                                    //if stype is scale, show all values
                                    Stype === 'sensor' ? (
                                        <tr key={index}>
                                            <td>{startIndex + index + 1}</td>
                                            <td>{item.value}</td>
                                            <td>{item.createdAt}</td>
                                        </tr>
                                    ) : (
                                        <tr key={index}>
                                            <td>{startIndex + index + 1}</td>
                                            <td>{item.weight}</td>
                                            <td>{item.bmi}</td>
                                            <td>{item.fat}</td>
                                            <td>{item.sub_fat}</td>
                                            <td>{item.visc_fat}</td>
                                            <td>{item.water}</td>
                                            <td>{item.muscle_skeleton}</td>
                                            <td>{item.mass_muscle}</td>
                                            <td>{item.bone_mass}</td>
                                            <td>{item.protein}</td>
                                            <td>{item.tmb}</td>
                                            <td>{item.createdAt}</td>
                                        </tr>
                                    )
                                ))}
                                </tbody>
                            </Table>
                        )}
                    </Card.Body>
                </Card>
                {history?.length > 0 && (
                    <Pagination className="justify-content-center mt-3"> {/* Apply Bootstrap's pagination styles */}
                        <ReactPaginate
                            pageCount={totalPages}
                            onPageChange={handlePageChange}
                            forcePage={currentPage}
                            previousLabel="Previous"
                            nextLabel="Next"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                        />
                    </Pagination>
                )}
            </Container>
        </>
    );
};

const mapStateToProps = (state) => ({
    token: state.auth.token,
});

export default connect(mapStateToProps)(HistoryTable);
