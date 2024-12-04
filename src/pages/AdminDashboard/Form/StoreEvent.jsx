import React, { useContext, useState } from 'react';
import { Box, Typography, Button, Divider, Stack, TextField, Radio, RadioGroup, FormControlLabel, MenuItem } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { storeEvent } from '../../../api/eventApi';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../context/AuthContext';

const headerStyle = {
    p: 2,
    backgroundColor: (theme) => theme.palette.primary.main,  // Error color for header
    color: 'white',
    borderRadius: '4px 4px 0 0',  // Rounded corners for the top
};

const footerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 1,
    p: 2
};

function StoreEvent({ onClose, handleGetData }) {
    const { auth } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        parish: auth.user.parish._id
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await storeEvent(formData)
        if (error) {
            toast.error("Server Error")
        } else {
            toast.success("Successfully Inserted")
            handleGetData()
            onClose()
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleDateChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={headerStyle}>
                <Typography id="delete-modal-title" variant="h6" component="h2">
                    Store Event
                </Typography>
            </Box>
            <Stack sx={{ p: 2 }} spacing={1}>
                <TextField label="Event Name" name='event' onChange={handleChange} />
                <TextField select label="Event Type" name='event_type' defaultValue={''} onChange={handleChange}>
                    <MenuItem value='Baptism'>Baptism</MenuItem>
                    <MenuItem value='Burial'>Burial</MenuItem>
                    <MenuItem value='Marriage'>Marriage</MenuItem>
                    <MenuItem value='Confirmation'>Confirmation</MenuItem>
                </TextField>
                <Stack spacing={1} direction={'row'}>
                    <DatePicker
                        label="Start Date"
                        minDate={moment()}
                        onChange={(value) => handleDateChange('startDate', value)}
                    />
                    <DatePicker
                        label="End Date"
                        minDate={moment()}
                        onChange={(value) => handleDateChange('endDate', value)}
                    />
                </Stack>
                <TextField select label="Number of Slot" name='slot' onChange={handleChange} defaultValue={''}>
                    <MenuItem value='1'>1</MenuItem>
                    <MenuItem value='2'>2</MenuItem>
                    <MenuItem value='3'>3</MenuItem>
                    <MenuItem value='4'>4</MenuItem>
                    <MenuItem value='5'>5</MenuItem>
                </TextField>
            </Stack>
            <Divider />
            <Box sx={footerStyle}>
                <Button variant="outlined" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="contained" color="success" type='submit'>
                    Proceed
                </Button>
            </Box>
        </form>
    )
}

export default StoreEvent