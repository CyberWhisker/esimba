import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';

const RequestResetPassword = () => {
    const [email, setEmail] = useState('');

    const handleRequestReset = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/user/request-reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
            <Typography variant="h5">Request Password Reset</Typography>
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleRequestReset}>
                Send Reset Link
            </Button>
        </Box>
    );
};

export default RequestResetPassword;
