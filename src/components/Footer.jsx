import { AppBar, Typography } from '@mui/material'
import React from 'react'

function Footer() {
  return (
    <AppBar position='relative' sx={{
        p:3,
        backgroundColor: 'rgba(128, 0, 0, 0.5)', 
    }}>
        <Typography textAlign={'center'} fontWeight={'bold'}>Follow us on esimba.com</Typography>
    </AppBar>
  )
}

export default Footer