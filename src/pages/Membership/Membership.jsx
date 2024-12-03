import React from 'react'
import CustomCard from '../../components/CustomCard'
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material'
import { CheckCircle, KeyboardReturn } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import MasterAuth from '../../layouts/MasterAuth'

function Membership() {
  const navigate = useNavigate();

  return (
    <MasterAuth>
      <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Box sx={{ width: '100%', maxWidth: '1200px' }}>
          <Button
            endIcon={<KeyboardReturn />}
            variant='contained'
            onClick={() => navigate(-1)}
            sx={{ mb: 2, fontWeight: 'bold' }}
          >
            Go Back
          </Button>

          <Grid container spacing={4} sx={{ height: '100%' }} direction={{ xs: 'column', md: 'row' }}>
            {/* Free Membership Card */}
            <Grid item xs={12} md={6}>
              <CustomCard sx={{ boxShadow: 3 }}>
                <Stack justifyContent={'space-between'} direction={'column'} height={'100%'} p={4} spacing={3}>
                  <Stack spacing={2}>
                    <Typography variant="h4" fontWeight="bold" color="primary" textAlign={'center'}>Premium Trial</Typography>
                    <Typography variant="h6" color="text.secondary" textAlign={'center'}>
                      <span style={{ fontWeight: 'bold' }}>Try 3 months of free trial</span> with full access to all features
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Stack direction={'row'} spacing={2}>
                      <CheckCircle color="success" />
                      <Typography>Certificate Issuance</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={2}>
                      <CheckCircle color="success" />
                      <Typography>Event Management</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={2}>
                      <CheckCircle color="success" />
                      <Typography>User Management</Typography>
                    </Stack>
                  </Stack>
                  <Button
                    variant='contained'
                    color="warning"
                    component={Link}
                    to={'/register/2'}
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Sign up Now
                  </Button>
                </Stack>
              </CustomCard>
            </Grid>

            {/* Premium Membership Card */}
            <Grid item xs={12} md={6}>
              <CustomCard sx={{ boxShadow: 3 }}>
                <Stack justifyContent={'space-between'} direction={'column'} height={'100%'} p={4} spacing={3}>
                  <Stack spacing={2}>
                    <Typography variant="h4" fontWeight="bold" color="primary" textAlign={'center'}>Premium</Typography>
                    <Typography variant="h6" color="text.secondary" textAlign={'center'}>
                      <span style={{ fontWeight: 'bold' }}>Upgrade to 1 year premium</span> for only 
                      <strong> ₱ 1,499 </strong> and enjoy full access to all features
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Stack direction={'row'} spacing={2}>
                      <CheckCircle color="success" />
                      <Typography>Certificate Issuance</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={2}>
                      <CheckCircle color="success" />
                      <Typography>Event Management</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={2}>
                      <CheckCircle color="success" />
                      <Typography>User Management</Typography>
                    </Stack>
                  </Stack>
                  <Button
                    variant='contained'
                    component={Link}
                    to={'/register/1'}
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Get Started
                  </Button>
                </Stack>
              </CustomCard>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </MasterAuth>
  )
}

export default Membership
