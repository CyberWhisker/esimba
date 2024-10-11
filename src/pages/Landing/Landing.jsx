import { Box, Button, Grid2, Stack, Typography } from '@mui/material'
import React from 'react'
import Master from '../../layouts/Master'
import { Link } from 'react-router-dom'
import Logo from '/appImg/Logo.png'
import CustomCard from '../../components/CustomCard'

function Landing() {
  return (
    <Master>
      <Grid2 container spacing={2} sx={{height: '100%'}}>

        <Grid2 size='grow' sx={{ justifyContent:'center', display: 'flex', alignItems: 'center'}}>
          <img src={Logo} style={{height: '40vh'}}/>
        </Grid2>

        <Grid2 size='grow' sx={{ justifyContent:'center', alignItems: 'center', display: 'flex'}}>
          <CustomCard>
            <Stack spacing={2} p={2}>
              <Typography variant='h4'>About</Typography>
              <Typography>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam doloremque harum nobis, nisi cupiditate dolore magnam placeat eligendi dolor molestias quod saepe itaque ducimus. Ut magni ipsa delectus natus dignissimos?</Typography>
              <Button color='warning' variant='contained' component={Link} to='/dashboard'>Continue</Button>
            </Stack>
          </CustomCard>
        </Grid2>

      </Grid2>
    </Master>
  )
}

export default Landing