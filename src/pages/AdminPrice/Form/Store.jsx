import React from 'react';
import { Box, Typography, Button, Divider, Stack, TextField, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';

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

function Store({ selected, onClose, handleGetData }) {

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <>
            <Box sx={headerStyle}>
                <Typography id="delete-modal-title" variant="h6" component="h2">
                    Store Price
                </Typography>
            </Box>
            <Stack spacing={1}>
                <TextField select label="Select Item">
                    <MenuItem value="Baptism">Baptism</MenuItem>
                    <MenuItem value="Burial">Burial</MenuItem>
                    <MenuItem value="Marriage">Marriage</MenuItem>
                    <MenuItem value="Confirmation">Confirmation</MenuItem>
                    <MenuItem value="Baptism">Baptism</MenuItem>
                </TextField>
            </Stack>
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

export default Store