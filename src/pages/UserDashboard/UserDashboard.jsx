import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Master from '../../layouts/Master'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function UserDashboard() {
    const handleAuthAlert = async () => {
        const authAlert = JSON.parse(localStorage.getItem('authAlert'))
        if (authAlert) {
            await toast.success(authAlert.message)
            localStorage.removeItem('authAlert')
        }
    }

    useEffect(() => {
        handleAuthAlert()
    }, [])

    return (
        <Master>
            <Box sx={{ textAlign: 'center', paddingY: 10 }}>
                <Typography variant='h1' fontWeight={'bold'}>Welcome</Typography>
                <Stack spacing={2} justifyContent={'center'} alignItems={'center'}>
                    <Stack spacing={2} direction={'row'} justifyContent={'center'} sx={{ paddingTop: 8 }}>
                        <Button variant='contained' color='warning' size='large' sx={{ minWidth: '30vh' }} component={Link} to='/user/request'>Request Certificate</Button>
                        <Button variant='contained' size='large' sx={{ minWidth: '30vh' }} component={Link} to='/user/schedule'>Schedule Event</Button>
                    </Stack>
                    {/* <Button variant='contained' color='success' sx={{ minWidth: '65vh' }} component={Link} to='/user/donation'>Donate Now</Button> */}
                </Stack>
            </Box>
        </Master>
    )
}

export default UserDashboard