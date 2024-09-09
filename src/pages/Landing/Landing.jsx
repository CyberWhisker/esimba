import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import Master from '../../layouts/Master'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <Master>
        <Box sx={{textAlign: 'center', paddingY: 10}}>
            <Typography variant='h1' fontWeight={'bold'}>Welcome</Typography>
            <Stack spacing={2} direction={'row'} justifyContent={'center'} sx={{paddingTop: 10}}>
                <Button variant='contained' color='warning' size='large' sx={{minWidth: '30vh'}} component={Link} to='/1/request'>Request Certificate</Button>
                <Button variant='contained' size='large' sx={{minWidth: '30vh'}}  component={Link} to='/1/schedule'>Schedule Event</Button>
            </Stack>
        </Box>
    </Master>
  )
}

export default Landing