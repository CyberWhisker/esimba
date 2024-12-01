import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { updateUser } from '../../../api/userApi'
import { toast } from 'react-toastify'
import { AuthContext } from '../../../context/AuthContext'

function Update({ selected, handleGetData, onClose }) {
    const {auth} = useContext(AuthContext)
    const [formData, setFormData] = useState(selected)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { data, error } = await updateUser(formData)
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
            [e.target.name]: e.target.value
        })
    }
    return (
        <Box sx={{ width: '60vh', p: 2 }}>
            <form onSubmit={handleSubmit}>
                <Stack spacing={1}>
                    <Typography variant='h4' fontWeight={'bold'}>Update User</Typography>
                    <Divider />
                    <Typography>Personal Information</Typography>
                    <TextField label='First Name' name='firstName' onChange={handleChange} value={formData.firstName} required/>
                    <TextField label='Last Name' name='lastName' onChange={handleChange} value={formData.lastName} required/>
                    <TextField label='Middle Name' name='middleName' onChange={handleChange} value={formData.middleName} required/>
                    <TextField label='Address' name='address' onChange={handleChange} value={formData.address} required/>
                    <TextField label='Phone' name='phone' onChange={handleChange} value={formData.phone} required/>
                    <Divider />
                    <Typography>Account Information</Typography>
                    <TextField label='Email' name='email' onChange={handleChange} value={formData.email} required/>
                    <TextField label='Reset Password' name='resetPassword' onChange={handleChange} />
                    <TextField label='Role' select value={formData.role} name='role' onChange={handleChange} required>
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

export default Update