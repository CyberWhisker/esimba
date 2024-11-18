import { Divider, Stack, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React from 'react'

function StoreConfirmation({ handleChangeData, handleChangeDate, handleChange }) {
    return (
        <Stack spacing={1}>
            <Typography>Personal Information</Typography>
            <TextField label='First Name' name='firstName' onChange={handleChangeData}/>
            <TextField label='Last Name' name='lastName' onChange={handleChangeData}/>
            <TextField label='Middle Name' name='middleName' onChange={handleChangeData}/>
            <DatePicker label='Birth Date' name='birthDate' onChange={value => handleChangeDate('birthDate', value)}/>
            <TextField label='Birth Address' name='birthAddress' onChange={handleChangeData}/>
            <Divider/>
            <Typography>Mother's Information</Typography>
            <TextField label='Full Name' name='motherName' onChange={handleChangeData}/>
            <Divider/>
            <Typography>Father's Information</Typography>
            <TextField label='Full Name' name='fatherName' onChange={handleChangeData}/>
            <Divider/>
            <Typography>Confirmation Information</Typography>
            <DatePicker label='Baptized Date' name='baptismDate' onChange={value => handleChangeDate('baptismDate', value)}/>
            <TextField label='Baptized Address' name='baptizeAddress' onChange={handleChangeData}/>
            <DatePicker label='Confirmation Date' name='confirmationDate' onChange={value => handleChangeDate('baptismDate', value)}/>
            <TextField label='Priest' name='priest' onChange={handleChangeData}/>
            <TextField label='Sponsor Name' name='sponsor1' onChange={handleChangeData}/>
            <TextField label='Sponsor Name' name='sponsor2' onChange={handleChangeData}/>
            <TextField label='Purpose' name='purpose' onChange={handleChange}/>
        </Stack>
    )
}

export default StoreConfirmation