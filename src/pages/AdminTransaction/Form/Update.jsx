import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { updateTransaction } from '../../../api/transactionApi'

function Update({ selected, handleGetData, onClose }) {
    const [formData, setFormData] = useState(selected)
    const handleSubmit = async () => {
        const newData = {
            _id: formData._id,
            user: formData.user,
            chapel: formData.chapel,
            amount: formData.amount,
        }

        const { data, error } = await updateTransaction(newData)
        
        if (error) {
            toast.error(error)
        } else {
            toast.success("Successfully updated")
            handleGetData();
            onClose();
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    return (
        <Box sx={{ width: '60vh', p: 2 }}>
            <Stack spacing={1}>
                <Typography variant='h4' fontWeight={'bold'}>Update Transaction</Typography>
                <Divider />
                <TextField label="Name" value={`${selected.name}`} disabled/>
                <TextField label="Request" value={`${selected.request}`} disabled/>
                <TextField label="Amount" name='amount' value={`${formData.amount}`} onChange={handleChange}/>
                <Button variant='contained' onClick={handleSubmit}>Submit</Button>
            </Stack>
        </Box>
    )
}

export default Update