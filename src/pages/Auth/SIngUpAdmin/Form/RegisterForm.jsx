import React, { useContext, useEffect, useState } from 'react';
import { Autocomplete, Box, Button, CircularProgress, Divider, IconButton, InputAdornment, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import { registerUser } from '../../../../api/userApi';
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { fetchSubscriptionByChapelId, updateSubscriptionWithImage } from '../../../../api/subscription';
import { fetchAddress } from '../../../../api/addressApi';

function RegisterForm() {
    const gcashNumber = "1234-5678-9012";
    const { id } = useParams();
    const [loadingBtn, setLoadingBtn] = useState(false)
    const { setAuth } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        name: '',
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
        const { email, name, address, phone, password, confirmPassword, chapelName, chapelAddress, code } = formData;
        const newErrors = {};

        // Basic validation
        if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid email is required';
        if (!name) newErrors.name = 'Full Name is required';
        if (!address) newErrors.address = 'Address is required';
        if (!chapelName) newErrors.chapelName = 'Chapel Name is required';
        if (!chapelAddress) newErrors.chapelAddress = 'Chapel Address is required';
        if (!code) newErrors.code = 'Zip Code is required';
        if (!phone) newErrors.phone = 'Phone Number is required';
        if (!password || password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            setLoadingBtn(true)
            // Handle successful form submission
            const { data, error } = await registerUser(formData)
            if (error) {
                setLoadingBtn(false)
                toast.error(error)
            } else {
                localStorage.setItem('auth', JSON.stringify(data));
                localStorage.setItem('authAlert', JSON.stringify({ alert: 0, message: 'Successfully Registered' }));
                setAuth(data)
                if (id == 1) {
                    handleGetSubscription(data.user.parish._id)
                } else {
                    navigate('/admin/dashboard');
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
                {/* <TextField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    error={Boolean(errors.address)}
                    helperText={errors.address}
                /> */}
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
                <Stack direction={'row'} spacing={1}>
                    <SelectAddress formData={formData} setFormData={setFormData} />
                    {/* <TextField
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
                    /> */}
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
                    <Box>
                        <Typography variant="body1" textAlign={'center'}>
                            Please make the payment to the following GCash number:
                        </Typography>
                        <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold', color: 'secondary.main' }}>
                            {gcashNumber}
                        </Typography>
                        <Typography textAlign={'center'}>Kindly provide a screenshot of the transaction as proof of payment for verification purposes. Thank you.</Typography>
                        <TextField type='file' name='file' onChange={handleFileChange} required fullWidth />
                    </Box>
                }
                {loadingBtn && <Button type="submit" variant="contained" color='warning' disabled endIcon={<CircularProgress size={20} />}>Loading</Button>}
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

function SelectAddress({ formData, setFormData }) {
    const [address, setAddress] = useState("")
    const [barangayData, setBarangayData] = useState([]);
    const [addressData, setAddressData] = useState([])

    const handleCityChange = (event, value) => {
        setAddress(value)
        const barangay = addressData.find((item) => item.city == value)
        setFormData({
            ...formData,
            ['code']: barangay.zip
        })
        setBarangayData(barangay.barangays)
    }

    const handleBarangayChange = (event, value) => {
        setFormData({
            ...formData,
            ['chapelAddress']: `${value}, ${address}, Marinduque`
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
                id="city-select"
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
                id="barangay-select"
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