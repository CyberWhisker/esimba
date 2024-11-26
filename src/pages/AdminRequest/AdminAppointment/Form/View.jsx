import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import AlertModal from '../../../../components/AlertModal';
import StoreSchedule from './StoreSchedule';

function View({ selected, onClose, handleGetData }) {
  return (
    <Box sx={{ width: '60vh', p: 2 }}>
      <Stack spacing={1}>
        <Typography variant='h5' fontWeight={'bold'}>View Transaction</Typography>
        <Divider />
        <TextField label="Certificate" disabled value={selected.certificate} />
        <TextField label="Amount" disabled value={selected.transaction.amount} />
        <img src={`/gcashImg/${selected.transaction.image}`} alt='No Image' />
        <ApproveButton selected={selected} onClose={onClose} handleGetData={handleGetData}/>
      </Stack>
    </Box>
  )
}

function ApproveButton({selected, onClose, handleGetData}) {
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