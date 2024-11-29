import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Divider, Stack } from '@mui/material';
import { toast } from 'react-toastify';
import { fetchScheduleByDate, storeSchedule } from '../../../../api/scheduleApi';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { updateRequest } from '../../../../api/requestApi';
import moment from 'moment';

const headerStyle = {
    p: 2,
    backgroundColor: (theme) => theme.palette.success.main,  // Error color for header
    color: 'white',
    borderRadius: '4px 4px 0 0',  // Rounded corners for the top
};

const footerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 1,
    p: 2
};

function StoreSchedule({ selected, onClose, handleGetData }) {

    return (
        <>
            <Box sx={headerStyle}>
                <Typography id="delete-modal-title" variant="h6" component="h2">
                    Time Schedule List:
                </Typography>
            </Box>
            <Box id="delete-modal-description">
                <Box sx={{ p: 2 }}>
                    <DataTable selected={selected} />
                </Box>
            </Box>
            <Divider />
            <SubmitData handleGetData={handleGetData} onClose={onClose} selected={selected} />
        </>
    )
}

function DataTable({ selected }) {
    const [data, setData] = useState([])

    const handleGetScheduleByDate = async () => {
        const { data, error } = await fetchScheduleByDate(selected.schedule)
        if (!error) {
            setData(data)
        }
    }

    useEffect(() => {
        handleGetScheduleByDate()
    }, [])

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        {
            field: 'certificate',
            headerName: 'Event',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
            renderCell: ({ row }) => (
                <>
                    {row.certificate == "Baptism Certificate" && "Baptism"}
                    {row.certificate == "Death Certificate" && "Burial"}
                    {row.certificate == "Marriage Certificate" && "Marriage"}
                    {row.certificate == "Confirmation Certificate" && "Confirmation"}
                </>
            )
        },
        {
            field: 'startTime',
            headerName: 'Start Time',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
            renderCell: ({ row }) => moment(row.startTime).format('hh:mm A')
        },
        {
            field: 'endTime',
            headerName: 'End Time',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
            renderCell: ({ row }) => moment(row.endTime).format('hh:mm A')
        },
    ]

    const rows = data.map((item) => ({
        ...item,
        id: item._id,
        name: `${item.user.firstName} ${item.user.lastName}`,
        certificate: item.request.certificate,
    }))

    return (
        <DataGrid
            sx={{ height: '40vh' }}
            columns={columns}
            rows={rows}
        />
    )
}

function SubmitData({ selected, onClose, handleGetData }) {

    const [formData, setFormData] = useState({
        user: selected.user._id,
        parish: selected.parish,
        request: selected._id,
        date: selected.schedule,
        startTime: moment(selected.schedule),
        endTime: moment(selected.schedule),
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleSubmitSchedule()
        await handleUpdateRequest()
        onClose()
        handleGetData()
    }

    const handleUpdateRequest = async () => {
        const newData = {
            _id: selected._id,
            status: 'Approve'
        }
        const { data, error } = await updateRequest(newData)
        if (error) {
            toast.error(error)
        } else {
            toast.success("Request Approve and Created")
        }
    }

    const handleSubmitSchedule = async () => {
        const { data, error } = await storeSchedule(formData)
        if (error) {
            toast.error(error)
        }
    }

    const handleTimeChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <form onSubmit={handleSubmit}>
                <Stack spacing={1} my={1} px={2}>
                    <Typography alignContent={'center'}>Please Select Time:</Typography>
                    <Stack spacing={1} direction={'row'}>
                        <TimePicker
                            sx={{ width: '100%' }}
                            label="Start Time"
                            name='startTime'
                            value={formData.startTime}
                            onChange={(value) => handleTimeChange("startTime", value)}
                        />
                        <TimePicker
                            sx={{ width: '100%' }}
                            label="End Time"
                            name='endTime'
                            value={formData.endTime}
                            onChange={(value) => handleTimeChange("endTime", value)}
                        />
                    </Stack>
                </Stack>
                <Divider />
                <Box sx={footerStyle}>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="success" type='submit'>
                        Proceed
                    </Button>
                </Box>
            </form>
        </LocalizationProvider>
    )
}

export default StoreSchedule