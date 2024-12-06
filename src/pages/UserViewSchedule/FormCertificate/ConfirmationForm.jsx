import { Box, Button, Card, Divider, Grid2, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Master from '../../../layouts/Master'
import { ArrowBackRounded } from '@mui/icons-material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import { toast } from 'react-toastify'
import moment from 'moment'
import AlertModalLarge from '../../../components/AlertModalLarge'
import ViewConfirmation from './View/ViewConfirmation'
import { storeConfirmation } from '../../../api/confirmationApi'
import { storeReserved } from '../../../api/reservedApi'
import axios from 'axios'

function ConfirmationForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData: eventData } = location.state || {};  // Default to empty object if no state
  return (
    <Master>
      <Stack sx={{ py: 1 }} spacing={2}>
        <Stack direction={'row'} spacing={2}>
          <Button startIcon={<ArrowBackRounded />} variant='contained' onClick={() => navigate(-1)}>Go Back</Button>
          <Typography variant='h4' fontWeight={'bold'}>Fill-out Form: Confirmation</Typography>
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
            <Grid2 size='grow'>
              <Box sx={{ justifyContent: 'center' }}>
                <FormSection eventData={eventData} />
              </Box>
            </Grid2>
          </Grid2>
        </Card>
      </Stack>
    </Master>
  )
}

function FormSection({ eventData }) {
  const { auth } = useContext(AuthContext)
  const [viewModal, setViewModal] = useState(false)
  const [formData, setFormData] = useState({
    ...eventData,
    user: auth.user._id,
    amount: '200'
  })

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

  const handleSubmit = async () => {
    // Ensure formData and eventData have required properties
    if (!formData.user || !formData.parish || !formData.amount) {
      toast.error('Please fill in all required fields!');
      return; // Prevent further execution if form data is incomplete
    }

    try {

      // Step 2: If transaction is successful, store the reservation
      const formReserved = {
        user: formData.user,
        event: formData.eventId,
        parish: formData.parish,
        date: formData.date,
        amount: formData.amount,
      };

      const { data: reservedData, error: reservedError } = await storeReserved(formReserved);

      if (reservedError) {
        toast.error('Failed to reserve event');
        return;
      } else {
        await handleSubmitFile(reservedData, formData)
        const formCertificate = {
          ...formData.data,
          user: formData.user,
          chapel: formData.parish
        }
        const { data: certData, error: certError } = await storeConfirmation(formCertificate)
        if (!certError) {
          toast.success('Successfully Submitted');
        }
      }
    } catch (err) {
      // Catch any errors during the process
      toast.error('An unexpected error occurred');
      console.error(err);
    }
  };

  const [files, setFiles] = useState({});


  const handleSubmitFile = async (reservedData, propsData) => {

    const formData = new FormData();
    formData.append('user', propsData.user);
    formData.append('reserve', reservedData._id);
    if (files.baptismal) formData.append('baptismal', files.baptismal);

    try {
      const response = await axios.post('http://localhost:4000/api/requirement/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data.message || 'Requirements uploaded successfully!');
    } catch (error) {
      console.log(error)
      console.log(error.response?.data?.error || 'Failed to upload requirements.');
    }
  };

  const handleViewModal = (e) => {
    e.preventDefault()
    setViewModal(true)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <form style={{ width: '100%' }} onSubmit={handleViewModal}>
        <Stack direction={'column'} spacing={1}>
          <Typography variant='h4' fontWeight={'bold'}>Personal Information</Typography>
          <Stack direction={'row'} spacing={2}>
            <TextField label='Full Name' sx={{ width: '100%' }} name='name' onChange={handleDataChange} />
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <DatePicker label='Date of Birth' sx={{ width: '100%' }} name='birthDate' onChange={value => handleDataDateChange('birthDate', value)} />
            <DatePicker label='Date of Baptism' sx={{ width: '100%' }} name='baptismDate' disabled value={moment(formData.date) || ''} onChange={value => handleDataDateChange('baptismDate', value)} required />
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <TextField label='Place of Birth' sx={{ width: '100%' }} name='birthAddress' onChange={handleDataChange} />
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <TextField label="Mother's Name" sx={{ width: '100%' }} name='motherName' onChange={handleDataChange} />
            <TextField label="Father's Name" sx={{ width: '100%' }} name='fatherName' onChange={handleDataChange} />
          </Stack>
          <Stack spacing={2} direction={'row'}>
            <TextField label='Sponsor Name' sx={{ width: '100%' }} name='sponsor1' onChange={handleDataChange} />
            <TextField label='Sponsor Name' sx={{ width: '100%' }} name='sponsor2' onChange={handleDataChange} />
          </Stack>
          <TextField label='Priest' name='priest' onChange={handleDataChange} />
          <Divider />
          <RequirementForm setFiles={setFiles} />
          <Divider />
          <Button type='submit' variant='contained' color='warning'>Proceed</Button>
        </Stack>
      </form>
      <AlertModalLarge open={viewModal} onClose={() => setViewModal(false)}>
        <ViewConfirmation formData={formData} handleSubmit={handleSubmit} />
      </AlertModalLarge>
    </LocalizationProvider>
  )
}

function RequirementForm({ setFiles }) {
  const handleFileChange = (event, fieldName) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [fieldName]: event.target.files[0],
    }));
  };
  return (
    <Stack spacing={1}>
      <Typography variant='h4' fontWeight={'bold'}>Requirements</Typography>
      <Typography>Baptismal Certificate</Typography>
      <TextField type='file' onChange={(e) => handleFileChange(e, 'baptismal')} required />
    </Stack>
  )
}

export default ConfirmationForm