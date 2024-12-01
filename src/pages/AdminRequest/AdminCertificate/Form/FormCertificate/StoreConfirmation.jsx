import { Divider, Stack, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React from 'react'

function StoreConfirmation({ handleChangeData, handleChangeDate, handleChange }) {
    return (
        <Stack spacing={1}>
            <Typography>Personal Information</Typography>
            <TextField label='Name' name='name' onChange={handleChangeData} required/>
            <DatePicker label='Birth Date' name='birthDate' onChange={value => handleChangeDate('birthDate', value)} required/>
            <TextField label='Birth Address' name='birthAddress' onChange={handleChangeData} />
            <Divider />
            <Typography>Mother's Information</Typography>
            <TextField label='Full Name' name='motherName' onChange={handleChangeData} required/>
            <Divider />
            <Typography>Father's Information</Typography>
            <TextField label='Full Name' name='fatherName' onChange={handleChangeData} required/>
            <Divider />
            <Typography>Confirmation Information</Typography>
            <DatePicker label='Baptized Date' name='baptizeDate' onChange={value => handleChangeDate('baptismDate', value)} />
            <TextField label='Baptized Address' name='baptizeAddress' onChange={handleChangeData} required/>
            <TextField label='Priest' name='priest' onChange={handleChangeData} required/>
            <TextField label='Sponsor Name' name='sponsor1' onChange={handleChangeData} required/>
            <TextField label='Sponsor Name' name='sponsor2' onChange={handleChangeData} required/>
            <TextField label='Purpose' name='purpose' onChange={handleChange} required />
        </Stack>
    )
}

export default StoreConfirmation