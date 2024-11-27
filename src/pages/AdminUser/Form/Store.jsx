import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { registerUser } from '../../../api/userApi'
import { toast } from 'react-toastify'
import { AuthContext } from '../../../context/AuthContext'

function Store({ onClose, handleGetData }) {
    const { auth } = useContext(AuthContext)
    const [dataForm, setDataForm] = useState({
        chapel: auth.user.parish._id,
        firstName: '',
        lastName: '',
        middleName: '',
        email: '',
        address: '',
        phone: '',
        role: '',
        password: '',
    })

    const handleChange = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        const { data, error } = await registerUser(dataForm)
        if (error) {
            toast.error(error)
            // onClose();
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
                <Divider />
                <Typography>Personal Information</Typography>
                <TextField label='First Name' name='firstName' onChange={handleChange} />
                <TextField label='Last Name' name='lastName' onChange={handleChange} />
                <TextField label='Middle Name' name='middleName' onChange={handleChange} />
                <TextField label='Address' name='address' onChange={handleChange} />
                <TextField label='Phone' name='phone' onChange={handleChange} />
                <Divider />
                <Typography>Account Information</Typography>
                <TextField label='Email' name='email' onChange={handleChange} />
                <TextField label='Password' name='password' onChange={handleChange} />
                <TextField label='Role' select value={dataForm.role} name='role' onChange={handleChange}>
                    <MenuItem value={2}>Admin</MenuItem>
                    <MenuItem value={3}>User</MenuItem>
                </TextField>
                <Button variant='contained' onClick={handleSubmit}>Submit</Button>
            </Stack>
        </Box>
    )
}

export default Store