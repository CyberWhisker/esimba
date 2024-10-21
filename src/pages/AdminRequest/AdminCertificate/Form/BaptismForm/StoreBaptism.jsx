import { Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React, { useContext, useEffect, useState } from 'react'
import { fetchUsers } from '../../../../../api/userApi'
import { toast } from 'react-toastify'
import { AuthContext } from '../../../../../context/AuthContext'
import { fetchChapelByUserId } from '../../../../../api/chapelApi'
import { storeRequest } from '../../../../../api/requestApi'

function StoreBaptism({onClose, handleGetData}) {
    const {auth} = useContext(AuthContext)
    const [userData, setUsersData] = useState([])
    const [formData, setFormData] = useState({
        user: '',
        parish: auth.user.parish[0]._id,
        certificate: 'Baptism',
        status: 'Pending',
        request: 'Certificate',
        purpose: '',
        data: {
            birthDate: null,
            baptismDate: null,
            birthAddress: '',
            motherName: '',
            fatherName: '',
            sponsor1: '',
            sponsor2: '',
        }
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        const {data, error} = await storeRequest(formData)
        if (error) {
            toast.error(error)
        } else {
            onClose()
            handleGetData()
            toast.success("Successfully Added")
        }
    }

    const handleDate = (name, value) => {
        setFormData({
          ...formData,
          data: {
            ...formData.data,
            [name]: value
          }
        })
    }

    const handleData = (e) => {
        setFormData({
            ...formData,
            data: {
                ...formData.data,
                [e.target.name]: e.target.value
            }
        })
    }

    const getUsers = async () => {
        const {data, error} = await fetchUsers();
        if (error) {
            toast.error("Failed to fetch Users")
        } else {
            setUsersData(data)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <Stack spacing={1}>
            <Typography>Personal Information</Typography>
            <TextField select value={formData.user} onChange={handleChange} label="Select User" name='user'>
                {userData.map((item, index) => (
                    <MenuItem key={index} value={item._id}>{item.firstName} {item.lastName}</MenuItem>
                ))}
            </TextField>
            <DatePicker label='Birth Date' name='birthDate' onChange={value => handleDate('birthDate', value)}/>
            <TextField label='Birth Address' name='birthAddress' onChange={handleData}/>
            <Divider/>
            <Typography>Mother's Information</Typography>
            <TextField label='Full Name' name='motherName' onChange={handleData}/>
            <Divider/>
            <Typography>Father's Information</Typography>
            <TextField label='Full Name' name='fatherName' onChange={handleData}/>
            <Divider/>
            <Typography>Baptism Information</Typography>
            <DatePicker label='Baptized Date' name='baptismDate' onChange={value => handleDate('baptismDate', value)}/>
            <TextField label='Baptized Address' name='baptizeAddress' onChange={handleData}/>
            <TextField label='Priest' name='priest' onChange={handleData}/>
            <TextField label='Sponsor Name' name='sponsor1' onChange={handleData}/>
            <TextField label='Sponsor Name' name='sponsor2' onChange={handleData}/>
            <TextField label='Purpose' name='purpose' onChange={handleChange}/>
            <Button variant='contained' onClick={handleSubmit}>Submit</Button>
        </Stack>
    )
}

export default StoreBaptism