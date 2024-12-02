import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords don't match.");
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/user/confirm-reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword }),
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
            <Typography variant="h5">Reset Password</Typography>
            <TextField
                label="New Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleResetPassword}>
                Reset Password
            </Button>
        </Box>
    );
};

export default ResetPassword;
