import { Box, Button, Card, Divider, Grid2, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Master from '../../../layouts/Master'
import { ArrowBackRounded } from '@mui/icons-material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useNavigate } from 'react-router-dom'
import { PDFViewer } from '@react-pdf/renderer'
import { AuthContext } from '../../../context/AuthContext'
import { toast } from 'react-toastify'
import { fetchChapelById, fetchChapelData } from '../../../api/chapelApi'
import { storeRequest } from '../../../api/requestApi'
import { storeTransaction } from '../../../api/transactionApi'
import Baptism from '../../../layouts/Pdf/Baptism'
import AlertModalLarge from '../../../components/AlertModalLarge'
import ViewBaptism from './Form/ViewBaptism'

function BaptismForm() {
  const navigate = useNavigate();
  return (
    <Master>
      <Stack sx={{ py: 1 }} spacing={2}>
        <Stack direction={'row'} spacing={2}>
          <Button startIcon={<ArrowBackRounded />} variant='contained' onClick={() => navigate(-1)}>Go Back</Button>
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
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Document />
              </Box>
            </Grid2>
            <Grid2 size='grow'>
              <Box sx={{ justifyContent: 'center' }}>
                <FormSection />
              </Box>
            </Grid2>
          </Grid2>
        </Card>
      </Stack>
    </Master>
  )
}

function FormSection() {
  const { auth } = useContext(AuthContext)
  const [viewModal, setViewModal] = useState(false)
  const [formData, setFormData] = useState({
    user: auth.user._id,
    request: 'Certificate',
    certificate: 'Baptism Certificate',
    amount: '200'
  })

  const handleRequestChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleDataChange = (e) => {
    setFormData({
      ...formData,
      data: {
        ...formData.data,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleDataDateChange = (name, value) => {
    setFormData({
      ...formData,
      data: {
        ...formData.data,
        [name]: value
      }
    })
  }

  const handleFileChange = (event) =>
    setFormData({ ...formData, file: event.target.files[0] });

  const handleSubmit = async () => {
    const { data, error } = await storeRequest(formData)
    if (error) {
      toast.error(error)
    } else {
      const transactionData = {
        user: auth.user._id,
        request: data._id,
        chapel: data.parish,
        file: formData.file,
        amount: formData.amount,
      }
      await handleSubmitTransaction(transactionData)
    }
  }

  const handleViewModal = (e) => {
    e.preventDefault()
    setViewModal(true)
  }

  const handleSubmitTransaction = async (transactionData) => {
    const { data, error } = await storeTransaction(transactionData)
    if (!error) {
      toast.success("Successfully Submitted")
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <form style={{ width: '100%' }} onSubmit={handleViewModal}>
        <Stack direction={'column'} spacing={1}>
          <Typography variant='h4' fontWeight={'bold'}>Requester Information</Typography>
          <RequesterForm handleRequestChange={handleRequestChange} />
          <Divider />
          <Typography variant='h4' fontWeight={'bold'}>Personal Information</Typography>
          <Stack direction={'row'} spacing={2}>
            <TextField label='Full Name' sx={{ width: '100%' }} name='name' onChange={handleDataChange} required />
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <DatePicker label='Date of Birth' sx={{ width: '100%' }} name='birthDate' onChange={value => handleDataDateChange('birthDate', value)} required />
            <DatePicker label='Date of Baptism' sx={{ width: '100%' }} name='baptismDate' onChange={value => handleDataDateChange('baptismDate', value)} required />
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <TextField label='Place of Birth' sx={{ width: '100%' }} name='birthAddress' onChange={handleDataChange} required />
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <TextField label="Mother's Name" sx={{ width: '100%' }} name='motherName' onChange={handleDataChange} required />
            <TextField label="Father's Name" sx={{ width: '100%' }} name='fatherName' onChange={handleDataChange} required />
          </Stack>
          <Stack spacing={2} direction={'row'}>
            <TextField label='Sponsor Name' sx={{ width: '100%' }} name='sponsor1' onChange={handleDataChange} required />
            <TextField label='Sponsor Name' sx={{ width: '100%' }} name='sponsor2' onChange={handleDataChange} required />
          </Stack>
          <TextField label='Priest' name='priest' onChange={handleDataChange} required />

          <Divider />
          <PaymentForm handleFileChange={handleFileChange} formData={formData} />
          <Button type='submit' variant='contained' color='warning'>Proceed</Button>
        </Stack>
      </form>
      <AlertModalLarge open={viewModal} onClose={() => setViewModal(false)}>
        <ViewBaptism formData={formData} handleSubmit={handleSubmit} />
      </AlertModalLarge>
    </LocalizationProvider>
  )
}

function PaymentForm({ handleFileChange, formData }) {
  const [gcash, setGcash] = useState({})

  const handleGetdata = async () => {
    if (formData.parish) {
      const { data, error } = await fetchChapelById(formData.parish)
      if (!error) {
        setGcash(data)
      }
    }
  }

  useEffect(() => {
    handleGetdata()
  }, [formData.parish])

  return (
    <>
      <Typography variant='h4' fontWeight={'bold'}>Payment</Typography>
      <Typography>Account Information</Typography>
      <Stack direction={'row'} spacing={2}>
        <TextField label='Gcash Number' value={gcash.gcash || ""} sx={{ width: '100%' }} disabled />
        <TextField label='Amount' value='200' sx={{ width: '100%' }} disabled />
      </Stack>
      <Divider />
      <Typography>Upload GCash Reciept</Typography>
      <TextField type='file' name='file' onChange={handleFileChange} required />
    </>
  )
}

function RequesterForm({ handleRequestChange }) {
  const [chapelData, setChapelData] = useState([])

  const handleGetChapel = async () => {
    const { data, error } = await fetchChapelData()
    if (!error) {
      setChapelData(data)
    }
  }

  useState(() => {
    handleGetChapel()
  }, [])
  return (
    <>
      <Stack direction={'row'} spacing={2}>
        <TextField label='Select Chapel' sx={{ width: '100%' }} defaultValue={''} name='parish' onChange={handleRequestChange} select required>
          {chapelData.map((item, index) => (
            <MenuItem key={index} value={item._id}>{item.chapel}</MenuItem>
          ))}
        </TextField>
        {/* <TextField label='Role or Connection' sx={{ width: '100%' }} defaultValue={''} name='person' onChange={handleRequestChange} select required>
          <MenuItem value="Myself">Myself</MenuItem>
          <MenuItem value="Relative">Relative</MenuItem>
        </TextField> */}
      </Stack>
      <TextField label='Purpose' sx={{ width: '100%' }} name='purpose' onChange={handleRequestChange} required />
    </>
  )
}

function Document() {
  return (
    <Stack spacing={2}>
      <PDFViewer height={400}>
        <Baptism selected={[]} />
      </PDFViewer>
      <Button variant='contained' color='error' disabled>Baptism Sample</Button>
    </Stack>
  )
}

export default BaptismForm