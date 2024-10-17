import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { registerUser } from '../../../api/userApi'
import { toast } from 'react-toastify'

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
        const {data, error} = await registerUser(dataForm)
        if (error) {
            toast.error(error)
            onClose();
        } else {
            onClose()
            toast.success("Successfully added!")
            handleGetData();
        }
    }
    return (
        <Box sx={{ width: '60vh', p: 2 }}>
            <Stack spacing={1}>
                <Typography variant='h4' fontWeight={'bold'}>Store User</Typography>
                <Divider/>
                <Typography>Certificate Type</Typography>
                <TextField label='Select Certificate' name='type' value={''} select>
                    <MenuItem value='baptism'>Baptism Certificate</MenuItem>
                    <MenuItem value='death'>Death Certificate</MenuItem>
                    <MenuItem value='confirmation'>Confirmation Certificate</MenuItem>
                    <MenuItem value='marraige'>Marraige Certificate</MenuItem>
                </TextField>
                <Divider/>
                <Typography>Personal Information</Typography>
                <TextField label='First Name' name='firstName' onChange={handleChange}/>
                <TextField label='Last Name' name='lastName' onChange={handleChange}/>
                <TextField label='Middle Name' name='middleName' onChange={handleChange}/>
                <TextField label='Address' name='address' onChange={handleChange}/>
                <Divider/>
                <Typography>Mother's Information</Typography>
                <TextField label='First Name' name='motherFirstName' onChange={handleChange}/>
                <TextField label='Last Name' name='motherLastName' onChange={handleChange}/>
                <TextField label='Middle Name' name='motherMiddleName' onChange={handleChange}/>
                <Typography>Fathers's Information</Typography>
                <TextField label='First Name' name='fatherFirstName' onChange={handleChange}/>
                <TextField label='Last Name' name='fatherLastName' onChange={handleChange}/>
                <TextField label='Middle Name' name='fatherMiddleName' onChange={handleChange}/>
                <Divider/>
                <Typography>Account Information</Typography>
                <TextField label='Email' name='email' onChange={handleChange}/>
                <TextField label='Password' name='password' onChange={handleChange}/>
                <TextField label='Role' select value={dataForm.role} name='role' onChange={handleChange}>
                    <MenuItem value={1}>Super Admin</MenuItem>
                    <MenuItem value={2}>Admin</MenuItem>
                    <MenuItem value={3}>User</MenuItem>
                </TextField>
                <TextField label='Subscription' select value={dataForm.subscription} name='subscription' onChange={handleChange}>
                    <MenuItem value={1}>Premium</MenuItem>
                    <MenuItem value={2}>Trial</MenuItem>
                </TextField>
                <Button variant='contained' onClick={handleSubmit}>Submit</Button>
            </Stack>
        </Box>
    )
}

export default Store