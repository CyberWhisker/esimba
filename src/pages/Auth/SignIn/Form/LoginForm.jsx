import { Button, Divider, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../../context/AuthContext';
import { loginUser } from '../../../../api/userApi';
import { toast } from 'react-toastify';

function LoginForm() {
    const { setAuth } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear the error for the field as the user types
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const validate = () => {
        const newErrors = {};

        // Email validation (basic pattern)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailPattern.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        // Password validation (minimum length)
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate form data
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Handle form submission logic here

        const { data, error } = await loginUser(formData)
        if (error) {
            toast.error(error)
        } else {
            toast.success("Successfully login")
            localStorage.setItem('auth', JSON.stringify(data))
            localStorage.setItem('authAlert', JSON.stringify({alert: 0, message: 'Successfully Login'}))
            setAuth(data)
            if (data.user.role == 3) {
                navigate('/user/dashboard')
            } else {
                navigate('/admin/dashboard')
            }
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <Stack direction={'column'} spacing={2}>
                <Typography variant='h5' fontWeight={'bold'}>Login</Typography>
                <Divider />
                <TextField
                    label='Enter Email'
                    name='email'
                    onChange={handleChange}
                    helperText={errors.email}
                    error={!!errors.email}
                />
                <TextField
                    label='Enter Password'
                    name='password'
                    onChange={handleChange}
                    type='password'
                    helperText={errors.password}
                    error={!!errors.password}
                />
                <Button variant='contained' color='warning' type='submit'>LogIn</Button>
                <Button variant='outlined' component={Link} to='/selectRegistration' color='warning'>Register</Button>
                <Typography textAlign={'end'} component={Link} to={'/request-reset-password'} sx={{textDecoration: '', color: 'white'}}>Reset Password</Typography>
                <Divider />
                <Stack direction={'row'} >
                    <Typography>Need Help?</Typography>
                </Stack>
            </Stack>
        </form>
    )
}

export default LoginForm