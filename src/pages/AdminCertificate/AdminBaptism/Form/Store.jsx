import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

function Store({ onClose, handleGetData }) {
    const [dataForm, setDataForm] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        email: '',
        address: '',
        phone: '',
        role: '',
        password: '',
        subscription: '',
    })

    const handleChange = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
    }
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ width: '60vh', p: 2 }}>
                <Stack spacing={1}>
                    <Typography variant='h4' fontWeight={'bold'}>Store Certificate</Typography>
                    <Divider/>
                    <Typography>Personal Information</Typography>
                    <TextField label='First Name' name='firstName' onChange={handleChange}/>
                    <TextField label='Last Name' name='lastName' onChange={handleChange}/>
                    <TextField label='Middle Name' name='middleName' onChange={handleChange}/>
                    <DatePicker label='Birth Date' name='birthDate' onChange={handleChange}/>
                    <TextField label='Birth Address' name='birthAddress' onChange={handleChange}/>
                    <Divider/>
                    <Typography>Mother's Information</Typography>
                    <TextField label='Full Name' name='motherFirstName' onChange={handleChange}/>
                    <Divider/>
                    <Typography>Father's Information</Typography>
                    <TextField label='Full Name' name='fatherFirstName' onChange={handleChange}/>
                    <Divider/>
                    <Typography>Baptism Information</Typography>
                    <DatePicker label='Baptized Date' name='baptizeDate' onChange={handleChange}/>
                    <TextField label='Baptized Address' name='baptizeAddress' onChange={handleChange}/>
                    <TextField label='Priest' name='priest' onChange={handleChange}/>
                    <TextField label='Sponsor Name' name='sponsor1' onChange={handleChange}/>
                    <TextField label='Sponsor Name' name='sponsor2' onChange={handleChange}/>
                    <TextField label='Book Number' name='bookNumber' onChange={handleChange}/>
                    <TextField label='Page Number' name='pageNumber' onChange={handleChange}/>
                    <TextField label='Line Number' name='lineNumber' onChange={handleChange}/>
                    <Button variant='contained' onClick={handleSubmit}>Submit</Button>
                </Stack>
            </Box>
        </LocalizationProvider>
    )
}

export default Store