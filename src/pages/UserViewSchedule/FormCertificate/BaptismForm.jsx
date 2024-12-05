import { Box, Button, Card, Divider, Grid2, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Master from '../../../layouts/Master'
import { ArrowBackRounded } from '@mui/icons-material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import { toast } from 'react-toastify'
import { fetchChapelById, fetchChapelData } from '../../../api/chapelApi'
import { storeRequest } from '../../../api/requestApi'
import { storeTransaction } from '../../../api/transactionApi'
import { fetchScheduleByParishId } from '../../../api/scheduleApi'
import moment from 'moment'
import AlertModalLarge from '../../../components/AlertModalLarge'
import ViewBaptism from './View/ViewBaptism'
import { storeReserved } from '../../../api/reservedApi'
import { storeBaptism } from '../../../api/baptismApi'

function BaptismForm({ }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData: eventData } = location.state || {};  // Default to empty object if no state

  return (
    <Master>
      <Stack sx={{ py: 1 }} spacing={2}>
        <Stack direction={'row'} spacing={2}>
          <Button startIcon={<ArrowBackRounded />} variant='contained' onClick={() => navigate(-1)}>Go Back</Button>
          <Typography variant='h4' fontWeight={'bold'}>Fill-out Form: Baptism</Typography>
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

  const handleRequestChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleRequestDateChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
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
    // Ensure formData and eventData have required properties
    if (!formData.user || !formData.parish || !formData.file || !formData.amount) {
      toast.error('Please fill in all required fields!');
      return; // Prevent further execution if form data is incomplete
    }

    // Step 1: Create the transaction
    const formTransaction = {
      user: formData.user,
      chapel: formData.parish,
      file: formData.file,
      amount: formData.amount,
    };

    try {
      const { data, error } = await storeTransaction(formTransaction);

      if (error) {
        toast.error('Failed to store transaction');
        console.error(error);
        return;
      }

      // Step 2: If transaction is successful, store the reservation
      const formReserved = {
        user: formData.user,
        transaction: data._id,
        parish: formData.parish,
        event: formData.eventId,
        date: formData.date,
      };

      const { data: reservedData, error: reservedError } = await storeReserved(formReserved);

      if (reservedError) {
        toast.error('Failed to reserve event');
        return;
      } else {
        const formCertificate = {
          ...formData.data,
          user: formData.user,
          chapel: formData.parish
        }
        const { data: certData, error: certError } = await storeBaptism(formCertificate)
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

  const handleViewModal = (e) => {
    e.preventDefault()
    setViewModal(true)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <form style={{ width: '100%' }} onSubmit={handleViewModal}>
        <Stack direction={'column'} spacing={1}>
          {/* <Typography variant='h4' fontWeight={'bold'}>Requester Information</Typography>
          <RequesterForm handleRequestChange={handleRequestChange} formData={formData} handleRequestDateChange={handleRequestDateChange} />
          <Divider /> */}
          <Typography variant='h4' fontWeight={'bold'}>Personal Information</Typography>
          <Stack direction={'row'} spacing={2}>
            <TextField label='Full Name' sx={{ width: '100%' }} name='name' onChange={handleDataChange} required />
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <DatePicker label='Date of Birth' sx={{ width: '100%' }} name='birthDate' onChange={value => handleDataDateChange('birthDate', value)} required />
            <DatePicker label='Date of Baptism' sx={{ width: '100%' }} name='baptismDate' disabled value={moment(formData.date) || ''} onChange={value => handleDataDateChange('baptismDate', value)} required />
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
          <TextField label='Purpose' sx={{ width: '100%' }} name='purpose' onChange={handleRequestChange} required />

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

function RequesterForm({ handleRequestChange, formData, handleRequestDateChange }) {
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
        {formData.parish ?
          <DateSchedulePicker handleRequestDateChange={handleRequestDateChange} formData={formData} /> :
          <TextField sx={{ width: "100%" }} disabled label="Select Date Appointment" value="Please Select Chapel" />
        }
        {/* <TextField label='Role or Connection' sx={{ width: '100%' }} defaultValue={''} name='person' onChange={handleRequestChange} select required>
          <MenuItem value="Myself">Myself</MenuItem>
          <MenuItem value="Relative">Relative</MenuItem>
        </TextField> */}
      </Stack>
      <TextField label='Purpose' sx={{ width: '100%' }} name='purpose' onChange={handleRequestChange} required />
    </>
  )
}

function DateSchedulePicker({ handleRequestDateChange, formData }) {
  const [disabledDatesData, setDisabledDatesData] = useState([]);

  // Function to disable specific dates
  const shouldDisableDate = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    return disabledDatesData.includes(formattedDate);
  };

  const handleGetSchedule = async () => {
    const { data, error } = await fetchScheduleByParishId(formData.parish);
    if (!error) {
      const dates = data.map((item) => moment(item.request.schedule).format('YYYY-MM-DD'));
      if (dates.length >= 2) {
        setDisabledDatesData(dates);
      }
    }
  };

  useEffect(() => {
    handleGetSchedule();
  }, [formData.parish]); // Empty dependency array ensures it runs once on mount

  return (
    <DatePicker
      sx={{ width: '100%' }}
      minDate={moment()} // Disable past dates
      label="Select Date Appointment"
      name="schedule"
      shouldDisableDate={shouldDisableDate} // Disable specific dates
      onChange={(value) => handleRequestDateChange('schedule', value)}
    />
  );
}

export default BaptismForm