import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { updateUser } from '../../../api/userApi'
import { toast } from 'react-toastify'

function Update({selected, handleGetData, onClose}) {
    const [formData, setFormData] = useState(selected)
    const handleSubmit = async () => {
        const {data, error} = await updateUser(formData)
        if (error) {
            toast.error(error)
        } else {
            toast.success("Successfully updated")
            handleGetData();
            onClose();
        }
    }
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }
    return (
        <Box sx={{ width: '60vh', p: 2 }}>
            <Stack spacing={1}>
                <Typography variant='h4' fontWeight={'bold'}>Update User</Typography>
                <Divider/>
                <Typography>Personal Information</Typography>
                <TextField label='First Name' name='firstName' onChange={handleChange} value={formData.firstName}/>
                <TextField label='Last Name' name='lastName' onChange={handleChange} value={formData.lastName}/>
                <TextField label='Middle Name' name='middleName' onChange={handleChange} value={formData.middleName}/>
                <TextField label='Address' name='address' onChange={handleChange} value={formData.address}/>
                <TextField label='Phone' name='phone' onChange={handleChange} value={formData.phone}/>
                <Divider/>
                <Typography>Account Information</Typography>
                <TextField label='Email' name='email' onChange={handleChange} value={formData.email}/>
                <TextField label='Reset Password' name='resetPassword' onChange={handleChange}/>
                <TextField label='Role' select value={formData.role} name='role' onChange={handleChange}>
                    <MenuItem value={1}>Super Admin</MenuItem>
                    <MenuItem value={2}>Admin</MenuItem>
                    <MenuItem value={3}>User</MenuItem>
                </TextField>
                <TextField label='Subscription' select value={formData.subscription ?? ''} name='subscription' onChange={handleChange}>
                    <MenuItem value={1}>Premium</MenuItem>
                    <MenuItem value={2}>Trial</MenuItem>
                </TextField>
                <Button variant='contained' onClick={handleSubmit}>Submit</Button>
            </Stack>
        </Box>
    )
}

export default Update