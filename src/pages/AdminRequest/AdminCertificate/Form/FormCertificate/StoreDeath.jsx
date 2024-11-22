import { Divider, Stack, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React from 'react'

function StoreDeath({ handleChangeData, handleChangeDate, handleChange }) {
    return (
        <Stack spacing={1}>
            <Typography>Personal Information</Typography>
            <TextField label='Full Name' name='name' onChange={handleChangeData}/>
            <DatePicker label='Birth Date' name='birthDate' onChange={value => handleChangeDate('birthDate', value)} />
            <TextField label='Birth Address' name='birthAddress' onChange={handleChangeData} />
            <Divider />
            <Typography>Mother's Information</Typography>
            <TextField label='Full Name' name='motherName' onChange={handleChangeData} />
            <Divider />
            <Typography>Father's Information</Typography>
            <TextField label='Full Name' name='fatherName' onChange={handleChangeData} />
            <Divider />
            <Typography>Spouse's Information</Typography>
            <TextField label='Full Name' name='spouseName' onChange={handleChangeData} />
            <Divider />
            <Typography>Death Information</Typography>
            <DatePicker label='Baptized Date' name='baptismDate' onChange={value => handleChangeDate('baptismDate', value)} />
            <DatePicker label='Death Date' name='deathDate' onChange={value => handleChangeDate('baptismDate', value)} />
            <TextField label='Death Address' name='deathAddress' onChange={handleChangeData} />
            <TextField label='Priest' name='priest' onChange={handleChangeData} />
            <TextField label='Sponsor Name' name='sponsor1' onChange={handleChangeData} />
            <TextField label='Sponsor Name' name='sponsor2' onChange={handleChangeData} />
            <TextField label='Purpose' name='purpose' onChange={handleChange} />
        </Stack>
    )
}

export default StoreDeath