import React, { useState } from 'react';
import { Box, Typography, Button, Divider, Stack, TextField, MenuItem, Container } from '@mui/material';
import { toast } from 'react-toastify';
import { storePrice } from '../../../api/priceApi';

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
    px: 2
};

function Store({ selected, onClose, handleGetData }) {
    const [formData, setFormData] = useState({
        type: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await storePrice(formData)
        if (error) {
            toast.error("Something went wrong")
        } else {
            toast.success("Successfully inserted")
            onClose();
        }
        console.log(formData)
    }

    return (
        <Box>
            <Box sx={headerStyle}>
                <Typography id="delete-modal-title" variant="h6" component="h2">
                    Store Price
                </Typography>
            </Box>
            <Container sx={{
                py: 2
            }}>
                <Stack spacing={1}>
                    <TextField select label="Select Item" name='type' value={formData.type} onChange={handleChange}>
                        <MenuItem value="Baptism">Baptismal</MenuItem>
                        <MenuItem value="Burial">Burial</MenuItem>
                        <MenuItem value="Marriage">Marriage</MenuItem>
                        <MenuItem value="Confirmation">Confirmation</MenuItem>
                    </TextField>
                    <TextField label="Name" name='name' onChange={handleChange} />
                    <TextField label="Price" name='price' onChange={handleChange} />
                </Stack>
            </Container>
            <Divider />
            <form onSubmit={handleSubmit}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    gap: 1,
                    py: 1,
                    px: 2
                }}>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="success" type='submit'>
                        Submit
                    </Button>
                </Box>
            </form>
        </Box>
    )
}

export default Store