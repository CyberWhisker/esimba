import { AppBar, Box, CssBaseline, Typography } from '@mui/material'
import React from 'react'

function Footer() {
  return (
    <AppBar position='relative' sx={{
      backgroundColor: 'rgba(128, 0, 0, 0.2)',
      p:3,
      backdropFilter: 'blur(10px)'
    }}>
      <Typography textAlign={'center'} fontWeight={'bold'}>Follow us on esimba.com</Typography>
    </AppBar>
  )
}

export default Footer