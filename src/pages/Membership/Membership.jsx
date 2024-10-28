import React from 'react'
import Master from '../../layouts/Master'
import CustomCard from '../../components/CustomCard'
import { Button, Divider, Grid2, Stack, Typography } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import { Link } from 'react-router-dom'

function Membership() {
  return (
    <Master>
      <Grid2 container spacing={2} sx={{height: '100%'}} direction={{xs: 'column', lg: 'row'}}>
        <Grid2 size='grow'>
          <CustomCard>
            <Stack justifyContent={'space-between'} direction={'column'} height={'100%'} p={2} spacing={2}>
              <Stack spacing={2}>
                <Typography fontWeight={'bold'} variant='h4'>Free</Typography>
                <Typography fontWeight={'bold'} variant='h4'>₱ 0.00 per month</Typography>
                <Divider/>
                <Stack direction={'row'} spacing={2}>
                  <CheckCircle/>
                  <Typography>Certificate Issuance</Typography>
                </Stack>
                <Stack direction={'row'} spacing={2}>
                  <CheckCircle/>
                  <Typography>Event Management </Typography>
                </Stack>
                <Stack direction={'row'} spacing={2}>
                  <CheckCircle/>
                  <Typography>Basic Member Management </Typography>
                </Stack>
                <Stack direction={'row'} spacing={2}>
                  <CheckCircle/>
                  <Typography>Limited Users (75 users only)</Typography>
                </Stack>
              </Stack>
              <Button color='warning' variant='contained' component={Link} to={'/register/2'}>Sign up for Free</Button>
            </Stack>
          </CustomCard>
        </Grid2>
        <Grid2 size='grow'>
          <CustomCard>
            <Stack justifyContent={'space-between'} direction={'column'} height={'100%'} p={2} spacing={2}>
              <Stack spacing={2}>
                <Typography fontWeight={'bold'} variant='h4'>Premium</Typography>
                <Typography fontWeight={'bold'} variant='h4'>₱ 50.00 per month</Typography>
                <Divider/>
                <Stack direction={'row'} spacing={2}>
                  <CheckCircle/>
                  <Typography>Certificate Issuance</Typography>
                </Stack>
                <Stack direction={'row'} spacing={2}>
                  <CheckCircle/>
                  <Typography>Event Management</Typography>
                </Stack>
                <Stack direction={'row'} spacing={2}>
                  <CheckCircle/>
                  <Typography>Accept Online Mass Intentions and Donations</Typography>
                </Stack>
                <Stack direction={'row'} spacing={2}>
                  <CheckCircle/>
                  <Typography>Advanced Member Management</Typography>
                </Stack>
                <Stack direction={'row'} spacing={2}>
                  <CheckCircle/>
                  <Typography>unlimited users</Typography>
                </Stack>
              </Stack>
              <Button variant='contained' component={Link} to={'/register/1'}>Start Now</Button>
            </Stack>
          </CustomCard>
        </Grid2>
      </Grid2>
    </Master>
  )
}

export default Membership