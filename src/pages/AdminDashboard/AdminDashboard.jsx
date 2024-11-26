import React, { useContext, useEffect, useState } from 'react'
import MasterAdmin from '../../layouts/MasterAdmin'
import { Box, colors, Divider, Grid2, MenuItem, Stack, Typography } from '@mui/material'
import CustomCard from '../../components/CustomCard'
import { ChevronRight } from '@mui/icons-material'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import moment from 'moment'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { toast } from 'react-toastify'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { AuthContext } from '../../context/AuthContext'
import { fetchScheduleByParishId } from '../../api/scheduleApi'
import { fetchRequestAppointment, fetchRequestCertificate } from '../../api/requestApi'
import { fetchTransactionByChapelId } from '../../api/transactionApi'

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
          <Grid2 size='grow'>
            <CustomCard>
              <RecordList />
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
  const [data, setData] = useState([])
  const handleGetData = async () => {
    const { data, error } = await fetchRequestAppointment()
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
  const [data, setData] = useState([])
  const handleGetData = async () => {
    const { data, error } = await fetchRequestCertificate()
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
  const { auth } = useContext(AuthContext);
  const [events, setEvents] = useState([]);


  const handleDateClick = (arg) => {
    const clickedDate = moment(arg.date).startOf('day').toISOString();
    const filteredEvents = events.filter((event) =>
      moment(event.start).startOf('day').toISOString() === clickedDate
    );

    if (filteredEvents.length > 0) {
      alert(`Events on ${arg.dateStr}: \n${filteredEvents.map((event) => event.title).join('\n')}`);
    } else {
      alert(`No events on ${arg.dateStr}`);
    }
  };

  const handleGetSchedule = async () => {
    const { data, error } = await fetchScheduleByParishId(auth.user.parish._id);
    if (!error) {
      const mappedEvents = data.map((item) => ({
        title:
          item.request.certificate == "Baptism Certificate" && "Baptism Appointment" ||
          item.request.certificate == "Death Certificate" && "Death Appointment" ||
          item.request.certificate == "Marriage Certificate" && "Marriage Appointment" ||
          item.request.certificate == "Confirmation Certificate" && "Confirmation Appointment",
        date: moment(item.createdAt).format("YYYY-MM-DD"),
        color: 'danger'
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
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={false}
            events={events}
            height={'80vh'}
          />
        </Box>
      </Stack>
    </LocalizationProvider>
  );
}

export default AdminDashboard