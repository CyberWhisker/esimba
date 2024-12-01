import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { fetchUserByChapelId, fetchUsers } from '../../../../api/userApi';
import { AuthContext } from '../../../../context/AuthContext';
import { storeMarriage } from '../../../../api/marriageApi';

function Store({ onClose, handleGetData }) {
  const { auth } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [dataForm, setDataForm] = useState({
    user: '',
    chapel: auth.user.parish._id,
    birthDate: null,
    age: '',
    marriageDate: '',
    birthAddress: '',
    motherName: '',
    fatherName: '',
    partnerName: '',
    witness1: '',
    witness2: '',
    priest: '',
  });

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
    const { data, error } = await storeMarriage(dataForm);
    if (error) {
      toast.error(error);
    } else {
      toast.success('Successfully Added');
      handleGetData();
      onClose();
    }
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
              Store Certificate
            </Typography>
            <Divider />
            <TextField
              label="Select User"
              name="user"
              onChange={handleChange}
              select
              value={dataForm.user}
              required
            >
              {userData.map((item, index) => (
                <MenuItem key={index} value={item._id}>
                  {item.firstName} {item.lastName}
                </MenuItem>
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
              value={dataForm.birthDate}
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
              label="Partner's Full Name"
              name="partnerName"
              onChange={handleChange}
              value={dataForm.partnerName}
              required
            />
            <Divider />
            <Typography>Mother's Information</Typography>
            <TextField
              label="Mother's Full Name"
              name="motherName"
              onChange={handleChange}
              value={dataForm.motherName}
              required
            />
            <Divider />
            <Typography>Father's Information</Typography>
            <TextField
              label="Father's Full Name"
              name="fatherName"
              onChange={handleChange}
              value={dataForm.fatherName}
              required
            />
            <Divider />
            <Typography>Marriage Information</Typography>
            <DatePicker
              label="Marriage Date"
              name="marriageDate"
              value={dataForm.deathDate}
              onChange={(value) => handleChangeDate('marriageDate', value)}
            />
            <TextField
              label="Priest"
              name="priest"
              onChange={handleChange}
              value={dataForm.priest}
              required
            />
            <TextField
              label="Witness 1"
              name="witness1"
              onChange={handleChange}
              value={dataForm.witness1}
              required
            />
            <TextField
              label="Witness 2"
              name="witness2"
              onChange={handleChange}
              value={dataForm.witness2}
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

export default Store;
