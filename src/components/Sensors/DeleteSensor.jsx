import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { connect } from 'react-redux';

const DeleteForm = ({ token, sensor}) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const MySwal = withReactContent(Swal);

    const handleDelete = async () => {
        try {
            const result = await MySwal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                setIsDeleting(true);

                const response = await fetch(`http://192.168.1.200/api/sensor/delete?name=${sensor.name}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                    // You might need to set headers and handle authentication
                });

                if (response.ok) {
                    setIsDeleting(false);
                    await MySwal.fire('Deleted!', 'Your item has been deleted.', 'success');
                    // You might also need to update your UI or perform other actions after successful deletion
                } else {
                    setIsDeleting(false);
                    console.log(response);
                    await MySwal.fire('Error', 'Failed to delete the item.', 'error');
                }
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <>
            <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
        </>
    );
}

const mapStateToProps = (state, ownProps) => ({
    sensor: state.sensors.sensors.find(sensor => sensor.name === ownProps.name),
    token: state.auth.token,
});

export default connect(mapStateToProps)(DeleteForm);