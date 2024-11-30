import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { fetchUserByChapelId, fetchUsers } from '../../../../api/userApi'
import { AuthContext } from '../../../../context/AuthContext'
import { storeDeath } from '../../../../api/deathApi'

function Store({ onClose, handleGetData }) {
    const {auth} = useContext(AuthContext)
    const [userData, setUserData] = useState([]);
    const [dataForm, setDataForm] = useState({
        user: '',
        chapel: auth.user.parish._id,
        birthDate: null,
        baptismDate: null,
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

    const handleSubmit = async () => {
        const {data, error} = await storeDeath(dataForm)
        if (error) {
            toast.error(error)
        } else {
            toast.success("Successfully Added")
            handleGetData();
            onClose()
        }
    }

    const handleGetUser = async () => {
        const {data, error} = await fetchUserByChapelId(auth.user.parish._id);
        if (error) {
            toast.error(error);
        } else {
            setUserData(data)
        }
    }

    useEffect(() => {
        handleGetUser()
    },[])
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ width: '60vh', p: 2 }}>
                <Stack spacing={1}>
                    <Typography variant='h4' fontWeight={'bold'}>Store Certificate</Typography>
                    <Divider/>
                    <Typography>Owner Certificate</Typography>
                    <TextField label='Select User' name='user' onChange={handleChange} select value={dataForm.user}>
                        {userData.map((item, index) => (
                            <MenuItem key={index} value={item._id}>{item.firstName} {item.lastName}</MenuItem>
                        ))}
                    </TextField>
                    <Divider/>
                    <Typography>Personal Information</Typography>
                    <TextField label='Name' name='name' onChange={handleChange}/>
                    <DatePicker label='Birth Date' name='birthDate' onChange={value => handleChangeDate('birthDate', value)}/>
                    <TextField label='Age' name='age' onChange={handleChange}/>
                    <TextField label='Birth Address' name='birthAddress' onChange={handleChange}/>
                    <Divider/>
                    <Typography>Partner's Information</Typography>
                    <TextField label='Full Name' name='partnerName' onChange={handleChange}/>
                    <Divider/>
                    <Typography>Mother's Information</Typography>
                    <TextField label='Full Name' name='motherName' onChange={handleChange}/>
                    <Divider/>
                    <Typography>Father's Information</Typography>
                    <TextField label='Full Name' name='fatherName' onChange={handleChange}/>
                    <Divider/>
                    <Typography>Death Information</Typography>
                    <DatePicker label='Death Date' name='deathDate' onChange={value => handleChangeDate('deathDate', value)}/>
                    <TextField label='Cause of Death' name='causeOfDeath' onChange={handleChange}/>
                    <DatePicker label='Burial Date' name='burialDate' onChange={value => handleChangeDate('deathDate', value)}/>
                    <TextField label='Priest' name='priest' onChange={handleChange}/>
                    <TextField label='Roman Catholic Cemetary' name='romanCemetary' onChange={handleChange}/>
                    <TextField label='Municipal Cemetary' name='municipalCemetary' onChange={handleChange}/>
                    <TextField label='Private Cemetary' name='privateCemetary' onChange={handleChange}/>
                    <Button variant='contained' onClick={handleSubmit}>Submit</Button>
                </Stack>
            </Box>
        </LocalizationProvider>
    )
}

export default Store