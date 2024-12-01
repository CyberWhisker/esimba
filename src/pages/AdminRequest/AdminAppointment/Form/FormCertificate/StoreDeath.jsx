import { Divider, Stack, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React from 'react'

function StoreDeath({ handleChangeData, handleChangeDate, handleChange }) {
    return (
        <Stack spacing={1}>
            <Typography>Personal Information</Typography>
            <TextField label='Name' name='name' onChange={handleChangeData} required/>
            <DatePicker label='Birth Date' name='birthDate' onChange={value => handleChangeDate('birthDate', value)} />
            <TextField label='Age' name='age' onChange={handleChangeData} />
            <TextField label='Birth Address' name='birthAddress' onChange={handleChangeData} required/>
            <Divider />
            <Typography>Partner's Information</Typography>
            <TextField label='Full Name' name='partnerName' onChange={handleChangeData} required/>
            <Divider />
            <Typography>Mother's Information</Typography>
            <TextField label='Full Name' name='motherName' onChange={handleChangeData} required/>
            <Divider />
            <Typography>Father's Information</Typography>
            <TextField label='Full Name' name='fatherName' onChange={handleChangeData} required/>
            <Divider />
            <Typography>Death Information</Typography>
            <DatePicker label='Death Date' name='deathDate' onChange={value => handleChangeDate('deathDate', value)} required/>
            <TextField label='Cause of Death' name='causeOfDeath' onChange={handleChangeData} />
            <DatePicker label='Burial Date' name='burialDate' onChange={value => handleChangeDate('deathDate', value)} required/>
            <TextField label='Priest' name='priest' onChange={handleChangeData} />
            <TextField label='Roman Catholic Cemetary' name='romanCemetary' onChange={handleChange} required/>
            <TextField label='Municipal Cemetary' name='municipalCemetary' onChange={handleChangeData} required/>
            <TextField label='Private Cemetary' name='privateCemetary' onChange={handleChangeData} required/>
            <TextField label='Purpose' name='purpose' onChange={handleChange} required/>
        </Stack>
    )
}

export default StoreDeath