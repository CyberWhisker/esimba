import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { fetchUserByChapelId, fetchUsers } from '../../../../api/userApi';
import moment from 'moment';
import { updateDeath } from '../../../../api/deathApi';
import { AuthContext } from '../../../../context/AuthContext';

function Update({ onClose, handleGetData, selected }) {
  const {auth} =useContext(AuthContext)
  const [userData, setUserData] = useState([]);
  const [dataForm, setDataForm] = useState(selected);

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeDate = (name, value) => {
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data, error } = await updateDeath(dataForm);
    if (error) {
      toast.error(error);
    } else {
      toast.success('Successfully Updated');
    }
    handleGetData();
    onClose();
  };

  const handleGetUser = async () => {
    const { data, error } = await fetchUserByChapelId(auth.user.parish._id);
    if (error) {
      toast.error(error);
    } else {
      setUserData(data);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box sx={{ width: '60vh', p: 2 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={1}>
            <Typography variant="h4" fontWeight="bold">
              Update Certificate
            </Typography>
            <Divider />
            <Typography>Owner Certificate</Typography>
            <TextField label='Select User' name='user' onChange={handleChange} select value={dataForm.user.id}>
              {userData.map((item, index) => (
                <MenuItem key={index} value={item._id}>{item.firstName} {item.lastName}</MenuItem>
              ))}
            </TextField>
            <Divider />
            <Typography>Personal Information</Typography>
            <TextField
              label="Name"
              name="name"
              onChange={handleChange}
              value={dataForm.name}
              required
            />
            <DatePicker
              label="Birth Date"
              name="birthDate"
              value={moment(dataForm.birthDate)}
              onChange={(value) => handleChangeDate('birthDate', value)}
            />
            <TextField
              label="Age"
              name="age"
              onChange={handleChange}
              value={dataForm.age}
              required
            />
            <TextField
              label="Birth Address"
              name="birthAddress"
              onChange={handleChange}
              value={dataForm.birthAddress}
              required
            />
            <Divider />
            <Typography>Partner's Information</Typography>
            <TextField
              label="Full Name"
              name="partnerName"
              onChange={handleChange}
              value={dataForm.partnerName}
              required
            />
            <Divider />
            <Typography>Mother's Information</Typography>
            <TextField
              label="Full Name"
              name="motherName"
              onChange={handleChange}
              value={dataForm.motherName}
              required
            />
            <Divider />
            <Typography>Father's Information</Typography>
            <TextField
              label="Full Name"
              name="fatherName"
              onChange={handleChange}
              value={dataForm.fatherName}
              required
            />
            <Divider />
            <Typography>Death Information</Typography>
            <DatePicker
              label="Death Date"
              name="deathDate"
              value={moment(dataForm.deathDate)}
              onChange={(value) => handleChangeDate('deathDate', value)}
            />
            <TextField
              label="Cause of Death"
              name="causeOfDeath"
              onChange={handleChange}
              value={dataForm.causeOfDeath}
              required
            />
            <DatePicker
              label="Burial Date"
              name="burialDate"
              value={moment(dataForm.burialDate)}
              onChange={(value) => handleChangeDate('burialDate', value)}
            />
            <TextField
              label="Priest"
              name="priest"
              onChange={handleChange}
              value={dataForm.priest}
              required
            />
            <TextField
              label="Roman Catholic Cemetery"
              name="romanCemetary"
              onChange={handleChange}
              value={dataForm.romanCemetary}
              required
            />
            <TextField
              label="Municipal Cemetery"
              name="municipalCemetary"
              onChange={handleChange}
              value={dataForm.municipalCemetary}
              required
            />
            <TextField
              label="Private Cemetery"
              name="privateCemetary"
              onChange={handleChange}
              value={dataForm.privateCemetary}
              required
            />
            <Button variant="contained" type='submit'>
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </LocalizationProvider>
  );
}

export default Update;
