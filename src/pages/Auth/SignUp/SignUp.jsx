import { Card, Container, Grid} from '@mui/material'
import React from 'react'
import MasterAuth from '../../../layouts/MasterAuth'
import { Link } from 'react-router-dom'
import RegisterForm from './Form/RegisterForm'
import Logo from '/appImg/Logo.png'

function SignUp() {
  return (
    <MasterAuth>
      <Grid container sx={{flex: 1, minHeight: '100vh'}}>
        <Grid item xs={6}>
          <Card elevation={5} sx={{
            borderRadius: 0,
            backgroundColor: 'rgba(128, 0, 0, 0.5)', 
            boxShadow: 'none', 
            transition: 'background-color 0.3s ease',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            backdropFilter: 'blur(10px)', 
          }}>
            <img alt='Logo' src={Logo} />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Container sx={{
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100%',
            py: 2
          }}>
            <Card elevation={5} sx={{
              padding: 2,
              backgroundColor: 'rgba(128, 0, 0, 0.5)', 
              backdropFilter: 'blur(10px)', 
              boxShadow: 'none', 
              transition: 'background-color 0.3s ease',
              width: '50vh', 
            }}>
              <RegisterForm/>
            </Card>
          </Container>
        </Grid>
    </Grid>
    </MasterAuth>
  )
}

export default SignUp