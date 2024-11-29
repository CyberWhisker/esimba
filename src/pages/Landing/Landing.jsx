import { Box, Button, Drawer, Grid2, Stack, Typography } from '@mui/material'
import React, { useContext } from 'react'
import Master from '../../layouts/Master'
import { Link } from 'react-router-dom'
import Logo from '/appImg/Logo.png'
import CustomCard from '../../components/CustomCard'
import { AuthContext } from '../../context/AuthContext'

function Landing() {
  const { auth } = useContext(AuthContext)
  return (
    <Master>
      <Grid2 container spacing={2} sx={{ height: '100%' }}>

        <Grid2 size='grow' sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
          <img src={Logo} style={{ height: '40vh' }} />
        </Grid2>

        <Grid2 size='grow' sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
          <CustomCard>
            <Stack spacing={2} p={2}>
              <Typography variant='h4'>About</Typography>
              <Typography>eSimba is a SaaS platform that streamlines parish management by automating event scheduling and certificate issuance. Designed for parishes in Marinduque, it simplifies administration, reduces errors, and offers convenient online access for parishioners to book events and request certificates, allowing parishes to focus more on community and spiritual support.</Typography>
              {auth?.user.role == "admin" ? (
                <Button color='warning' variant='contained' component={Link} to='/user/dashboard'>Continue</Button>
              ) : (
                <Button color='warning' variant='contained' component={Link} to='/admin/dashboard'>Continue</Button>
              )}
            </Stack>
          </CustomCard>
        </Grid2>
      </Grid2>
    </Master>
  )
}

export default Landing