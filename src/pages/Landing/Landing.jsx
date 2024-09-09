import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import Master from '../../layouts/Master'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <Master>
        <Box sx={{textAlign: 'center'}}>
            <Typography variant='h1' fontWeight={'bold'} sx={{paddingTop: 20}}>Welcome</Typography>
            <Stack spacing={2} direction={'row'} justifyContent={'center'} mt={20}>
                <Button variant='contained' color='warning' size='large' sx={{minWidth: '30vh'}} component={Link} to='/1/certificate'>Request Certificate</Button>
                <Button variant='contained' size='large' sx={{minWidth: '30vh'}}>Schedule Event</Button>
            </Stack>
        </Box>
    </Master>
  )
}

export default Landing