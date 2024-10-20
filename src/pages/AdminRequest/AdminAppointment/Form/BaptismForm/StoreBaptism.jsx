import { Button, Divider, MenuItem, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React, { useContext, useEffect, useState } from 'react'
import { fetchUsers } from '../../../../../api/userApi'
import { toast } from 'react-toastify'
import { AuthContext } from '../../../../../context/AuthContext'
import { fetchChapelByUserId } from '../../../../../api/chapelApi'

function StoreBaptism() {
    const {auth} = useContext(AuthContext)
    const [userData, setUsersData] = useState([])
    const [formData, setFormData] = useState({
        user: '',
        parish: auth.user.parish._id,
        type: 'baptism',
        status: 'pending',
        data: {
            firstName: '',
            middleName: '',
            lastName: '',
            birthDate: null,
            baptismDate: null,
            birthAddress: '',
            motherName: '',
            fatherName: '',
            sponsor1: '',
            sponsor2: '',
            purpose: '',
        }
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        console.log(formData)
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
        console.log(auth)
    }, [])

    return (
        <>
            <Typography>Personal Information</Typography>
            <TextField select value={formData.user} onChange={handleChange} label="Select User" name='user'>
                {userData.map((item, index) => (
                    <MenuItem key={index} value={item._id}>{item.firstName} {item.lastName}</MenuItem>
                ))}
            </TextField>
            <DatePicker label='Birth Date' name='birthDate' onChange={handleDate}/>
            <TextField label='Birth Address' name='birthAddress' onChange={handleChange}/>
            <Divider/>
            <Typography>Mother's Information</Typography>
            <TextField label='First Name' name='motherFirstName' onChange={handleChange}/>
            <TextField label='Last Name' name='motherLastName' onChange={handleChange}/>
            <TextField label='Middle Name' name='motherMiddleName' onChange={handleChange}/>
            <Divider/>
            <Typography>Father's Information</Typography>
            <TextField label='First Name' name='fatherFirstName' onChange={handleChange}/>
            <TextField label='Last Name' name='fatherLastName' onChange={handleChange}/>
            <TextField label='Middle Name' name='fatherMiddleName' onChange={handleChange}/>
            <Divider/>
            <Typography>Baptism Information</Typography>
            <DatePicker label='Baptized Date' name='baptizeDate' onChange={handleDate}/>
            <TextField label='Baptized Address' name='baptizeAddress' onChange={handleChange}/>
            <TextField label='Priest' name='priest' onChange={handleChange}/>
            <TextField label='Sponsor Name' name='sponsor1' onChange={handleChange}/>
            <TextField label='Sponsor Name' name='sponsor2' onChange={handleChange}/>
            <TextField label='Book Number' name='bookNumber' onChange={handleChange}/>
            <TextField label='Page Number' name='pageNumber' onChange={handleChange}/>
            <TextField label='Line Number' name='lineNumber' onChange={handleChange}/>
            <Button variant='contained' onClick={handleSubmit}>Submit</Button>
        </>
    )
}

export default StoreBaptism