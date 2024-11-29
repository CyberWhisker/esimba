import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { toast } from 'react-toastify';
import { fetchScheduleByDate, storeSchedule } from '../../../../api/scheduleApi';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

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
                    Create Schedule Time
                </Typography>
            </Box>
            <Box id="delete-modal-description">
                <Typography sx={{ p: 2 }}>Schedule List:</Typography>
                <Box sx={{ p: 2 }}>
                    <DataTable selected={selected}/>
                </Box>
            </Box>
            <Divider />
            <SubmitData handleGetData={handleGetData} onClose={onClose} selected={selected}/>
        </>
    )
}

function DataTable({selected}) {
    const [data, setData] = useState([])

    const handleGetScheduleByDate = async () => {
        const { data, error } = await fetchScheduleByDate(selected.schedule)
        console.log(data)
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
        },
        {
            field: 'startTime',
            headerName: 'Start Time',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        {
            field: 'endTime',
            headerName: 'End Time',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
    ]

    const rows = data.map((item) => ({
        ...item,
        id: item._id,
        name: `${item.user.firstName} ${item.user.lastName}`,
    }))

    return (
        <DataGrid
            columns={columns}
            rows={rows}
        />
    )
}

function SubmitData({ selected, onClose, handleGetData }) {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newData = {
            user: selected.user._id,
            parish: selected.parish,
            request: selected._id,
            date: selected.schedule
        }
        await handleSubmitSchedule(newData)
        await handleUpdateRequest(selected)
        onClose()
        handleGetData()
    }

    const handleUpdateRequest = async (formData) => {
        const newData = {
            ...formData,
            status: 'Approve'
        }
        const { data, error } = await updateRequest(newData)
        if (error) {
            toast.error(error)
        } else {
            toast.success("Request Approve and Created")
        }
    }

    const handleSubmitSchedule = async (formData) => {
        const { data, error } = await storeSchedule(formData)
        if (error) {
            toast.error(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={footerStyle}>
                <Button variant="outlined" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="contained" color="success" type='submit'>
                    Proceed
                </Button>
            </Box>
        </form>
    )
}

export default StoreSchedule