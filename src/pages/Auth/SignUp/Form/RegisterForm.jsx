import React, { useContext, useEffect, useState } from 'react';
import { Autocomplete, Button, CircularProgress, Divider, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import { registerUser } from '../../../../api/userApi';
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { fetchAddress } from '../../../../api/addressApi';

function RegisterForm() {
    const { setAuth } = useContext(AuthContext)
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        address: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 3,
        subscription: 0
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
        const { email, name, address, phone, password, confirmPassword } = formData;
        const newErrors = {};

        // Basic validation
        if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid email is required';
        if (!name) newErrors.name = 'Full Name is required';
        if (!address) newErrors.address = 'Address is required';
        if (!phone) newErrors.phone = 'Phone Number is required';
        if (!password || password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            setLoadingBtn(true)
            const { data, error } = await registerUser(formData)
            if (error) {
                setLoadingBtn(false)
                toast.error(error)
            } else {
                toast.success("Successfully registered")
                localStorage.setItem('auth', JSON.stringify(data))
                localStorage.setItem('authAlert', JSON.stringify({ alert: 0, message: 'Successfully Registered' }))
                setAuth(data)
                if (data.user.role == 3) {
                    navigate('/user/dashboard')
                } else {
                    navigate('/admin/dashboard')
                }
            }
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };
    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <Typography variant='h5' fontWeight={'bold'}>Register</Typography>
                <Divider />
                <Typography fontWeight={'bold'}>Personal Information</Typography>
                <TextField
                    label="Full Name"
                    name="name"
                    onChange={handleChange}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                />
                <Stack direction={'row'} spacing={1}>
                    <SelectAddressUser formData={formData} setFormData={setFormData} />
                </Stack>
                <TextField
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={Boolean(errors.phone)}
                    helperText={errors.phone}
                />
                <Divider />
                <Typography fontWeight={'bold'}>Account Information</Typography>
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
                {loadingBtn && <Button type="submit" variant="contained" color='warning' disabled endIcon={<CircularProgress size={20}/>}>Loading</Button>}
                {!loadingBtn && <Button type="submit" variant="contained" color='warning'>Submit</Button>}
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

function SelectAddressUser({ formData, setFormData }) {
    const [address, setAddress] = useState("")
    const [barangayData, setBarangayData] = useState([]);
    const [addressData, setAddressData] = useState([])

    const handleCityChange = (event, value) => {
        setAddress(value)
        const barangay = addressData.find((item) => item.city == value)
        setFormData({
            ...formData,
        })
        setBarangayData(barangay.barangays)
    }

    const handleBarangayChange = (event, value) => {
        setFormData({
            ...formData,
            ['address']: `${value}, ${address}, Marinduque`
        })
    }

    useEffect(() => {
        const getAddress = async () => {
            const { data, error } = await fetchAddress()
            if (!error) {
                setAddressData(data)
            }
        }
        getAddress()
    }, [])
    return (
        <>
            <Autocomplete
                fullWidth
                defaultValue={''}
                onChange={(event, value) => handleCityChange(event, value)}
                disablePortal
                name="city"
                options={addressData.map((item) => item.city)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={"City"}
                        name={"city"}
                        fullWidth
                    />
                )}
                isOptionEqualToValue={(option, value) => option === value} // for value matching
            />
            <Autocomplete
                fullWidth
                defaultValue={''}
                onChange={(event, value) => handleBarangayChange(event, value)}
                disablePortal
                name="barangay"
                options={barangayData.map((item) => item)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={"Barangay"}
                        name={"barangay"}
                        fullWidth
                    />
                )}
                isOptionEqualToValue={(option, value) => option === value} // for value matching
            />
        </>
    )
}

export default RegisterForm