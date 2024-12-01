import { Box, Divider, Stack, Typography } from '@mui/material'
import React from 'react'

function View({ selected }) {
    return (
        <Box sx={{ width: '60vh', p: 2 }}>
            <Typography variant='h4' fontWeight={'bold'}>View Transaction</Typography>
            <Divider />
            <Stack>
                <img src={`/gcashImg/${selected.image}`} alt='No Image' />
            </Stack>
        </Box>
    )
}

export default View