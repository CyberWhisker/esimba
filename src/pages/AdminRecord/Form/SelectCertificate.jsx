import React from 'react';
import { Box, Typography, Button, Divider, TextField, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../api/userApi';
import { Link } from 'react-router-dom';

const headerStyle = {
  p: 2,
  backgroundColor: (theme) => theme.palette.warning.main,  // Error color for header
  color: 'white',
  borderRadius: '4px 4px 0 0',  // Rounded corners for the top
};

const footerStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 1,
  p: 2
};

function SelectCertificate({selected, onClose, handleGetData}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {data, error} = await deleteUser(selected)
    if (error) {
      onClose();
      toast.error("Something went wrong!")
    } else {
      onClose();
      toast.success("Successfully deleted")
      handleGetData();
    }

  }

  return (
    <>
      <Box sx={headerStyle}>
        <Typography id="delete-modal-title" variant="h6" component="h2">
          Select Certificate
        </Typography>
      </Box>
      <Box sx={{p: 2}}>
        <TextField label='Select Certificate' value={''} name='certificate' select sx={{width: '100%'}}>
            <MenuItem value='baptism'>Baptism Certificate</MenuItem>
            <MenuItem value='death'>Death Certificate</MenuItem>
            <MenuItem value='confirmation'>Confirmation Certificate</MenuItem>
            <MenuItem value='marriage'>Marriage Certificate</MenuItem>
        </TextField>
      </Box>
      <Divider/>
      <form onSubmit={handleSubmit}>
        <Box sx={footerStyle}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="warning" type='submit' component={Link} to='/record/form'>
            Confirm
          </Button>
        </Box>
      </form>
    </>
  )
}

export default SelectCertificate