import React from 'react'
import MasterAuth from '../../layouts/MasterAuth'
import { Box, Button, Grid2, Stack, Typography } from '@mui/material'
import { House, People } from '@mui/icons-material'
import { Link } from 'react-router-dom'

function SelectRegistration() {
    return (
        <MasterAuth>
            <Grid2 container>
                <Grid2 size="grow">
                    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: .8, bgcolor: 'black' }} >
                        <Stack alignItems={'center'} >
                            <People style={{ fontSize: '300px' }} />
                            <Typography fontWeight={'bold'} variant='h3'>Parishoner</Typography>
                            <Button variant='contained' sx={{width: '100%'}} component={Link} to={'/register'}>Select</Button>
                        </Stack>
                    </Box>
                </Grid2>
                <Grid2 size="grow">
                    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: .8, bgcolor: 'darkred'}} >
                        <Stack alignItems={'center'} >
                            <House style={{ fontSize: '300px' }} />
                            <Typography fontWeight={'bold'} variant='h3'>Parish</Typography>
                            <Button variant='contained' sx={{width: '100%'}} component={Link} to={'/membership'}>Select</Button>
                        </Stack>
                    </Box>
                </Grid2>
            </Grid2>
        </MasterAuth>
    )
}

export default SelectRegistration