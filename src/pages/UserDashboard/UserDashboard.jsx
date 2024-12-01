import { Box, Button, Grid, Stack, Typography, Card, CardContent, Divider } from '@mui/material';
import React, { useEffect } from 'react';
import Master from '../../layouts/Master';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AccessTime, CalendarToday } from '@mui/icons-material';  // Add icons for better visualization
import CustomCard from '../../components/CustomCard';

function UserDashboard() {
    const handleAuthAlert = async () => {
        const authAlert = JSON.parse(localStorage.getItem('authAlert'));
        if (authAlert) {
            await toast.success(authAlert.message);
            localStorage.removeItem('authAlert');
        }
    }

    useEffect(() => {
        handleAuthAlert();
    }, []);

    return (
        <Master>
            <Box sx={{ paddingY: 10 }}>
                <Grid container spacing={4} justifyContent="center" alignItems="flex-start">
                    {/* Welcome Section */}
                    <Grid item xs={12} md={7}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant='h1' fontWeight={'bold'}>Welcome</Typography>
                            <Stack spacing={2} justifyContent={'center'} alignItems={'center'}>
                                <Stack spacing={2} direction={'column'} justifyContent={'center'} sx={{ paddingTop: 8 }}>
                                    <Button variant='contained' color='warning' size='large' sx={{ minWidth: '55vh' }} component={Link} to='/user/request'>Request Certificate</Button>
                                    <Button variant='contained' size='large' sx={{ minWidth: '55vh' }} component={Link} to='/user/schedule'>Schedule Event</Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </Grid>

                    {/* InfoList Section */}
                    <Grid item xs={12} md={5}>
                        <InfoList />
                    </Grid>
                </Grid>
            </Box>
        </Master>
    )
}

function InfoList() {
    return (
        <CustomCard>
            <CardContent sx={{ textAlign: 'center', width: '100%' }}>
                {/* Office Hours Title */}
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="primary"
                    sx={{ 
                        textAlign: 'center', 
                        fontSize: { xs: 24, sm: 28 } 
                    }}
                >
                    Office Hours
                </Typography>

                {/* Time and Day Information */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    {/* Morning Hours */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTime sx={{ fontSize: 24, color: 'primary.main' }} />
                        <Typography variant="body1" color="text.secondary" sx={{ fontSize: 18 }}>
                            8:30 AM to 11:30 AM
                        </Typography>
                    </Box>

                    {/* Days */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarToday sx={{ fontSize: 24, color: 'primary.main' }} />
                        <Typography variant="body1" color="text.secondary" sx={{ fontSize: 18 }}>
                            Monday to Saturday
                        </Typography>
                    </Box>

                    {/* Afternoon Hours */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTime sx={{ fontSize: 24, color: 'primary.main' }} />
                        <Typography variant="body1" color="text.secondary" sx={{ fontSize: 18 }}>
                            2:00 PM to 5:00 PM
                        </Typography>
                    </Box>

                    {/* Sunday */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarToday sx={{ fontSize: 24, color: 'primary.main' }} />
                        <Typography variant="body1" color="text.secondary" sx={{ fontSize: 18 }}>
                            Sunday: Half Day
                        </Typography>
                    </Box>
                    {/* Holiday */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarToday sx={{ fontSize: 24, color: 'primary.main' }} />
                        <Typography variant="body1" color="text.secondary" sx={{ fontSize: 18 }}>
                            Holiday: No Office Hours
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </CustomCard>
    )
}

export default UserDashboard;
