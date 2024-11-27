import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { fetchUsers } from '../../../api/userApi'
import { updateDonation } from '../../../api/donationApi'
import { toast } from 'react-toastify'

function Update({onClose, handleGetData, selected}) {
    const { auth } = useContext(AuthContext)
    const [ formData, setFormData ] = useState({
        ...selected,
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
        const {data, error} = await updateDonation(formData)

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
                    <SelectUsers handleChange={handleChange} formData={formData}/>
                    <TextField label="Amount" name='amount' onChange={handleChange} value={formData.amount}/>
                    <TextField select label="Status" name='status' onChange={handleChange} value={formData.status}>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Approve">Approve</MenuItem>
                    </TextField>
                    <Divider/>
                    <Typography>GCash Reciept</Typography>
                    <TextField type='file' name='file' onChange={handleFileChange}/>
                    <Button type='submit' variant='contained'>Submit</Button>
                </Stack>
            </form>
        </Box>
    )
}

function SelectUsers({handleChange, formData}) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const handleGetUser = async () => {
        const { data, error } = await fetchUsers()
        if (!error) {
            setData(data)
        }
        setLoading(true)
    }

    useEffect(() => {
        handleGetUser()
    }, [])

    return (
        <TextField select value={loading && formData.user || ""} name='user' label="Select User" onChange={handleChange}>
            {data.map((item, index) => (
                <MenuItem key={index} value={item._id}>{item.lastName}, {item.firstName} {item.middleName}</MenuItem>
            ))}
        </TextField>
    )
}

export default Update