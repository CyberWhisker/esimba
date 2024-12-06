import React from 'react';
import { Box, Typography, Button, Divider, Stack, TextField } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { updateBaptism } from '../../../api/baptismApi';
import { toast } from 'react-toastify';
import { updateDeath } from '../../../api/deathApi';
import { updateMarriage } from '../../../api/marriageApi';
import { updateConfirmation } from '../../../api/confirmationApi';
import { storeTransaction } from '../../../api/transactionApi';
import { storeRequest } from '../../../api/requestApi';

const headerStyle = {
    p: 2,
    backgroundColor: (theme) => theme.palette.primary.main,  // Error color for header
    color: 'white',
    borderRadius: '4px 4px 0 0',  // Rounded corners for the top
};

const footerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 1,
    p: 2
};

function StoreRequest({ onClose, formData, setFormData, handleToggle }) {

    const handleFileChange = (event) =>
        setFormData({ ...formData, file: event.target.files[0] });

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formData.certificate == 'Baptism') {
            handleUpdateBaptism(formData)
        }
        if (formData.certificate == 'Confirmation') {
            handleUpdateConfirmation(formData)
        }
        if (formData.certificate == 'Burial') {
            handleUpdateDeath(formData)
        }
        if (formData.certificate == 'Marriage') {
            handleUpateMarriage(formData)
        }
        const transForm = {
            user: formData.user,
            chapel: formData.parish,
            file: formData.file,
            amount: formData.amount,
        }
        const { data, error } = await storeTransaction(transForm)
        if (!error) {
            const requestForm = {
                user: formData.user,
                parish: formData.parish,
                transaction: data._id,
                certificateId: formData.certificateId,
                certificate: formData.certificate,
            }
            console.log(requestForm)
            const { data: requestData, error: requestError } = await storeRequest(requestForm)
            if (requestError) {
                toast.error("Request Failed")
            } else {
                toast.success("Successfully Submitted")
                handleToggle();
                onClose();
            }
        }
    }

    const handleUpdateBaptism = async (item) => {
        const newForm = {
            _id: item.certificateId,
            status: 'Pending'
        }
        await updateBaptism(newForm)
    }
    const handleUpdateConfirmation = async (item) => {
        const newForm = {
            _id: item.certificateId,
            status: 'Pending'
        }
        await updateConfirmation(newForm)
    }
    const handleUpateMarriage = async (item) => {
        const newForm = {
            _id: item.certificateId,
            status: 'Pending'
        }
        await updateMarriage(newForm)
    }
    const handleUpdateDeath = async (item) => {
        const newForm = {
            _id: item.certificateId,
            status: 'Pending'
        }
        await updateDeath(newForm)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={headerStyle}>
                <Typography id="delete-modal-title" variant="h6" component="h2">
                    Request Form
                </Typography>
            </Box>
            <Stack sx={{ p: 2 }} spacing={1}>
                <Typography>Gcash Reciept</Typography>
                <TextField type='file' name='file' onChange={handleFileChange} multiple required />
            </Stack>
            <Divider />
            <Box sx={footerStyle}>
                <Button variant="outlined" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="contained" color="success" type="submit">
                    Proceed
                </Button>
            </Box>
        </form>
    );
}

export default StoreRequest