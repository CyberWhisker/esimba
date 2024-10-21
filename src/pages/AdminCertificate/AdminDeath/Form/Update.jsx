import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { fetchUsers } from '../../../../api/userApi';
import { updateBaptism } from '../../../../api/baptismApi';
import moment from 'moment';
import { updateDeath } from '../../../../api/deathApi';

function Update({ onClose, handleGetData, selected }) {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const handleSubmit = async () => {
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
    setLoading(true);
    const { data, error } = await fetchUsers();
    if (error) {
      toast.error(error);
    } else {
      setUserData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box sx={{ width: '60vh', p: 2 }}>
        <Stack spacing={1}>
          <Typography variant="h4" fontWeight="bold">
            Store Certificate
          </Typography>
          <Divider />
          <Typography>Personal Information</Typography>
          <TextField
            label="Select User"
            name="user"
            onChange={handleChange}
            select
            value={loading ? '' : dataForm.user._id}
          >
            {userData.map((item, index) => (
              <MenuItem key={index} value={item._id}>
                {item.firstName} {item.lastName}
              </MenuItem>
            ))}
          </TextField>
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
          />
          <TextField
            label="Birth Address"
            name="birthAddress"
            onChange={handleChange}
            value={dataForm.birthAddress}
          />
          <Divider />
          <Typography>Partner's Information</Typography>
          <TextField
            label="Full Name"
            name="partnerName"
            onChange={handleChange}
            value={dataForm.partnerName}
          />
          <Divider />
          <Typography>Mother's Information</Typography>
          <TextField
            label="Full Name"
            name="motherName"
            onChange={handleChange}
            value={dataForm.motherName}
          />
          <Divider />
          <Typography>Father's Information</Typography>
          <TextField
            label="Full Name"
            name="fatherName"
            onChange={handleChange}
            value={dataForm.fatherName}
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
          />
          <TextField
            label="Roman Catholic Cemetery"
            name="romanCemetary"
            onChange={handleChange}
            value={dataForm.romanCemetary}
          />
          <TextField
            label="Municipal Cemetery"
            name="municipalCemetary"
            onChange={handleChange}
            value={dataForm.municipalCemetary}
          />
          <TextField
            label="Private Cemetery"
            name="privateCemetary"
            onChange={handleChange}
            value={dataForm.privateCemetary}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
}

export default Update;
