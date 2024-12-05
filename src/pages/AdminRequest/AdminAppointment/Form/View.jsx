import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import AlertModal from '../../../../components/AlertModal';
import StoreSchedule from './StoreSchedule';
import { updateReserved } from '../../../../api/reservedApi';
import { toast } from 'react-toastify';

function View({ selected, onClose, handleGetData }) {

  const handleSubmit = async () => {
    const formData = {
      _id: selected._id,
      status: 'Approve'
    }
    await updateReserved(formData)
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
        {/* <ApproveButton selected={selected} onClose={onClose} handleGetData={handleGetData}/> */}
      </Stack>
    </Box>
  )
}

function ApproveButton({ selected, onClose, handleGetData }) {
  const [certificateModal, setCertificateModal] = useState(false);
  return (
    <>
      <Button variant='contained' onClick={() => setCertificateModal(true)}>Approve</Button>
      <AlertModal open={certificateModal} onClose={() => setCertificateModal(false)}>
        <StoreSchedule onClose={onClose} selected={selected} handleGetData={handleGetData} />
      </AlertModal>
    </>
  )
}

export default View