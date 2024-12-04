import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import BaptismLayout from '../../../../layouts/Pdf/BaptismLayout';
import { DatePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
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

function ViewConfirmation({ formData, handleSubmit }) {
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
                            <TextField label='Full Name' sx={{ width: '100%' }} name='name' value={uerData.name || ""} required disabled />
                        </Stack>
                        <Stack direction={'row'} spacing={2}>
                            <DatePicker label='Date of Birth' sx={{ width: '100%' }} value={uerData.birthDate || ""} name='birthDate' required disabled />
                            <DatePicker label='Date of Baptism' sx={{ width: '100%' }} value={moment(uerData.baptismDate) || ""} name='baptismDate' required disabled />
                        </Stack>
                        <Stack direction={'row'} spacing={2}>
                            <TextField label='Place of Birth' sx={{ width: '100%' }} value={uerData.birthAddress || ""} name='birthAddress' required disabled />
                        </Stack>
                        <Stack direction={'row'} spacing={2}>
                            <TextField label="Mother's Name" sx={{ width: '100%' }} value={uerData.motherName || ""} name='motherName' required disabled />
                            <TextField label="Father's Name" sx={{ width: '100%' }} value={uerData.fatherName || ""} name='fatherName' required disabled />
                        </Stack>
                        <Stack spacing={2} direction={'row'}>
                            <TextField label='Sponsor Name' sx={{ width: '100%' }} value={uerData.sponsor1 || ""} name='sponsor1' required disabled />
                            <TextField label='Sponsor Name' sx={{ width: '100%' }} value={uerData.sponsor2 || ""} name='sponsor2' required disabled />
                        </Stack>
                        <TextField label='Priest' name='priest' value={uerData.priest || ""} required disabled />
                        <Divider />
                        <Button variant='contained' color='warning' onClick={() => handleSubmitClick()}>Submit</Button>
                    </Stack>
                </Box>
            </Box>
        </>
    )
}

export default ViewConfirmation