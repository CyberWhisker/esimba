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
                    <Typography>Wife/Husband's Information</Typography>
                    <TextField label='Full Name' name='partnerName' onChange={handleChange}/>
                    <Divider/>
                    <Typography>Mother's Information</Typography>
                    <TextField label='Full Name' name='motherFirstName' onChange={handleChange}/>
                    <Divider/>
                    <Typography>Father's Information</Typography>
                    <TextField label='Full Name' name='fatherFirstName' onChange={handleChange}/>
                    <Divider/>
                    <Typography>Death Information</Typography>
                    <DatePicker label='Death Date' name='deathDate' onChange={handleChange}/>
                    <TextField label='Age' name='age' onChange={handleChange}/>
                    <TextField label='Cause of Death' name='cause' onChange={handleChange}/>
                    <DatePicker label='Death Buried' name='dateBuried' onChange={handleChange}/>
                    <TextField label='Roman Catholic Cemetery' name='romanAddress' onChange={handleChange}/>
                    <TextField label='Municipal Cemetery' name='municipalAddress' onChange={handleChange}/>
                    <TextField label='Private Cemetery' name='privateAddress' onChange={handleChange}/>
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