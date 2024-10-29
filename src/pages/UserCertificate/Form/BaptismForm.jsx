import { Box, Button, Card, Divider, Grid2, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Master from '../../../layouts/Master'
import { ArrowBackRounded } from '@mui/icons-material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useNavigate } from 'react-router-dom'
import { PDFViewer } from '@react-pdf/renderer'
import Baptism from '../../../layouts/Pdf/Baptism'
import { AuthContext } from '../../../context/AuthContext'
import { storeTransaction } from '../../../api/transactionApi'
import { toast } from 'react-toastify'
import { fetchChapelData } from '../../../api/chapelApi'

function BaptismForm() {
  const navigate = useNavigate();
  return (
    <Master>
      <Stack sx={{py: 1}} spacing={2}>
        <Stack direction={'row'} spacing={2}>
          <Button startIcon={<ArrowBackRounded/>} variant='contained' onClick={() => navigate(-1)}>Go Back</Button>
          <Typography variant='h4' fontWeight={'bold'}>Baptism Certificate Request</Typography>
        </Stack>
        <Card elevation={5} sx={{
          padding: 2,
          backgroundColor: 'rgba(128, 0, 0, 0.5)', 
          backdropFilter: 'blur(10px)', 
          boxShadow: 'none', 
          transition: 'background-color 0.3s ease',
        }}>
          {/* <FormSection/> */}
          <Grid2 container spacing={2}>
            <Grid2 >
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Document/>
              </Box>
            </Grid2>
            <Grid2 size='grow'>
              <Box sx={{justifyContent: 'center'}}>
                <FormSection/>
              </Box>
            </Grid2>
          </Grid2>
        </Card>
      </Stack>
    </Master>
  )
}

function FormSection () {
  const {auth} = useContext(AuthContext)
  const [requestFrom, setRequestForm] = useState({
    parish: ''
  })
  const [parishData, setParishData] = useState([])
  const [dataForm, setDataForm] = useState({
    user: auth.user._id,
    amount: 100,
    status: 'pending',
  })

  const handleRequestChange = (e) => {
    setRequestForm({
      ...requestFrom,
      [e.target.name]: e.target.value
    })
  }

  const handleRequestDate = (name, value) => {
    setRequestForm({
      ...requestFrom,
      [name]: value
    })
  }

  const handleFileChange = (event) => 
    setDataForm({ ...dataForm, file: event.target.files[0]});

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(requestFrom)
    // const {data, error} = storeTransaction(dataForm)

    // if (error) {
    //   toast.error(error)
    // } else {
    //   toast.success("Successfully Submitted")
    // }
  }

  const handleGetParish = async () => {
    const {data, error} = await fetchChapelData();
    if (error) {
      toast.error(error)
    } else {
      setParishData(data)
    }
  }

  useEffect(() => {
    handleGetParish()
  },[])

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <form  style={{width: '100%'}} onSubmit={handleSubmit}>
        <Stack direction={'column'} spacing={1}>
          <Divider/>
          <Typography variant='h4' fontWeight={'bold'}>Personal Information</Typography>
          <Stack direction={'row'} spacing={2}>
            <TextField label='First Name' sx={{width: '100%'}} name='firstName' onChange={handleRequestChange}/>
            <TextField label='Middle Name' sx={{width: '100%'}} name='middleName' onChange={handleRequestChange}/>
            <TextField label='Last Name' sx={{width: '100%'}} name='lastName' onChange={handleRequestChange}/>
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <DatePicker label='Date of Birth' sx={{width: '100%'}} name='birthDate' onChange={value => handleRequestDate('birthDate', value)}/>
            <DatePicker label='Date of Baptism' sx={{width: '100%'}} name='baptismDate' onChange={value => handleRequestDate('baptismDate', value)}/>
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <TextField label='Place of Birth' sx={{width: '100%'}} name='birthAddress' onChange={handleRequestChange}/>
            <TextField label='Name of Parish' sx={{width: '100%'}} select name='parish' onChange={handleRequestChange} value={requestFrom.parish}>
              {parishData.map((item,index) => (
                <MenuItem value={item._id} key={index}>{item.chapel}</MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <TextField label="Mother's Name" sx={{width: '100%'}} name='motherName' onChange={handleRequestChange}/>
            <TextField label="Father's Name" sx={{width: '100%'}} name='fatherName' onChange={handleRequestChange}/>
          </Stack>
          <Stack spacing={2} direction={'row'}>
            <TextField label='Sponsor Name' sx={{width: '100%'}} name='sponsor1' onChange={handleRequestChange}/>
            <TextField label='Sponsor Name' sx={{width: '100%'}} name='sponsor2' onChange={handleRequestChange}/>
          </Stack>
          <TextField label='Purpose' name='purpose' onChange={handleRequestChange}/>

          <Divider/>
          <Typography variant='h4' fontWeight={'bold'}>Payment</Typography>
          <Typography>Account Information</Typography>
          <Stack direction={'row'} spacing={2}>
            <TextField label='Gcash Number' value='09123456789' sx={{width: '100%'}} disabled/>
            <TextField label='Amount' value='100' sx={{width: '100%'}} disabled/>
          </Stack>
          <Divider/>
          <Typography>Upload GCash Reciept</Typography>
          <TextField type='file' name='file' onChange={handleFileChange}/>
          <Button type='submit' variant='contained' color='warning'>Proceed</Button>
        </Stack>
      </form>
    </LocalizationProvider>
  )
}

function Document () {
  return (
    <Stack spacing={2}>
      <PDFViewer height={400}>
        <Baptism selected={[]}/>
      </PDFViewer>
      <Button variant='contained' color='error' disabled>Not Available</Button>
    </Stack>
  )
}

export default BaptismForm