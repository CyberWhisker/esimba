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
                value={dataForm.name}
            />
            <DatePicker
                label="Birth Date"
                name="birthDate"
                value={dataForm.birthDate}
                onChange={(value) => handleChangeDate('birthDate', value)}
            />
            <TextField
                label="Age"
                name="age"
                onChange={handleChangeData}
                value={dataForm.age}
            />
            <TextField
                label="Birth Address"
                name="birthAddress"
                onChange={handleChangeData}
                value={dataForm.birthAddress}
            />
            <Divider />
            <Typography>Partner's Information</Typography>
            <TextField
                label="Partner's Full Name"
                name="partnerName"
                onChange={handleChangeData}
                value={dataForm.partnerName}
            />
            <Divider />
            <Typography>Mother's Information</Typography>
            <TextField
                label="Mother's Full Name"
                name="motherName"
                onChange={handleChangeData}
                value={dataForm.motherName}
            />
            <Divider />
            <Typography>Father's Information</Typography>
            <TextField
                label="Father's Full Name"
                name="fatherName"
                onChange={handleChangeData}
                value={dataForm.fatherName}
            />
            <Divider />
            <Typography>Marriage Information</Typography>
            <DatePicker
                label="Marriage Date"
                name="marriageDate"
                value={dataForm.deathDate}
                onChange={(value) => handleChangeDate('marriageDate', value)}
            />
            <TextField
                label="Priest"
                name="priest"
                onChange={handleChangeData}
                value={dataForm.priest}
            />
            <TextField
                label="Witness 1"
                name="witness1"
                onChange={handleChangeData}
                value={dataForm.witness1}
            />
            <TextField
                label="Witness 2"
                name="witness2"
                onChange={handleChangeData}
                value={dataForm.witness2}
            />
            <TextField label='Purpose' name='purpose' onChange={handleChange} />
        </Stack>
    )
}

export default StoreMarriage