import React, { useContext, useEffect, useState } from 'react'
import MasterAdmin from '../../layouts/MasterAdmin'
import { Box, Divider, Grid2, Stack, Typography, useTheme } from '@mui/material'
import CustomCard from '../../components/CustomCard'
import { ChevronRight } from '@mui/icons-material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import moment from 'moment'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { toast } from 'react-toastify'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { AuthContext } from '../../context/AuthContext'
import { fetchScheduleByParishId } from '../../api/scheduleApi'
import { fetchRequestAppointment, fetchRequestAppointmentByParishId, fetchRequestCertificate, fetchRequestCertificateByParishId } from '../../api/requestApi'
import { fetchTransactionByChapelId } from '../../api/transactionApi'
import { Link } from 'react-router-dom'
import AlertModalLarge from '../../components/AlertModalLarge'
import Update from './Form/Update'

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
              <Box component={Link} to={'/request/appointment'}
                sx={{
                  textDecoration: 'none',
                  color: 'inherit', // Inherit the text color from the parent
                  '&:hover': {
                    textDecoration: 'none', // Prevent underline on hover
                  },
                }}>
                <AppointmentList />
              </Box>
            </CustomCard>
          </Grid2>
          <Grid2 size='grow'>
            <CustomCard>
              <Box component={Link} to={'/request/certificate'}
                sx={{
                  textDecoration: 'none',
                  color: 'inherit', // Inherit the text color from the parent
                  '&:hover': {
                    textDecoration: 'none', // Prevent underline on hover
                  },
                }}>
                <CertificateList />
              </Box>
            </CustomCard>
          </Grid2>
          <Grid2 size='grow'>
            <CustomCard>
              <Box component={Link} to={'/transaction'}
                sx={{
                  textDecoration: 'none',
                  color: 'inherit', // Inherit the text color from the parent
                  '&:hover': {
                    textDecoration: 'none', // Prevent underline on hover
                  },
                }}>
                <RecordList />
              </Box>
            </CustomCard>
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2}>
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
  const { auth } = useContext(AuthContext)
  const [data, setData] = useState([])
  const handleGetData = async () => {
    const { data, error } = await fetchRequestAppointmentByParishId(auth.user.parish._id)
    if (!error) {
      setData(data.filter((item) => item.status == "Pending"))
    }
  }
  useEffect(() => {
    handleGetData()
  }, [])
  return (
    <Stack spacing={1}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        p: 1
      }}>
        <Typography>Pending Appointments</Typography>
        <ChevronRight />
      </Box>
      <Divider />
      <Typography color='primary' variant='h4' textAlign={'center'} fontWeight={'bold'}>{data.length}</Typography>
    </Stack>
  )
}

function CertificateList() {
  const { auth } = useContext(AuthContext)
  const [data, setData] = useState([])
  const handleGetData = async () => {
    const { data, error } = await fetchRequestCertificateByParishId(auth.user.parish._id)
    if (!error) {
      setData(data.filter((item) => item.status == "Pending"))
    }
  }
  useEffect(() => {
    handleGetData()
  }, [])
  return (
    <Stack spacing={1}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        p: 1
      }}>
        <Typography>Pending Certificates</Typography>
        <ChevronRight />
      </Box>
      <Divider />
      <Typography color='warning' variant='h4' textAlign={'center'} fontWeight={'bold'}>{data.length}</Typography>
    </Stack>
  )
}

function RecordList() {
  const { auth } = useContext(AuthContext)
  const [data, setData] = useState([])
  const handleGetData = async () => {
    const { data, error } = await fetchTransactionByChapelId(auth.user.parish._id)
    if (!error) {
      const filteredData = data
        .filter((item) => item.request?.status === "Approve")
        .reduce((sum, item) => sum + (item.amount || 0), 0);
      setData(filteredData)
    }
  }
  useEffect(() => {
    handleGetData()
  }, [])
  return (
    <Stack spacing={1}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        p: 1
      }}>
        <Typography>Funds</Typography>
        <ChevronRight />
      </Box>
      <Divider />
      <Typography color='success' variant='h4' textAlign={'center'} fontWeight={'bold'}>₱ {data}</Typography>
    </Stack>
  )
}

function ScheduleList() {
  const theme = useTheme();
  const { auth } = useContext(AuthContext);
  const [updateModal, setUpdateModal] = useState(false);
  const [selected, setSelected] = useState([])
  const [events, setEvents] = useState([]);
  const handleDateClick = (arg) => {
    const clickedDate = moment(arg.date).startOf('day').toISOString();
    const filteredEventsData = events
      .filter((event) => moment(event.date).startOf('day').toISOString() === clickedDate)
      .map((event) => event.data);
    if (filteredEventsData.length > 0) {
      setSelected(filteredEventsData)
      setUpdateModal(true)
    }
  };

  const currentDay = moment().format('YYYY-MM-DD');

  const handleGetSchedule = async () => {
    const { data, error } = await fetchScheduleByParishId(auth.user.parish._id);
    if (!error) {
      const mappedEvents = data.map((item) => ({
        data: {
          ...item
        },
        title:
          item.request.certificate == "Baptism Certificate" && "Baptism Appointment" ||
          item.request.certificate == "Death Certificate" && "Death Appointment" ||
          item.request.certificate == "Marriage Certificate" && "Marriage Appointment" ||
          item.request.certificate == "Confirmation Certificate" && "Confirmation Appointment",
        date: moment(item.date).format('YYYY-MM-DD'),
        start:
          moment(item.startTime).format('YYYY-MM-DD') == moment(item.endTime).format('YYYY-MM-DD') ?
            moment(item.startTime).format('YYYY-MM-DD') :
            moment(item.startTime).toISOString(),
        end:
          moment(item.startTime).format('YYYY-MM-DD') == moment(item.endTime).format('YYYY-MM-DD') ?
            moment(item.endTime).format('YYYY-MM-DD') :
            moment(item.endTime).toISOString(),
        color:
          moment(item.date).format('YYYY-MM-DD') === currentDay && theme.palette.success.main ||
          moment(item.date).format('YYYY-MM-DD') > currentDay && theme.palette.warning.main ||
          moment(item.date).format('YYYY-MM-DD') < currentDay && theme.palette.error.main
        ,
      }));
      setEvents(mappedEvents);
    }
  };

  useEffect(() => {
    handleGetSchedule();
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Stack>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 1,
          }}
        >
          <Typography>Church Calendar</Typography>
          <ChevronRight />
        </Box>
        <Divider />
        <Box
          sx={{
            p: 2,
          }}
        >
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            timeZone='UTC'
            initialView="dayGridMonth"
            events={events}
            dateClick={handleDateClick}
          />
        </Box>
      </Stack>
      <AlertModalLarge open={updateModal} onClose={() => setUpdateModal(false)}>
        <Update selected={selected} onClose={() => setUpdateModal(false)} handleGetData={handleGetSchedule} />
      </AlertModalLarge>
    </LocalizationProvider>
  );
}

export default AdminDashboard