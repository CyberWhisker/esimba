import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { toast } from 'react-toastify';
import { deleteRequest, updateRequest } from '../../../../api/requestApi';
import { updateReserved } from '../../../../api/reservedApi';
import { updateBaptism } from '../../../../api/baptismApi';
import { updateConfirmation } from '../../../../api/confirmationApi';
import { updateMarriage } from '../../../../api/marriageApi';
import { updateDeath } from '../../../../api/deathApi';

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

function Approve({ selected, onClose, handleGetData }) {
    console.log(selected)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            _id: selected._id,
            status: 'Approve'
        }
        await updateRequest(formData)


        if (selected.certificate == 'Baptism') {
            handleUpdateBaptism(selected)
        }
        if (selected.certificate == 'Confirmation') {
            handleUpdateConfirmation(selected)
        }
        if (selected.certificate == 'Burial') {
            handleUpdateDeath(selected)
        }
        if (selected.certificate == 'Marriage') {
            handleUpateMarriage(selected)
        }

        toast.success("Successfully Updated")
        handleGetData()
        onClose()
    }
    const handleUpdateBaptism = async (item) => {
        const newForm = {
            _id: item.certificateId,
            status: 'Approve'
        }
        await updateBaptism(newForm)
    }
    const handleUpdateConfirmation = async (item) => {
        const newForm = {
            _id: item.certificateId,
            status: 'Approve'
        }
        await updateConfirmation(newForm)
    }
    const handleUpateMarriage = async (item) => {
        const newForm = {
            _id: item.certificateId,
            status: 'Approve'
        }
        await updateMarriage(newForm)
    }
    const handleUpdateDeath = async (item) => {
        const newForm = {
            _id: item.certificateId,
            status: 'Approve'
        }
        await updateDeath(newForm)
    }

    return (
        <>
            <Box sx={headerStyle}>
                <Typography id="delete-modal-title" variant="h6" component="h2">
                    Approve Confirmation
                </Typography>
            </Box>
            <Typography id="delete-modal-description" sx={{ p: 2 }}>
                Are you sure you want to approve this item?
            </Typography>
            <Divider />
            <form onSubmit={handleSubmit}>
                <Box sx={footerStyle}>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="success" type='submit'>
                        Approve
                    </Button>
                </Box>
            </form>
        </>
    )
}

export default Approve