import React, { useContext, useEffect, useState } from 'react'
import { Box, Divider, Stack, TextField, Typography } from '@mui/material'
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
    const { data, error } = await fetchScheduleByUserId(auth.user._id);
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
  };

  useEffect(() => {
    handleGetSchedule();
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Stack>
        <Divider />
        <Box
          sx={{
            p: 2,
          }}
        >
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            events={events}
            dateClick={handleDateClick}
            height={'80vh'}
            displayEventTime={false} // Removes time from the event display
          />
        </Box>
      </Stack>
    </LocalizationProvider>
  );
}

export default UserViewSchedule