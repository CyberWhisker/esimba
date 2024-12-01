import React, { useContext, useEffect, useState } from 'react'
import { Box, Divider, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import CustomCard from '../../components/CustomCard'
import { ChevronRight } from '@mui/icons-material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import moment from 'moment'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { AuthContext } from '../../context/AuthContext'
import { fetchScheduleByParishId, fetchScheduleByUserId } from '../../api/scheduleApi'
import Master from '../../layouts/Master'
import { fetchChapelData } from '../../api/chapelApi'

function UserViewSchedule() {
  return (
    <Master>
      <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingY: 1 }}>
        <Typography variant='h2' fontWeight={'bold'}>Schedule List</Typography>
      </Box>
      <Box sx={{ pb: 2 }}>
        <CustomCard>
          <ScheduleList />
        </CustomCard>
      </Box>
    </Master>
  )
}

function ScheduleList() {
  const [events, setEvents] = useState([]);
  const [parish, setParish] = useState('')
  const { auth } = useContext(AuthContext)

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
    if (parish) {
      const { data, error } = await fetchScheduleByParishId(parish);
      if (!error) {
        const mappedEvents = data.map((item) => ({
          title:
            item.request.certificate == "Baptism Certificate" && "Baptism Appointment" ||
            item.request.certificate == "Death Certificate" && "Death Appointment" ||
            item.request.certificate == "Marriage Certificate" && "Marriage Appointment" ||
            item.request.certificate == "Confirmation Certificate" && "Confirmation Appointment",
          date: moment(item.date).format("YYYY-MM-DD")
        }));
        setEvents(mappedEvents);
      }
    }
  };

  useEffect(() => {
    handleGetSchedule();
  }, [parish]); // Empty dependency array ensures it runs only once on mount

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Stack p={2} spacing={1}>
        <SelectChurch setParish={setParish} parish={parish} />
        <Divider />
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          events={events}
          dateClick={handleDateClick}
          height={'80vh'}
          displayEventTime={false} // Removes time from the event display
        />
      </Stack>
    </LocalizationProvider>
  );
}

function SelectChurch({ setParish, parish }) {
  const [chapelData, setChapelData] = useState([])

  const handleGetChapel = async () => {
    const { data, error } = await fetchChapelData()
    if (!error) {
      setChapelData(data)
    }
  }

  useEffect(() => {
    handleGetChapel()
  }, [])
  return (
    <TextField select label="Select Church" fullWidth onChange={(e) => setParish(e.target.value)} value={parish}>
      {chapelData.map((item, index) => (
        <MenuItem key={index} value={item._id}>{item.chapel}</MenuItem>
      ))}
    </TextField>
  )
}

export default UserViewSchedule