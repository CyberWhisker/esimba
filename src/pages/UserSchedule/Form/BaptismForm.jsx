import { Button, Card, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Master from '../../../layouts/Master'
import { ArrowBackRounded } from '@mui/icons-material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { fetchChapelData } from '../../../api/chapelApi'
import { storeRequest } from '../../../api/requestApi'
import { AuthContext } from '../../../context/AuthContext'

function BaptismForm() {
  const navigate = useNavigate();
  return (
    <Master>
      <Stack sx={{py: 4}} spacing={2}>
        <Stack direction={'row'} spacing={2}>
          <Button startIcon={<ArrowBackRounded/>} variant='contained' onClick={() => navigate(-1)}>Go Back</Button>
          <Typography variant='h4' fontWeight={'bold'}>Fill-out Form: Baptism</Typography>
        </Stack>
        <Card elevation={5} sx={{
          padding: 2,
          backgroundColor: 'rgba(128, 0, 0, 0.5)', 
          backdropFilter: 'blur(10px)', 
          boxShadow: 'none', 
          transition: 'background-color 0.3s ease',
        }}>
          <FormSection/>
        </Card>
      </Stack>
    </Master>
  )
}

function FormSection () {
  const {auth} = useContext(AuthContext)
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    user: auth.user._id,
    parish: '',
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
      data: {
        ...formData.data,
        [e.target.name]: e.target.value
      }
    });
  }

  const handleChangeRequest = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
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

  const handleSubmit = async () => {
    const {data, error} = await storeRequest(formData);
    if (error) {
      toast.error(error)
    } else {
      toast.success("Successfully Created")
    }
  }

  const handleGetParish = async () => {
    const {data, error} = await fetchChapelData();
    setData(data)
  }

  useEffect(() => {
    handleGetParish()
  }, [])
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <form>
        <Stack spacing={2}>
          <Stack direction={'row'} spacing={2}>
            <TextField label='First Name' sx={{width: '100%'}} name='firstName' value={formData.data.firstName} onChange={handleChange}/>
            <TextField label='Middle Name' sx={{width: '100%'}} name='middleName' value={formData.data.middleName} onChange={handleChange}/>
            <TextField label='Last Name' sx={{width: '100%'}} name='lastName' value={formData.data.lastName} onChange={handleChange}/>
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <DatePicker label='Date of Birth' sx={{width: '100%'}} name='birthDate' value={formData.data.birthDate} onChange={value => handleDate('birthDate', value)}/>
            <DatePicker label='Date of Baptism' sx={{width: '100%'}} name='baptismDate' value={formData.data.baptismDate} onChange={value => handleDate('baptismDate', value)}/>
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <TextField label='Place of Birth' sx={{width: '100%'}} name='birthAddress' value={formData.data.birthAddress} onChange={handleChange}/>
            <TextField label='Name of Parish' sx={{width: '100%'}} select name='parish' value={formData.parish} onChange={handleChangeRequest}>
              {data.map((item, index) => (
                <MenuItem key={index} value={item._id}>{item.chapel}</MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <TextField label="Mother's Name" sx={{width: '100%'}} name='motherName' value={formData.data.motherName} onChange={handleChange}/>
            <TextField label="Father's Name" sx={{width: '100%'}} name='fatherName' value={formData.data.fatherName} onChange={handleChange}/>
          </Stack>
          <Stack spacing={2} direction={'row'}>
            <TextField label='Sponsor Name' sx={{width: '100%'}} name='sponsor1' value={formData.data.sponsor1} onChange={handleChange}/>
            <TextField label='Sponsor Name' sx={{width: '100%'}} name='sponsor2' value={formData.data.sponsor2} onChange={handleChange}/>
          </Stack>
          <TextField label='Purpose' name='purpose' value={formData.data.purpose} onChange={handleChange}/>
          <Button variant='contained' onClick={handleSubmit}>Submit</Button>
        </Stack>
      </form>
    </LocalizationProvider>
  )
}

export default BaptismForm