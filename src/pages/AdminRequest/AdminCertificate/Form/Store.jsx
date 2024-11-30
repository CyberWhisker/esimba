import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { fetchUserByChapelId, fetchUsers } from '../../../../api/userApi'
import { toast } from 'react-toastify'
import StoreBaptism from './FormCertificate/StoreBaptism'
import { AuthContext } from '../../../../context/AuthContext'
import StoreDeath from './FormCertificate/StoreDeath'
import StoreMarriage from './FormCertificate/StoreMarriage'
import StoreConfirmation from './FormCertificate/StoreConfirmation'
import { storeRequest } from '../../../../api/requestApi'

function Store({ onClose, handleGetData }) {
    const { auth } = useContext(AuthContext)
    const [userData, setUserData] = useState([])
    const [formData, setFormData] = useState({
        parish: auth.user.parish._id,
        status: 'Pending',
        request: 'Certificate',
        user: '',
        certificate: '',
        data: {}
    })

    const handleClearData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            data: {}
        })
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleCombinedChange = (event) => {
        handleClearData(event);
      };

    const handleChangeData = (e) => {
        setFormData({
            ...formData,
            data: {
                ...formData.data,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleChangeDate = (name, value) => {
        setFormData({
            ...formData,
            data: {
                ...formData.data,
                [name]: value
            }
        })
    }

    const handleGetUser = async () => {
        const { data, error } = await fetchUserByChapelId(auth.user.parish._id)
        if (error) {
            toast.error("Server Error")
        } else {
            setUserData(data)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {data, error} = await storeRequest(formData)
        if (error) {
            toast.error(error)
        } else {
            toast.success("Successfully Stored")
            handleGetData()
            onClose()
        }
    }

    useEffect(() => {
        handleGetUser()
    }, [])

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ width: '60vh', p: 2 }}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={1}>
                        <Typography variant='h5' fontWeight={'bold'}>Store Request Certificate</Typography>
                        <Divider />
                        <Typography>Requester Information</Typography>
                        <TextField name='user' label="Select User" value={formData.user} select onChange={handleChange}>
                            {userData.map((item, index) => (
                                <MenuItem value={item._id} key={index}>{item.firstName} {item.middleName}. {item.lastName}</MenuItem>
                            ))}
                        </TextField>
                        <Divider />
                        <Typography>Certificate Type</Typography>
                        <TextField label="Select Certificate" name='certificate' value={formData.certificate} onChange={handleCombinedChange} select >
                            <MenuItem value="Baptism Certificate">Baptism Certificate</MenuItem>
                            <MenuItem value="Death Certificate">Death Certificate</MenuItem>
                            <MenuItem value="Marriage Certificate">Marriage Certificate</MenuItem>
                            <MenuItem value="Confirmation Certificate">Confirmation Certificate</MenuItem>
                        </TextField>
                        <Divider />
                        {formData.certificate == "Baptism Certificate" && (
                            <StoreBaptism handleChangeData={handleChangeData} handleChangeDate={handleChangeDate} formData={formData} handleChange={handleChange} />
                        )}
                        {formData.certificate == "Death Certificate" && (
                            <StoreDeath handleChangeData={handleChangeData} handleChangeDate={handleChangeDate} formData={formData} handleChange={handleChange} />
                        )}
                        {formData.certificate == "Marriage Certificate" && (
                            <StoreMarriage handleChangeData={handleChangeData} handleChangeDate={handleChangeDate} formData={formData} handleChange={handleChange} />
                        )}
                        {formData.certificate == "Confirmation Certificate" && (
                            <StoreConfirmation handleChangeData={handleChangeData} handleChangeDate={handleChangeDate} formData={formData} handleChange={handleChange} />
                        )}
                        <Button type='submit' variant='contained' color='warning'>Submit</Button>
                    </Stack>
                </form>
            </Box>
        </LocalizationProvider>
    )
}

export default Store