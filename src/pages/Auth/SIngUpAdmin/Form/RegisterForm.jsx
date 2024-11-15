import React, { useContext, useState } from 'react';
import { Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import { registerUser } from '../../../../api/userApi';
import { toast } from 'react-toastify';

function RegisterForm() {
    const { id } = useParams();
    const { setAuth } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        address: '',
        phone: '',
        chapelName: '',
        chapelAddress: '',
        chapelZipCode: '',
        code: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 2,
        subscription: id,
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, firstName, lastName, middleName, address, phone, password, confirmPassword, chapelName, chapelAddress, code } = formData;
        const newErrors = {};

        // Basic validation
        if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid email is required';
        if (!firstName) newErrors.firstName = 'First Name is required';
        if (!lastName) newErrors.lastName = 'Last Name is required';
        if (!middleName) newErrors.middleName = 'Middle Name is required';
        if (!address) newErrors.address = 'Address is required';
        if (!chapelName) newErrors.chapelName = 'Chapel Name is required';
        if (!chapelAddress) newErrors.chapelAddress = 'Chapel Address is required';
        if (!code) newErrors.code = 'Zip Code is required';
        if (!phone) newErrors.phone = 'Phone Number is required';
        if (!password || password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            // Handle successful form submission
            const { data, error } = await registerUser(formData)
            if (error) {
                toast.error(error)
            } else {
                toast.success("Successfully registered")
                localStorage.setItem('auth', JSON.stringify(data))
                localStorage.setItem('authAlert', JSON.stringify({alert: 0, message: 'Successfully Registered'}))
                setAuth(data)
                navigate('/admin/dashboard')
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <Typography variant='h5' fontWeight={'bold'}>Register</Typography>
                <Divider />
                <Typography>Personal Information</Typography>
                <TextField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName}
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName}
                />
                <TextField
                    label="Middle Name"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    error={Boolean(errors.middleName)}
                    helperText={errors.middleName}
                />
                <TextField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    error={Boolean(errors.address)}
                    helperText={errors.address}
                />
                <TextField
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={Boolean(errors.phone)}
                    helperText={errors.phone}
                />
                <Divider />
                <Typography>Chapel Information</Typography>
                <TextField
                    label="Chapel Name"
                    name="chapelName"
                    value={formData.chapelName}
                    onChange={handleChange}
                    error={Boolean(errors.chapelName)}
                    helperText={errors.chapelName}
                />
                <TextField
                    label="Chapel Address"
                    name="chapelAddress"
                    value={formData.chapelAddress}
                    onChange={handleChange}
                    error={Boolean(errors.chapelAddress)}
                    helperText={errors.chapelAddress}
                />
                <TextField
                    label="Zip Code"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    error={Boolean(errors.code)}
                    helperText={errors.code}
                />
                <Divider />
                <Typography>Account Information</Typography>
                <TextField
                    label="Enter Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                />
                <TextField
                    label="Enter Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword}
                />
                <Button type="submit" variant="contained" color='warning'>Submit</Button>
                <Typography
                    variant="body2"
                    color="primary"
                    component={Link}
                    to="/login"
                    textAlign="center"
                    sx={{ textDecoration: 'none' }}
                >
                    I Already Have an Account
                </Typography>
            </Stack>
        </form>
    );
}

export default RegisterForm