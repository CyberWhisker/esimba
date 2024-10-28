import { Box, Button, Card, Divider, Grid2, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import Master from '../../../layouts/Master'
import { ArrowBackRounded } from '@mui/icons-material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useNavigate } from 'react-router-dom'
import { PDFViewer } from '@react-pdf/renderer'
import Baptism from '../../../layouts/Pdf/Baptism'

function BaptismForm() {
  const navigate = useNavigate();
  return (
    <Master>
      <Stack sx={{py: 4}} spacing={2}>
        <Stack direction={'row'} spacing={2}>
          <Button startIcon={<ArrowBackRounded/>} variant='contained' onClick={() => navigate(-1)}>Go Back</Button>
          <Typography variant='h4' fontWeight={'bold'}>Baptism Certificate Form</Typography>
        </Stack>
        <Card elevation={5} sx={{
          padding: 2,
          backgroundColor: 'rgba(128, 0, 0, 0.5)', 
          backdropFilter: 'blur(10px)', 
          boxShadow: 'none', 
          transition: 'background-color 0.3s ease',
        }}>
          {/* <FormSection/> */}
          <Grid2 container>
            <Grid2 size='grow'>
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Document/>
              </Box>
            </Grid2>
            <Grid2 size='grow'>
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
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
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <form  style={{width: '100%'}}>
        <Stack direction={'column'} spacing={1}>
          <Typography variant='h4' fontWeight={'bold'}>Payment</Typography>
          <Divider/>
          <Typography>User Information</Typography>
          <TextField label='First Name'/>
          <TextField label='Middle Name'/>
          <TextField label='Last Name'/>
          <Divider/>
          <Typography>Upload GCash Reciept</Typography>
          <TextField type='file'/>
          <Button type='submit' variant='contained' color='warning'>Proceed</Button>
        </Stack>
      </form>
    </LocalizationProvider>
  )
}

function Document () {
  return (
    <PDFViewer height={400}>
      <Baptism selected={[]}/>
    </PDFViewer>
  )
}

export default BaptismForm