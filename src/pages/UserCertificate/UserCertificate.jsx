import React from 'react'
import Master from '../../layouts/Master'
import { Box, Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function UserCertificate() {
  return (
    <Master>
        <Box sx={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems:'center'}}>
            <Typography variant='h1' fontWeight={'bold'} sx={{paddingTop: 20}}>Request Certificate</Typography>
            <Stack spacing={2} direction={'column'} justifyContent={'center'} mt={10} width={'50vh'}>
                <Button variant='contained' size='large' sx={{minWidth: '30vh'}} color='warning'>Baptism</Button>
                <Button variant='contained' size='large' sx={{minWidth: '30vh'}} color='warning'>Marriage</Button>
                <Button variant='contained' size='large' sx={{minWidth: '30vh'}} color='warning'>Death</Button>
                <Button variant='contained' size='large' sx={{minWidth: '30vh'}} color='warning'>Confirmation</Button>
            </Stack>
        </Box>
    </Master>
  )
}

export default UserCertificate