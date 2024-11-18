import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { toast } from 'react-toastify';
import { deleteRequest, updateRequest } from '../../../../api/requestApi';
import { storeBaptism } from '../../../../api/baptismApi';
import { storeConfirmation } from '../../../../api/confirmationApi';
import { storeMarriage } from '../../../../api/marriageApi';
import { storeDeath } from '../../../../api/deathApi';

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

function StoreCertificate({ selected, onClose, handleGetData }) {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newData = {
            ...selected.data,
            chapel: selected.parish,
            user: selected.user._id
        }
        if (selected.certificate == "Baptism Certificate") {
            await handleSubmitBaptism(newData)
        }
        if (selected.certificate == "Death Certificate") {
            await handleSubmitDeath(newData)
        }
        if (selected.certificate == "Marriage Certificate") {
            await handleSubmitMarriage(newData)
        }
        if (selected.certificate == "Confirmation Certificate") {
            await handleSubmitConfirmation(newData)
        }
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

    const handleSubmitBaptism = async (formData) => {
        const { data, error } = await storeBaptism(formData)
        if (error) {
            toast.error(error)
        }
    }

    const handleSubmitDeath = async (formData) => {
        const { data, error } = await storeDeath(formData)
        if (error) {
            toast.error(error)
        }
    }

    const handleSubmitMarriage = async (formData) => {
        const { data, error } = await storeMarriage(formData)
        if (error) {
            toast.error(error)
        }
    }

    const handleSubmitConfirmation = async (formData) => {
        const { data, error } = await storeConfirmation(formData)
        if (error) {
            toast.error(error)
        }
    }

    return (
        <>
            <Box sx={headerStyle}>
                <Typography id="delete-modal-title" variant="h6" component="h2">
                    Create Confirmation
                </Typography>
            </Box>
            <Typography id="delete-modal-description" sx={{ p: 2 }}>
                This will create a certificate for this user
            </Typography>
            <Divider />
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
        </>
    )
}

export default StoreCertificate