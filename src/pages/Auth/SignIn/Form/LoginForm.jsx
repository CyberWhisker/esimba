import { Button, Divider, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    
    const [errors, setErrors] = useState({});
    
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
    
    const handleSubmit = async () => {
    
        // Validate form data
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
        }
    
        // Handle form submission logic here
    
    };
    return (
        <Stack direction={'column'} spacing={2}>
            <Typography variant='h5' fontWeight={'bold'}>Login</Typography>
            <Divider/>
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
                helperText={errors.password}
                error={!!errors.password}
            />
            <Button variant='contained' color='warning' onClick={() => handleSubmit()}>LogIn</Button>
            <Button variant='outlined' component={Link} to='/register' color='warning'>Register</Button>
            <Divider/>
            <Stack direction={'row'} justifyContent={'end'}>
                <Typography>Need Help?</Typography>
            </Stack>
        </Stack>
    )
}

export default LoginForm