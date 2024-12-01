import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import BaptismLayout from '../../../../layouts/Pdf/BaptismLayout';
import { DatePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';

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

function ViewDeath({ formData, handleSubmit }) {
    const uerData = formData.data
    const navigate = useNavigate()
    const handleSubmitClick = () => {
        handleSubmit()
        setTimeout(() => {
            navigate('/user/profile');
        }, 3);
    }
    return (
        <>
            <Box sx={headerStyle}>
                <Typography id="delete-modal-title" variant="h6" component="h2">
                    Preview
                </Typography>
            </Box>
            <Box id="delete-modal-description">
                <Box sx={{ p: 2 }}>
                    <Stack direction={'column'} spacing={1}>
                        <Typography variant='h4' fontWeight={'bold'}>Personal Information</Typography>
                        <Stack direction={'row'} spacing={2}>
                            <TextField label='Full Name' value={uerData.name || ""} sx={{ width: '100%' }} name='name' disabled/>
                        </Stack>
                        <Stack direction={'row'} spacing={2}>
                            <DatePicker label='Date of Birth' sx={{ width: '100%' }} name='birthDate'  value={uerData.birthDate || null} disabled/>
                            <TextField label='Age' sx={{ width: '100%' }} name='age'  value={uerData.age || ""} disabled/>
                            <DatePicker label='Date of Death' sx={{ width: '100%' }} name='deathDate'  value={uerData.deathDate || null} disabled/>
                        </Stack>
                        <Stack direction={'row'} spacing={2}>
                            <TextField label='Place of Birth' sx={{ width: '100%' }} name='birthAddress' value={uerData.birthAddress || ""} disabled/>
                        </Stack>
                        <Stack direction={'row'} spacing={2}>
                            <TextField label="Mother's Name" sx={{ width: '100%' }} name='motherName' value={uerData.mothername || null} disabled/>
                            <TextField label="Father's Name" sx={{ width: '100%' }} name='fatherName' value={uerData.fathername || null} disabled/>
                        </Stack>
                        <TextField label="Spouse's Name" sx={{ width: '100%' }} name='partnerName' value={uerData.partnerName || null} disabled/>
                        <Stack spacing={2} direction={'row'}>
                            <TextField label='Sponsor Name' sx={{ width: '100%' }} name='sponsor1' value={uerData.sponsor1 || null} disabled/>
                            <TextField label='Sponsor Name' sx={{ width: '100%' }} name='sponsor2' value={uerData.sponsor2 || null} disabled/>
                        </Stack>
                        <TextField label='Cause of Death' sx={{ width: '100%' }} name='causeOfDeath' value={uerData.causeOfDeath || null} disabled/>
                        <Divider />
                        <Button variant='contained' color='warning' onClick={() => handleSubmitClick()}>Submit</Button>
                    </Stack>
                </Box>
            </Box>
        </>
    )
}

export default ViewDeath