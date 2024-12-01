import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { fetchUserByChapelId, fetchUsers } from '../../../../api/userApi'
import { AuthContext } from '../../../../context/AuthContext'
import { storeBaptism } from '../../../../api/baptismApi'

function Store({ onClose, handleGetData }) {
    const { auth } = useContext(AuthContext)
    const [userData, setUserData] = useState([]);
    const [dataForm, setDataForm] = useState({
        user: '',
        chapel: auth.user.parish._id,
        birthDate: '',
        baptismDate: '',
        birthAddress: '',
        motherName: '',
        fatherName: '',
        sponsor1: '',
        sponsor2: '',
    })

    const handleChange = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeDate = (name, value) => {
        setDataForm({
            ...dataForm,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { data, error } = await storeBaptism(dataForm)
        if (error) {
            toast.error(error)
        } else {
            toast.success("Successfully Added")
        }
        handleGetData();
        onClose()
    }

    const handleGetUser = async () => {
        const { data, error } = await fetchUserByChapelId(auth.user.parish._id);
        if (error) {
            toast.error(error);
        } else {
            setUserData(data)
        }
    }

    useEffect(() => {
        handleGetUser()
    })
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ width: '60vh', p: 2 }}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={1}>
                        <Typography variant='h4' fontWeight={'bold'}>Store Certificate</Typography>
                        <Divider />
                        <TextField label='Select User' name='user' onChange={handleChange} select value={dataForm.user} required>
                            {userData.map((item, index) => (
                                <MenuItem key={index} value={item._id}>{item.firstName} {item.lastName}</MenuItem>
                            ))}
                        </TextField>
                        <Divider />
                        <Typography>Personal Information</Typography>
                        <TextField label='Name' name='name' onChange={handleChange} required />
                        <DatePicker label='Birth Date' name='birthDate' onChange={value => handleChangeDate('birthDate', value)} />
                        <TextField label='Birth Address' name='birthAddress' onChange={handleChange} required />
                        <Divider />
                        <Typography>Mother's Information</Typography>
                        <TextField label='Full Name' name='motherName' onChange={handleChange} required />
                        <Divider />
                        <Typography>Father's Information</Typography>
                        <TextField label='Full Name' name='fatherName' onChange={handleChange} required />
                        <Divider />
                        <Typography>Baptism Information</Typography>
                        <DatePicker label='Baptized Date' name='baptizeDate' onChange={value => handleChangeDate('baptismDate', value)} />
                        <TextField label='Baptized Address' name='baptizeAddress' onChange={handleChange} required />
                        <TextField label='Priest' name='priest' onChange={handleChange} required />
                        <TextField label='Sponsor Name' name='sponsor1' onChange={handleChange} required />
                        <TextField label='Sponsor Name' name='sponsor2' onChange={handleChange} required />
                        <TextField label='Purpose' name='purpose' onChange={handleChange} required />
                        <Button variant='contained' type='submit'>Submit</Button>
                    </Stack>
                </form>
            </Box>
        </LocalizationProvider>
    )
}

export default Store