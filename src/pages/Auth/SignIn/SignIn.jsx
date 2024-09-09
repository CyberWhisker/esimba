import { Box, Button, Card, Container, Divider, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import Master from '../../../layouts/Master'
import { Link } from 'react-router-dom'

function SignIn() {
    return (
        <Master>
            <Container sx={{
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100vh'
            }}>
                <Card elevation={5} sx={{
                    padding: 2,
                    backgroundColor: 'rgba(128, 0, 0, 0.5)', 
                    backdropFilter: 'blur(10px)', 
                    boxShadow: 'none', 
                    transition: 'background-color 0.3s ease',
                    width: '50vh', 
                }}>
                    <Stack direction={'column'} spacing={2}>
                        <Typography variant='h5' fontWeight={'bold'}>Login</Typography>
                        <Divider/>
                        <TextField
                            label='Enter Email'
                            
                        />
                        <TextField
                            label='Enter Password'
                        />
                        <Button variant='contained'>Submit</Button>
                        <Button variant='outlined' component={Link} to='/register'>Register</Button>
                        <Divider/>
                        <Stack direction={'row'} justifyContent={'end'}>
                            <Typography>Need Help?</Typography>
                        </Stack>
                    </Stack>
                </Card>
            </Container>
        </Master>
    )
}

export default SignIn