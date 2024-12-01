import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Container, Divider } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import { fetchSubscriptionByChapelId, updateSubscriptionWithImage } from '../../api/subscription';
import { toast } from 'react-toastify';
import MasterAuth from '../../layouts/MasterAuth';
import { useNavigate } from 'react-router-dom';

const Expired = () => {
    const { auth } = useContext(AuthContext)
    const [formData, setFormData] = useState({});
    const gcashNumber = "1234-5678-9012"; // Replace with your actual GCash number

    const handleSubmit = async () => {
        const newForm = {
            ...formData,
            request: "Pending"
        }
        const { data, error } = await updateSubscriptionWithImage(newForm)
        if (error) {
            toast.error("Server Error")
        } else {
            handleGetSubscription()
            toast.success("Request is now Pending")
        }
    };

    const handleFileChange = (event) =>
        setFormData({ ...formData, file: event.target.files[0] });

    const handleGetSubscription = async () => {
        const { data, error } = await fetchSubscriptionByChapelId(auth.user.parish._id);
        if (!error) {
            setFormData(data);
        }
    }

    useEffect(() => {
        handleGetSubscription()
    }, [])

    return (
        <MasterAuth>
            {formData.request != "Pending" ? (
                <Container
                    maxWidth="sm"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                        textAlign: 'center',
                        bgcolor: 'background.paper',
                        py: 4,
                        px: 3,
                        borderRadius: 2,
                        boxShadow: 3,
                    }}
                >
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        Subscription Expired
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Your subscription has expired. Please renew to continue using the services.
                    </Typography>
                    <Divider sx={{ width: '100%', my: 2 }} />
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        Please make the payment to the following GCash number:
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'secondary.main', mb: 3 }}>
                        {gcashNumber}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 3 }}>
                        Kindly provide a screenshot of the transaction as proof of payment for verification purposes. Thank you.
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                        sx={{ width: '100%' }}
                    >
                        <TextField
                            fullWidth
                            type='file'
                            variant="outlined"
                            name='file'
                            required
                            sx={{ mb: 2 }}
                            onChange={handleFileChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </Box>
                </Container>
            ) :
                <ThankYou />
            }
        </MasterAuth>
    );
};

const ThankYou = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/')
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                bgcolor: 'background.paper',
                py: 4,
                px: 3,
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                Thank You for Subscribing!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
                Your transaction is currently <strong>pending</strong>. Please wait while we verify your payment.
            </Typography>
            <Typography variant="body2" sx={{ mb: 4, color: 'text.secondary' }}>
                If you have any questions, feel free to contact our support team.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleGoBack}
            >
                Go Back to Dashboard
            </Button>
        </Container>
    );
};

export default Expired;
