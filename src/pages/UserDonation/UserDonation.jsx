import { Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Master from '../../layouts/Master'
import { toast } from 'react-toastify'
import CustomCard from '../../components/CustomCard'
import { fetchChapelData } from '../../api/chapelApi'
import { storeDonation } from '../../api/donationApi'
import { AuthContext } from '../../context/AuthContext'

function UserDonation() {
    const {auth} = useContext(AuthContext)
    const [formData, setFormData] = useState({
        user: auth.user._id,
        amount: "",
        chapel: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { data, error } = await storeDonation(formData)

        if (error) {
            toast.error(error)
        } else {
            toast.success("Successfully Donated")
            setFormData({
                amount: "",
                chapel: ""
            })
        }
    }

    const handleFileChange = (event) =>
        setFormData({ ...formData, file: event.target.files[0] });

    return (
        <Master>
            <Stack spacing={2} >
                <Typography variant='h2' fontWeight={'bold'} textAlign={'center'}>Donation Form</Typography>
                <CustomCard>
                    <form onSubmit={handleSubmit}>
                        <Stack p={2} spacing={1}>
                            <SelectChapel handleChange={handleChange} formData={formData}/>
                            <TextField label="Amount" name='amount' onChange={handleChange} value={formData.amount}/>
                            <Divider />
                            <Typography>GCash Reciept</Typography>
                            <TextField type='file' name='file' onChange={handleFileChange} required />
                            <Button variant="contained" type="submit">Submit</Button>
                        </Stack>
                    </form>
                </CustomCard>
            </Stack>
        </Master>
    )
}

function SelectChapel({ handleChange, formData }) {
    const [chapelData, setChapelData] = useState([])

    const handleGetChapel = async () => {
        const { data, error } = await fetchChapelData()
        if (!error) {
            setChapelData(data)
        }
    }

    useEffect(() => {
        handleGetChapel()
    }, [])
    return (

        <TextField label='Select Chapel' sx={{ width: '100%' }} value={formData.chapel} name='chapel' onChange={handleChange} select required>
            {chapelData.map((item, index) => (
                <MenuItem key={index} value={item._id}>{item.chapel}</MenuItem>
            ))}
        </TextField>
    )
}

export default UserDonation