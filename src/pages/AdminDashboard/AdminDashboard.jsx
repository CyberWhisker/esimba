import React, { useEffect } from 'react'
import MasterAdmin from '../../layouts/MasterAdmin'
import { Box, Divider, Grid2, MenuItem, Stack, Typography } from '@mui/material'
import CustomCard from '../../components/CustomCard'
import { ChevronRight } from '@mui/icons-material'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import moment from 'moment'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { toast } from 'react-toastify'

function AdminDashboard() {
  const handleAuthAlert = async () => {
    const authAlert = JSON.parse(localStorage.getItem('authAlert'))
    if (authAlert) {
      await toast.success(authAlert.message)
      localStorage.removeItem('authAlert')
    }
  }
  useEffect(() => {
    handleAuthAlert()
  }, [])

  return (
    <MasterAdmin>
      <Stack spacing={2}>
        <Typography variant='h4' fontWeight={'bold'}>Dashboard</Typography>
        <Grid2 container spacing={2}>
          <Grid2 size='grow'>
            <CustomCard>
              <AppointmentList />
            </CustomCard>
          </Grid2>
          <Grid2 size='grow'>
            <CustomCard>
              <CertificateList />
            </CustomCard>
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2}>
          <Grid2 size='grow'>
            <CustomCard>
              <RecordList />
            </CustomCard>
          </Grid2>
          <Grid2 size='grow'>
            <CustomCard>
              <ScheduleList />
            </CustomCard>
          </Grid2>
        </Grid2>

      </Stack>
    </MasterAdmin>
  )
}

function AppointmentList() {
  return (
    <Stack spacing={2}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        p: 1
      }}>
        <Typography>Pending Appointments</Typography>
        <ChevronRight />
      </Box>
      <Divider />
      <MenuItem>Marriage</MenuItem>
    </Stack>
  )
}

function CertificateList() {
  return (
    <Stack spacing={2}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        p: 1
      }}>
        <Typography>Certifcate Request</Typography>
        <ChevronRight />
      </Box>
      <Divider />
      <MenuItem>Marriage</MenuItem>
    </Stack>
  )
}

function RecordList() {
  return (
    <Stack spacing={2}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        p: 1
      }}>
        <Typography>Records</Typography>
        <ChevronRight />
      </Box>
      <Divider />
      <MenuItem>Marriage</MenuItem>
    </Stack>
  )
}

function ScheduleList() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Stack spacing={2}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 1
        }}>
          <Typography>Church Calendar</Typography>
          <ChevronRight />
        </Box>
        <Divider />
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <DateCalendar
            referenceDate={moment('2022-04-17')}
            views={['year', 'month', 'day']}
          />

        </Box>
      </Stack>
    </LocalizationProvider>
  )
}

export default AdminDashboard