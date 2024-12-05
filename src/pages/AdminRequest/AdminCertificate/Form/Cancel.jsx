import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { toast } from 'react-toastify';
import { updateReserved } from '../../../../api/reservedApi';
import { updateRequest } from '../../../../api/requestApi';

const headerStyle = {
    p: 2,
    backgroundColor: (theme) => theme.palette.warning.main,  // Error color for header
    color: 'white',
    borderRadius: '4px 4px 0 0',  // Rounded corners for the top
};

const footerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 1,
    p: 2
};

function Cancel({ selected, onClose, handleGetData }) {

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            _id: selected._id,
            status: 'Cancelled'
        }
        await updateRequest(formData)
        toast.success("Successfully Updated")
        handleGetData()
        onClose()
    }

    return (
        <>
            <Box sx={headerStyle}>
                <Typography id="delete-modal-title" variant="h6" component="h2">
                    Cancel Confirmation
                </Typography>
            </Box>
            <Typography id="delete-modal-description" sx={{ p: 2 }}>
                Are you sure you want to cancel this item?
            </Typography>
            <Divider />
            <form onSubmit={handleSubmit}>
                <Box sx={footerStyle}>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="warning" type='submit'>
                        Submit
                    </Button>
                </Box>
            </form>
        </>
    )
}

export default Cancel