import { Divider, Stack, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React from 'react'

function StoreMarriage({ handleChangeData, handleChangeDate, handleChange }) {
    return (
        <Stack spacing={1}>
            <Typography>Personal Information</Typography>
            <TextField
                label="Name"
                name="name"
                onChange={handleChangeData}
                required
            />
            <DatePicker
                label="Birth Date"
                name="birthDate"
                onChange={(value) => handleChangeDate('birthDate', value)}
            />
            <TextField
                label="Age"
                name="age"
                onChange={handleChangeData}
                required
            />
            <TextField
                label="Birth Address"
                name="birthAddress"
                onChange={handleChangeData}
                required
            />
            <Divider />
            <Typography>Partner's Information</Typography>
            <TextField
                label="Partner's Full Name"
                name="partnerName"
                onChange={handleChangeData}
                required
            />
            <Divider />
            <Typography>Mother's Information</Typography>
            <TextField
                label="Mother's Full Name"
                name="motherName"
                onChange={handleChangeData}
                required
            />
            <Divider />
            <Typography>Father's Information</Typography>
            <TextField
                label="Father's Full Name"
                name="fatherName"
                onChange={handleChangeData}
                required
            />
            <Divider />
            <Typography>Marriage Information</Typography>
            <DatePicker
                label="Marriage Date"
                name="marriageDate"
                onChange={(value) => handleChangeDate('marriageDate', value)}
            />
            <TextField
                label="Priest"
                name="priest"
                onChange={handleChangeData}
                required
            />
            <TextField
                label="Witness 1"
                name="witness1"
                onChange={handleChangeData}
                required
            />
            <TextField
                label="Witness 2"
                name="witness2"
                onChange={handleChangeData}
                required
            />
            <TextField label='Purpose' name='purpose' onChange={handleChange} required />
        </Stack>
    )
}

export default StoreMarriage