import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { fetchUsers } from '../../../api/userApi'
import { storeDonation } from '../../../api/donationApi'
import { toast } from 'react-toastify'

function Store({onClose, handleGetData}) {
    const { auth } = useContext(AuthContext)

    const [ formData, setFormData ] = useState({
        chapel: auth.user.parish._id
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {data, error} = await storeDonation(formData)

        if (error) {
            toast.error(error)
        } else {
            toast.success("Successfully inserted")
            onClose()
            handleGetData()
        }
    }

    const handleFileChange = (event) =>
      setFormData({ ...formData, file: event.target.files[0] });

    return (
        <Box sx={{ width: '60vh', p: 2 }}>
            <form onSubmit={handleSubmit}>
                <Stack spacing={1}>
                    <Typography variant='h4' fontWeight={'bold'}>Update Transaction</Typography>
                    <Divider />
                    <Typography>Donation Information</Typography>
                    <SelectUsers handleChange={handleChange}/>
                    <TextField label="Amount" name='amount' onChange={handleChange}/>
                    <Divider/>
                    <Typography>GCash Reciept</Typography>
                    <TextField type='file' name='file' onChange={handleFileChange} required/>
                    <Button type='submit' variant='contained'>Submit</Button>
                </Stack>
            </form>
        </Box>
    )
}

function SelectUsers({handleChange}) {
    const [data, setData] = useState([])

    const handleGetUser = async () => {
        const { data, error } = await fetchUsers()
        if (!error) {
            setData(data)
        }
    }

    useEffect(() => {
        handleGetUser()
    }, [])

    return (
        <TextField select defaultValue={""} name='user' label="Select User" onChange={handleChange}>
            {data.map((item, index) => (
                <MenuItem key={index} value={item._id}>{item.lastName}, {item.firstName} {item.middleName}</MenuItem>
            ))}
        </TextField>
    )
}

export default Store