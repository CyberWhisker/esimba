import React, { useContext, useState } from 'react';
import { Button, Divider, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import { registerUser } from '../../../../api/userApi';
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { fetchSubscriptionByChapelId, updateSubscriptionWithImage } from '../../../../api/subscription';

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
                localStorage.setItem('auth', JSON.stringify(data));
                localStorage.setItem('authAlert', JSON.stringify({ alert: 0, message: 'Successfully Registered' }));
                setAuth(data)
                if (id == 1) {
                    handleGetSubscription(data.user.parish._id)
                }
            }
        }
    };

    const handleGetSubscription = async (id) => {
        const { data, error } = await fetchSubscriptionByChapelId(id);

        if (error) {
            toast.error("Server Error");
        } else {
            const newFormData = {
                ...data,
                status: false,
                request: "Pending",
                file: formData.file,
            };

            // Avoid overwriting data variable
            const { data: updatedData, error: updateError } = await updateSubscriptionWithImage(newFormData);

            if (!updateError) {
                navigate('/admin/dashboard');
            } else {
                toast.error("Error updating subscription");
            }
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleFileChange = (event) =>
        setFormData({ ...formData, file: event.target.files[0] });

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <Typography variant='h5' fontWeight={'bold'}>Register</Typography>
                <Divider />
                <Typography>Personal Information</Typography>
                <Stack direction={'row'} spacing={1}>
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
                </Stack>
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
                <Stack direction={'row'} spacing={1}>
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
                </Stack>
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
                <Stack direction={'row'} spacing={1}>
                    <TextField
                        fullWidth
                        label="Enter Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={togglePasswordVisibility}
                                        edge="end"
                                        aria-label="toggle password visibility"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={Boolean(errors.confirmPassword)}
                        helperText={errors.confirmPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={togglePasswordVisibility}
                                        edge="end"
                                        aria-label="toggle password visibility"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>
                <Divider />
                {id == 1 &&
                    <TextField type='file' name='file' onChange={handleFileChange} required />
                }

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