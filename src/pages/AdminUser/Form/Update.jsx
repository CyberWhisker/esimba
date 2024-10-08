import { Add } from '@mui/icons-material'
import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

function Update({selected}) {
    return (
        <Box sx={{ width: '60vh', p: 2 }}>
            <Stack spacing={1}>
                <Typography variant='h4' fontWeight={'bold'}>Update User</Typography>
                <Divider/>
                <TextField label='First Name'/>
                <TextField label='Last Name'/>
                <TextField label='Middle Name'/>
                <TextField label='Address'/>
                <TextField label='Phone'/>
                <TextField label='Role' select value={selected.role}>
                    <MenuItem value={1}>Super Admin</MenuItem>
                    <MenuItem value={2}>Admin</MenuItem>
                    <MenuItem value={3}>User</MenuItem>
                </TextField>
                <Button variant='contained'>Submit</Button>
            </Stack>
        </Box>
    )
}

export default Update