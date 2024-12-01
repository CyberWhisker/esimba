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

    const handleSubmit = async (e) => {
        e.preventDefault()
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
            <form onSubmit={handleSubmit}>
                <Stack spacing={1}>
                    <Typography variant='h4' fontWeight={'bold'}>Store User</Typography>
                    <Divider />
                    <Typography>Personal Information</Typography>
                    <TextField label='First Name' name='firstName' onChange={handleChange} required />
                    <TextField label='Last Name' name='lastName' onChange={handleChange} required />
                    <TextField label='Middle Name' name='middleName' onChange={handleChange} required />
                    <TextField label='Address' name='address' onChange={handleChange} required />
                    <TextField label='Phone' name='phone' onChange={handleChange} required />
                    <Divider />
                    <Typography>Account Information</Typography>
                    <TextField label='Email' name='email' onChange={handleChange} required />
                    <TextField label='Password' name='password' onChange={handleChange} required />
                    <TextField label='Role' select value={dataForm.role} name='role' onChange={handleChange} required>
                        {auth.user.role == 1 && <MenuItem value={1}>Super Admin</MenuItem>}
                        <MenuItem value={2}>Admin</MenuItem>
                        <MenuItem value={3}>User</MenuItem>
                    </TextField>
                    <Button variant='contained' type='submit'>Submit</Button>
                </Stack>
            </form>
        </Box>
    )
}

export default Store