import React, { useContext, useEffect, useState } from 'react'
import { Box, Divider, MenuItem, Select, Stack, TextField, Typography, useTheme } from '@mui/material'
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
import { fetchEventsByParishId } from '../../api/eventApi'
import AlertModal from '../../components/AlertModal'
import StoreReserved from './Form/StoreReserved'

function UserViewSchedule() {
  return (
    <Master>
      <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingY: 1 }}>
        <Typography variant='h4' fontWeight={'bold'}>Schedule List</Typography>
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
  const [scheduleModal, setScheduleModal] = useState(false)
  const [eventId, setEventId] = useState('')
  const theme = useTheme();

  const handleGetAllEvents = async () => {
    if (parish) {
      try {
        const [scheduleResponse, eventsResponse] = await Promise.all([
          fetchScheduleByParishId(parish),
          fetchEventsByParishId(parish)
        ]);

        if (!scheduleResponse.error && !eventsResponse.error) {
          const currentDay = moment().format('YYYY-MM-DD');

          // Map schedules
          const formattedData = scheduleResponse.data.filter((item) => item.status == "Approved")
          const mappedSchedules = formattedData.map((item) => ({
            data: { ...item },
            type: 'appointment',
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
          }));

          // Map events
          const mappedEvents = eventsResponse.data.map((item) => ({
            data: { ...item },
            id: item._id,
            type: 'event',
            title: item.event,
            start:
              moment(item.startDate).format('YYYY-MM-DD') == moment(item.endDate).format('YYYY-MM-DD') ?
                moment(item.startDate).format('YYYY-MM-DD') :
                moment(item.startDate).toISOString(),
            end:
              moment(item.startDate).format('YYYY-MM-DD') == moment(item.endDate).format('YYYY-MM-DD') ?
                moment(item.endDate).format('YYYY-MM-DD') :
                moment(item.endDate).toISOString(),
            color:
              moment(item.endDate).format('YYYY-MM-DD') === currentDay && theme.palette.success.main ||
              moment(item.endDate).format('YYYY-MM-DD') > currentDay && theme.palette.warning.main ||
              moment(item.endDate).format('YYYY-MM-DD') < currentDay && theme.palette.error.main,
            className: 'custom-event-fullCalendar'
          }));

          // Combine both datasets
          const combinedEvents = [...mappedSchedules, ...mappedEvents];

          // Set the merged events to state
          setEvents(combinedEvents);
        } else {
          console.error('Error fetching schedules or events');
        }
      } catch (error) {
        console.error('Error in handleGetAllEvents:', error);
      }
    }
  };

  useEffect(() => {
    handleGetAllEvents()
  }, [parish]);

  const handleEventClick = (e) => {
    setEventId(e.event.id)
    setScheduleModal(true)
  }



  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Stack p={2} spacing={1}>
        <SelectChurch setParish={setParish} parish={parish} />
        <Divider />
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          timeZone='UTC'
          initialView="dayGridMonth"
          events={events}
          displayEventTime={false} // Removes time from the event display
          eventClick={handleEventClick}
        />
      </Stack>
      <AlertModal open={scheduleModal} onClose={() => setScheduleModal(false)}>
        <StoreReserved parish={parish} onClose={() => setScheduleModal(false)} eventId={eventId} />
      </AlertModal>
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