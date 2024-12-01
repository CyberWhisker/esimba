import { Box, Button, Card, Divider, Grid2, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Master from '../../../layouts/Master'
import { ArrowBackRounded } from '@mui/icons-material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import { toast } from 'react-toastify'
import { fetchChapelById, fetchChapelData } from '../../../api/chapelApi'
import { storeRequest } from '../../../api/requestApi'
import { storeTransaction } from '../../../api/transactionApi'
import { fetchScheduleByParishId } from '../../../api/scheduleApi'
import moment from 'moment'
import AlertModalLarge from '../../../components/AlertModalLarge'
import ViewDeath from './View/ViewDeath'

function DeathForm() {
  const navigate = useNavigate();
  return (
    <Master>
      <Stack sx={{ py: 1 }} spacing={2}>
        <Stack direction={'row'} spacing={2}>
          <Button startIcon={<ArrowBackRounded />} variant='contained' onClick={() => navigate(-1)}>Go Back</Button>
          <Typography variant='h4' fontWeight={'bold'}>Fill-out Form: Death</Typography>
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
    request: 'Appointment',
    certificate: 'Death Certificate',
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

  const handleSubmitTransaction = async (transactionData) => {
    const { data, error } = await storeTransaction(transactionData)
    if (!error) {
      toast.success("Successfully Submitted")
    }
  }

  const handleViewModal = (e) => {
    e.preventDefault()
    setViewModal(true)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <form style={{ width: '100%' }} onSubmit={handleViewModal}>
        <Stack direction={'column'} spacing={1}>
          <Typography variant='h4' fontWeight={'bold'}>Requester Information</Typography>
          <RequesterForm handleRequestChange={handleRequestChange} formData={formData} setFormData={setFormData}/>
          <Divider />
          <Typography variant='h4' fontWeight={'bold'}>Personal Information</Typography>
          <Stack direction={'row'} spacing={2}>
            <TextField label='Full Name' sx={{ width: '100%' }} name='name' onChange={handleDataChange} />
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <DatePicker label='Date of Birth' sx={{ width: '100%' }} name='birthDate' onChange={value => handleDataDateChange('birthDate', value)} />
            <TextField label='Age' sx={{ width: '100%' }} name='age' onChange={handleDataChange} />
            <DatePicker label='Date of Death' sx={{ width: '100%' }} name='deathDate' onChange={value => handleDataDateChange('deathDate', value)} />
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <TextField label='Place of Birth' sx={{ width: '100%' }} name='birthAddress' onChange={handleDataChange} />
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <TextField label="Mother's Name" sx={{ width: '100%' }} name='motherName' onChange={handleDataChange} />
            <TextField label="Father's Name" sx={{ width: '100%' }} name='fatherName' onChange={handleDataChange} />
          </Stack>
          <TextField label="Spouse's Name" sx={{ width: '100%' }} name='partnerName' onChange={handleDataChange} />
          <Stack spacing={2} direction={'row'}>
            <TextField label='Sponsor Name' sx={{ width: '100%' }} name='sponsor1' onChange={handleDataChange} />
            <TextField label='Sponsor Name' sx={{ width: '100%' }} name='sponsor2' onChange={handleDataChange} />
          </Stack>
          <TextField label='Cause of Death' sx={{ width: '100%' }} name='causeOfDeath' onChange={handleDataChange} />
          <CemetarySelect handleDataChange={handleDataChange} />
          <TextField label='Priest' name='priest' onChange={handleDataChange} />

          <Divider />
          <PaymentForm handleFileChange={handleFileChange} formData={formData} />
          <Button type='submit' variant='contained' color='warning'>Proceed</Button>
        </Stack>
      </form>
      <AlertModalLarge open={viewModal} onClose={() => setViewModal(false)}>
        <ViewDeath formData={formData} handleSubmit={handleSubmit} />
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

function RequesterForm({ handleRequestChange, formData, setFormData }) {
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
          <DateSchedulePicker setFormData={setFormData} formData={formData} /> :
          <TextField sx={{ width: "100%" }} disabled label="Select Date Appointment" value="Please Select Chapel" />
        }
        <TextField label='Role or Connection' sx={{ width: '100%' }} defaultValue={''} name='person' onChange={handleRequestChange} select required>
          <MenuItem value="Myself">Myself</MenuItem>
          <MenuItem value="Relative">Relative</MenuItem>
        </TextField>
      </Stack>
      <TextField label='Purpose' sx={{ width: '100%' }} name='purpose' onChange={handleRequestChange} required />
    </>
  )
}

function DateSchedulePicker({ setFormData, formData }) {
  const [disabledDatesData, setDisabledDatesData] = useState([]);

  // Function to disable specific dates
  const shouldDisableDate = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    return disabledDatesData.includes(formattedDate);
  };

  const handleDateChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

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
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <DatePicker
      sx={{ width: '100%' }}
      minDate={moment()} // Disable past dates
      label="Select Date Appointment"
      name="schedule"
      shouldDisableDate={shouldDisableDate} // Disable specific dates
      onChange={(value) => handleDateChange('schedule', value)}
    />
  );
}

function CemetarySelect({ handleDataChange }) {
  const [selected, setSelected] = useState("")

  return (
    <>
      <TextField label="Select Cemetary" value={selected} onChange={(e) => setSelected(e.target.value)} select required>
        <MenuItem value="Roman">Roman Cemetary</MenuItem>
        <MenuItem value="Private">Private Cemetary</MenuItem>
        <MenuItem value="Municipal">Municipal Cemetary</MenuItem>
      </TextField>
      {selected == "Roman" && <TextField label='Roman Cemetary Name' sx={{ width: '100%' }} name='romanCemetary' onChange={handleDataChange} />}
      {selected == "Municipal" && <TextField label='Municipal Cemetary Name' sx={{ width: '100%' }} name='municipalCemetary' onChange={handleDataChange} />}
      {selected == "Private" && <TextField label='Private Cemetary Name' sx={{ width: '100%' }} name='privateCemetary' onChange={handleDataChange} />}


    </>
  )
}

export default DeathForm