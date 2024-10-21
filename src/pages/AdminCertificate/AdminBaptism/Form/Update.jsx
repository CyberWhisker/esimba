import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { fetchUsers } from '../../../../api/userApi'
import { AuthContext } from '../../../../context/AuthContext'
import { storeBaptism, updateBaptism } from '../../../../api/baptismApi'
import moment from 'moment'

function Update({ onClose, handleGetData, selected }) {
    const {auth} = useContext(AuthContext)
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [dataForm, setDataForm] = useState(selected)

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
        const {data, error} = await updateBaptism(dataForm)
        if (error) {
            toast.error(error)
        } else {
            toast.success("Successfully Added")
        }
        handleGetData();
        onClose()
    }

    const handleGetUser = async () => {
        setLoading(true)
        const {data, error} = await fetchUsers();
        if (error) {
            toast.error(error);
        } else {
            setUserData(data)
        }
        setLoading(false)
    }

    useEffect(() => {
        handleGetUser()
    }, [])
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ width: '60vh', p: 2 }}>
                <Stack spacing={1}>
                    <Typography variant='h4' fontWeight={'bold'}>Store Certificate</Typography>
                    <Divider/>
                    <Typography>Personal Information</Typography>
                    <TextField label='Select User' name='user' onChange={handleChange} select value={loading ? '': dataForm.user._id}>
                        {userData.map((item, index) => (
                            <MenuItem key={index} value={item._id}>{item.firstName} {item.lastName}</MenuItem>
                        ))}
                    </TextField>
                    <DatePicker label='Birth Date' name='birthDate' value={moment(dataForm.birthDate)} onChange={value => handleChangeDate('birthDate', value)}/>
                    <TextField label='Birth Address' name='birthAddress' onChange={handleChange} value={dataForm.birthAddress}/>
                    <Divider/>
                    <Typography>Mother's Information</Typography>
                    <TextField label='Full Name' name='motherName' onChange={handleChange} value={dataForm.motherName}/>
                    <Divider/>
                    <Typography>Father's Information</Typography>
                    <TextField label='Full Name' name='fatherName' onChange={handleChange} value={dataForm.fatherName}/>
                    <Divider/>
                    <Typography>Baptism Information</Typography>
                    <DatePicker label='Baptized Date' name='baptizeDate' onChange={value => handleChangeDate('baptismDate', value)} value={moment(dataForm.baptismDate)}/>
                    <TextField label='Baptized Address' name='baptizeAddress' onChange={handleChange} value={dataForm.chapel.address}/>
                    <TextField label='Priest' name='priest' onChange={handleChange} value={dataForm.priest}/>
                    <TextField label='Sponsor Name' name='sponsor1' onChange={handleChange} value={dataForm.sponsor1}/>
                    <TextField label='Sponsor Name' name='sponsor2' onChange={handleChange} value={dataForm.sponsor2}/>
                    <Button variant='contained' onClick={handleSubmit}>Submit</Button>
                </Stack>
            </Box>
        </LocalizationProvider>
    )
}

export default Update