import React, { useState } from 'react';
import { Box, Typography, Button, Divider, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { updateReserved } from '../../../api/reservedApi';
import { storeTransaction } from '../../../api/transactionApi';

const headerStyle = {
    p: 2,
    backgroundColor: (theme) => theme.palette.success.main,  // Error color for header
    color: 'white',
    borderRadius: '4px 4px 0 0',  // Rounded corners for the top
};

const footerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 1,
    p: 2
};

function StoreTransaction({ selected, onClose, handleGetData }) {
    const [formData, setFormData] = useState({
        user: selected.user,
        chapel: selected.parish,
        item: selected._id,
        item_type: 'Reserve',
        amount: selected.amount,
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        await storeTransaction(formData)
        toast.success("Successfully Updated")
        handleGetData()
        onClose()
    }

    const handleFileChange = (event) =>
        setFormData({ ...formData, file: event.target.files[0] });
    return (
        <>
            <Box sx={headerStyle}>
                <Typography id="delete-modal-title" variant="h6" component="h2">
                    Payment
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <TextField label="Amount" value={selected.amount || ''} fullWidth />
                <Typography id="delete-modal-description" >
                    Please Attache Gcash Reciept
                </Typography>
                <TextField type='file' name='file' onChange={handleFileChange} required fullWidth />
            </Box>
            <Divider />
            <form onSubmit={handleSubmit}>
                <Box sx={footerStyle}>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="success" type='submit'>
                        Submit
                    </Button>
                </Box>
            </form>
        </>
    )
}

export default StoreTransaction