import React from 'react'
import Master from '../../layouts/Master'
import { Box, Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function UserCertificate() {
  return (
    <Master>
        <Box sx={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems:'center', paddingY: 10}}>
            <Typography variant='h1' fontWeight={'bold'}>Request Certificate</Typography>
            <Stack spacing={2} direction={'column'} justifyContent={'center'} mt={10} width={'50vh'}>
                <Button variant='contained' size='large' sx={{minWidth: '30vh'}} color='warning' component={Link} to='/user/request/baptism'>Baptism</Button>
                <Button variant='contained' size='large' sx={{minWidth: '30vh'}} color='warning' component={Link} to='/user/request/marriage'>Marriage</Button>
                {/* <Button variant='contained' size='large' sx={{minWidth: '30vh'}} color='warning' component={Link} to='/user/request/death'>Death</Button> */}
                <Button variant='contained' size='large' sx={{minWidth: '30vh'}} color='warning' component={Link} to='/user/request/confirmation'>Confirmation</Button>
            </Stack>
        </Box>
    </Master>
  )
}

export default UserCertificate