import { Box, Button, Card, Divider, Grid2, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import Master from '../../../layouts/Master'
import { ArrowBackRounded } from '@mui/icons-material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import { toast } from 'react-toastify'
import { storeTransaction } from '../../../api/transactionApi'
import moment from 'moment'
import AlertModalLarge from '../../../components/AlertModalLarge'
import ViewMarriage from './View/ViewMarriage'
import { storeMarriage } from '../../../api/marriageApi'
import { storeReserved } from '../../../api/reservedApi'
import axios from 'axios';

function MarriageForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData: eventData } = location.state || {};  // Default to empty object if no state
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
        parish: formData.parish,
        event: formData.eventId,
        date: formData.date,
        amount: formData.amount,
      };

      const { data: reservedData, error: reservedError } = await storeReserved(formReserved);
      console.log(reservedError)
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
        const { data: certData, error: certError } = await storeMarriage(formCertificate)
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
    if (files.cenomar) formData.append('cenomar', files.cenomar);
    if (files.picture) formData.append('picture', files.picture);
    if (files.marriageLicense) formData.append('marriageLicense', files.marriageLicense);
    if (files.baptismal) formData.append('baptismal', files.baptismal);
    if (files.confirmation) formData.append('confirmation', files.confirmation);
    if (files.publication) formData.append('publication', files.publication);
    if (files.permission) formData.append('permission', files.permission);

    try {
      const response = await axios.post('http://localhost:4000/api/requirement/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data.message || 'Requirements uploaded successfully!');
    } catch (error) {
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
          {/* <Typography variant='h4' fontWeight={'bold'}>Requester Information</Typography>
          <RequesterForm handleRequestChange={handleRequestChange} formData={formData} handleRequestDateChange={handleRequestDateChange} />
          <Divider /> */}
          <Typography variant='h4' fontWeight={'bold'}>Personal Information</Typography>
          <Stack direction={'row'} spacing={2}>
            <TextField label='Full Name' sx={{ width: '100%' }} name='name' onChange={handleDataChange} required />
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <DatePicker label='Date of Birth' sx={{ width: '100%' }} name='birthDate' onChange={value => handleDataDateChange('birthDate', value)} required />
            <TextField label='Age' sx={{ width: '100%' }} name='age' onChange={handleDataChange} />
            <DatePicker label='Date of Baptism' sx={{ width: '100%' }} name='baptismDate' onChange={value => handleDataDateChange('baptismDate', value)} required />
          </Stack>
          <DatePicker label='Marriage Date' sx={{ width: '100%' }} disabled name='marriageDate' value={moment(formData.date) || ''} onChange={value => handleDataDateChange('baptismDate', value)} required />
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
          <RequirementForm setFiles={setFiles} />
          <Divider />
          <Button type='submit' variant='contained' color='warning'>Proceed</Button>
        </Stack>
      </form>
      <AlertModalLarge open={viewModal} onClose={() => setViewModal(false)}>
        <ViewMarriage formData={formData} handleSubmit={handleSubmit} />
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
      <Typography>CENOMAR (Certificate of No Marriage)</Typography>
      <TextField type='file' onChange={(e) => handleFileChange(e, 'cenomar')} required />
      <Typography>ID Picture (3 copies 1x1 and 2 copies of 5 R size)</Typography>
      <TextField type='file' onChange={(e) => handleFileChange(e, 'picture')} required />
      <Typography>Marriage License</Typography>
      <TextField type='file' onChange={(e) => handleFileChange(e, 'marriageLicense')} required />
      <Typography>Baptismal Certificate w/ annotation of "for marriage purposes"</Typography>
      <TextField type='file' onChange={(e) => handleFileChange(e, 'baptismal')} required />
      <Typography>Confirmation Certificate w/ annotation of "for marriage purposes"</Typography>
      <TextField type='file' onChange={(e) => handleFileChange(e, 'confirmation')} required />
      <Typography>3 Banns Publications </Typography>
      <TextField type='file' onChange={(e) => handleFileChange(e, 'publication')} required />
      <Typography>Parents Permission (18-24 years old)</Typography>
      <TextField type='file' onChange={(e) => handleFileChange(e, 'permission')} />
    </Stack>
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

export default MarriageForm