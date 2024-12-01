import React from 'react'
import Master from '../../layouts/Master'
import { Box, Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function UserSchedule() {
  return (
    <Master>
        <Box sx={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems:'center', paddingY: 10}}>
            <Typography variant='h1' fontWeight={'bold'}>Request Schedule</Typography>
            <Stack spacing={2} direction={'column'} justifyContent={'center'} mt={10} width={'50vh'}>
                <Button variant='contained' size='large' sx={{minWidth: '30vh'}} color='warning' component={Link} to='/user/schedule/baptism'>Baptism</Button>
                <Button variant='contained' size='large' sx={{minWidth: '30vh'}} color='warning' component={Link} to='/user/schedule/marriage'>Marriage</Button>
                <Button variant='contained' size='large' sx={{minWidth: '30vh'}} color='warning' component={Link} to='/user/schedule/death'>Burial</Button>
                <Button variant='contained' size='large' sx={{minWidth: '30vh'}} color='warning' component={Link} to='/user/schedule/confirmation'>Confirmation</Button>
            </Stack>
        </Box>
    </Master>
  )
}

export default UserSchedule