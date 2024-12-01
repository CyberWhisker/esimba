import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { toast } from 'react-toastify';
import { updateSubscription } from '../../../api/subscription';

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

function Renew({selected, onClose, handleGetData}) {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {data, error} = await updateSubscription(selected)
    if (error) {
      onClose();
      toast.error("Something went wrong!")
    } else {
      onClose();
      toast.success("Successfully updated")
      handleGetData();
    }

  }

  return (
    <>
      <Box sx={headerStyle}>
        <Typography id="delete-modal-title" variant="h6" component="h2">
          Renew This Account
        </Typography>
      </Box>
      <Typography id="delete-modal-description" sx={{ p:2}}>
        Are you sure you want to renew this item.
      </Typography>
      <Divider/>
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

export default Renew