import { Avatar, Box, Button, Card, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import Master from '../../../layouts/Master'
import { ArrowBackRounded } from '@mui/icons-material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useNavigate } from 'react-router-dom'

function BaptismForm() {
  const navigate = useNavigate();
  return (
    <Stack spacing={2}>
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
  )
}

function FormSection () {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <form>
        <Stack spacing={2}>
          <Stack direction={'row'} spacing={2}>
            <TextField label='First Name' sx={{width: '100%'}}/>
            <TextField label='Last Name' sx={{width: '100%'}}/>
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <DatePicker label='Date of Birth' sx={{width: '100%'}}/>
            <DatePicker label='Date of Baptism' sx={{width: '100%'}}/>
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <TextField label='Place of Birth' sx={{width: '100%'}}/>
            <TextField label='Name of Parish' sx={{width: '100%'}} select>
              <MenuItem>No Record Found</MenuItem>
            </TextField>
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <TextField label="Mother's Name" sx={{width: '100%'}}/>
            <TextField label="Father's Name" sx={{width: '100%'}}/>
          </Stack>
          <TextField label='Purpose'/>
          <Button variant='contained'>Submit</Button>
        </Stack>
      </form>
    </LocalizationProvider>
  )
}

export default BaptismForm