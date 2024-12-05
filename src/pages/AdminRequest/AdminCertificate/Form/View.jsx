import React from 'react'
import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material'
import { toast } from 'react-toastify';
import { updateRequest } from '../../../../api/requestApi';

function View({ selected, onClose, handleGetData }) {

  const handleSubmit = async () => {
    const formData = {
      _id: selected._id,
      status: 'Approve'
    }
    await updateRequest(formData)
    toast.success("Successfully Updated")
    handleGetData()
    onClose()
  }

  return (
    <Box sx={{ width: '60vh', p: 2 }}>
      <Stack spacing={1}>
        <Typography variant='h5' fontWeight={'bold'}>View Transaction</Typography>
        <Divider />
        <TextField label="Certificate" disabled value={selected.certificate} />
        <TextField label="Amount" disabled value={selected.transaction.amount} />
        <img src={`/gcashImg/${selected.transaction.image}`} alt='No Image' />
        <Button variant='contained' onClick={() => handleSubmit()}>Approve</Button>
      </Stack>
    </Box>
  )
}

export default View