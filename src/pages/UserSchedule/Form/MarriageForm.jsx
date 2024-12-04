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
import ViewMarriage from './View/ViewMarriage'

function MarriageForm() {
  const navigate = useNavigate();
  return (
    <Master>
      <Stack sx={{ py: 1 }} spacing={2}>
        <Stack direction={'row'} spacing={2}>
          <Button startIcon={<ArrowBackRounded />} variant='contained' onClick={() => navigate(-1)}>Go Back</Button>
          <Typography variant='h4' fontWeight={'bold'}>Fill-out Form: Marriage</Typography>
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
    certificate: 'Marriage Certificate',
    amount: ''
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
          <RequesterForm handleRequestChange={handleRequestChange} formData={formData} handleRequestDateChange={handleRequestDateChange} />
          <Divider />
          <Typography variant='h4' fontWeight={'bold'}>Personal Information</Typography>
          <Stack direction={'row'} spacing={2}>
            <TextField label='Full Name' sx={{ width: '100%' }} name='name' onChange={handleDataChange} required />
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <DatePicker label='Date of Birth' sx={{ width: '100%' }} name='birthDate' onChange={value => handleDataDateChange('birthDate', value)} required />
            <TextField label='Age' sx={{ width: '100%' }} name='age' onChange={handleDataChange} />
            <DatePicker label='Date of Baptism' sx={{ width: '100%' }} name='baptismDate' onChange={value => handleDataDateChange('baptismDate', value)} required />
          </Stack>
          <DatePicker label='Marriage Date' sx={{ width: '100%' }} name='marriageDate' onChange={value => handleDataDateChange('baptismDate', value)} required />
          <Stack direction={'row'} spacing={2}>
            <TextField label='Place of Birth' sx={{ width: '100%' }} name='birthAddress' onChange={handleDataChange} required />
          </Stack>
          <TextField label="Partner Name" sx={{ width: '100%' }} name='partnerName' onChange={handleDataChange} required />
          <Stack direction={'row'} spacing={2}>
            <TextField label="Mother's Name" sx={{ width: '100%' }} name='motherName' onChange={handleDataChange} required />
            <TextField label="Father's Name" sx={{ width: '100%' }} name='fatherName' onChange={handleDataChange} required />
          </Stack>
          <Stack spacing={2} direction={'row'}>
            <TextField label='Sponsor Name' sx={{ width: '100%' }} name='witness1' onChange={handleDataChange} required />
            <TextField label='Sponsor Name' sx={{ width: '100%' }} name='witness2' onChange={handleDataChange} required />
          </Stack>
          <TextField label='Priest' name='priest' onChange={handleDataChange} required />

          <Divider />
          <MarriageSelect handleRequestChange={handleRequestChange} formData={formData} />

          <Divider />
          <PaymentForm handleFileChange={handleFileChange} formData={formData} />
          <Button type='submit' variant='contained' color='warning'>Proceed</Button>
        </Stack>
      </form>
      <AlertModalLarge open={viewModal} onClose={() => setViewModal(false)}>
        <ViewMarriage formData={formData} handleSubmit={handleSubmit} />
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
        <TextField label='Amount' value={formData.amount} sx={{ width: '100%' }} disabled />
      </Stack>
      <Divider />
      <Typography>Upload GCash Reciept</Typography>
      <TextField type='file' name='file' onChange={handleFileChange} required />
    </>
  )
}

function MarriageSelect({ handleRequestChange, formData }) {
  const [selected, setSelected] = useState("")
  return (
    <>
      <Typography variant='h4' fontWeight={'bold'}>Marriage Information</Typography>
      <TextField select label="Marriage Requirement" value={selected} onChange={(e) => setSelected(e.target.value)} required>
        <MenuItem value={"NEWLY WEDS"}>NEWLY WEDS</MenuItem>
        <MenuItem value={"CIVILLY MARRIED"}>CIVILLY MARRIED</MenuItem>
      </TextField>
      {selected == "NEWLY WEDS" &&
        <Card sx={{ p: 2 }}>
          <Typography fontWeight={'bold'}>"Kindly ensure you bring the following documents to the interview."</Typography>
          <ul>
            <li><Typography variant="body1">Canonical Interview</Typography></li>
            <li><Typography variant="body1">Application for Marriage</Typography></li>
            <li><Typography variant="body1">CENOMAR (Certificate of No Marriage)</Typography></li>
            <li><Typography variant="body1">Marriage License</Typography></li>
            <li><Typography variant="body1">ID Picture (3 copies 1x1 and 2 copies of 5 R size)</Typography></li>
            <li><Typography variant="body1">Baptismal Certificate w/ annotation of "for marriage purposes"</Typography></li>
            <li><Typography variant="body1">Confirmation Certificate w/ annotation of "for marriage purposes"</Typography></li>
            <li><Typography variant="body1">Pre Cana Counseling</Typography></li>
            <li><Typography variant="body1">3 Banns Publications</Typography></li>
            <li><Typography variant="body1">Parents Permission (18-24 years old)</Typography></li>
            <li><Typography variant="body1">Confession</Typography></li>
            <li><Typography variant="body1">Practice for the Entourage</Typography></li>
          </ul>
        </Card>
      }
      {selected == "CIVILLY MARRIED" &&
        <Card sx={{ p: 2 }}>
          <Typography fontWeight={'bold'}>"Kindly ensure you bring the following documents to the interview."</Typography>
          <ul>
            <li><Typography variant="body1">Canonical Interview</Typography></li>
            <li><Typography variant="body1">Marriage Certificate</Typography></li>
            <li><Typography variant="body1">ID Picture (2 copies 5 R size)</Typography></li>
            <li><Typography variant="body1">Baptismal Certificate w/ annotation of "for marriage purposes"</Typography></li>
            <li><Typography variant="body1">Confirmation Certificate w/ annotation of "for marriage purposes"</Typography></li>
            <li><Typography variant="body1">Pre Cana Counseling</Typography></li>
            <li><Typography variant="body1">3 Banns Publications (if necessary)</Typography></li>
            <li><Typography variant="body1">Parents Permission (18-24 years old)</Typography></li>
            <li><Typography variant="body1">Confession</Typography></li>
            <li><Typography variant="body1">Practice for the Entourage</Typography></li>
          </ul>
        </Card>
      }
      <TextField select name='amount' label="Marriage Type" value={formData.amount} onChange={handleRequestChange} required>
        <MenuItem value={"1200"}>Kasal sa Loob ng Misa sa Regular na Oras at Araw</MenuItem>
        <MenuItem value={"2000"}>Kasal sa Loob ng Misa Labas sa Regular na Oras At Araw</MenuItem>
        <MenuItem value={"1500"}>Kasal sa Loob ng Misa sa Kapilya sa Barangay</MenuItem>
        <MenuItem value={"1500"}>Kasal sa Loob ng Misa sa Kapilya PagKatapos ng Piyesta</MenuItem>
      </TextField>
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
          <DateSchedulePicker formData={formData} handleRequestDateChange={handleRequestDateChange} /> :
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

function DateSchedulePicker({ formData, handleRequestDateChange }) {
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
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <DatePicker
      sx={{ width: '100%' }}
      minDate={moment()} // Disable past dates
      label="Select Date Appointment"
      name="schedule"
      value={formData.schedule || null}
      shouldDisableDate={shouldDisableDate} // Disable specific dates
      onChange={(value) => handleRequestDateChange('schedule', value)}
    />
  );
}

export default MarriageForm