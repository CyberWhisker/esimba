import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import StoreBaptism from './BaptismForm/StoreBaptism'

function Store({ onClose, handleGetData }) {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ width: '60vh', p: 2 }}>
                <Stack spacing={1}>
                    <Typography variant='h4' fontWeight={'bold'}>Store Appointment</Typography>
                    <Divider/>
                    <StoreBaptism handleGetData={handleGetData} onClose={onClose}/>
                </Stack>
            </Box>
        </LocalizationProvider>
    )
}

export default Store