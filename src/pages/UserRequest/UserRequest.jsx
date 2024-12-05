import React, { useContext, useEffect, useState } from 'react'
import Master from '../../layouts/Master'
import { Box, Button, Chip, Divider, Grid2, Stack, Typography } from '@mui/material'
import CustomCard from '../../components/CustomCard'
import { fetchBaptism, fetchBaptismByUserId } from '../../api/baptismApi'
import { AuthContext } from '../../context/AuthContext'

function UserRequest() {
    return (
        <Master>
            <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingY: 5 }}>
                <Typography variant='h4' fontWeight={'bold'}>Request Certificate</Typography>
            </Box>
            <CertificateList />
        </Master>
    )
}

function CertificateList() {

    return (
        <Grid2 container spacing={2}>
            <BaptismList />
        </Grid2>
    )
}

function BaptismList() {
    const { auth } = useContext(AuthContext)
    const [data, setData] = useState([])

    useEffect(() => {
        const handleGetData = async () => {
            const { data, error } = await fetchBaptismByUserId(auth.user._id)
            if (!error) {
                setData(data)
            }
        }
        handleGetData()
    }, [])

    return (
        <>
            {data.map((item, index) => (
                <Grid2 key={index} size={4}>
                    <CustomCard>
                        <Stack>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', p: 1 }} >
                                <Typography fontWeight={'bold'} variant='h5'>Baptism Certificate</Typography>
                                <Chip label="Hold" color='warning' />
                            </Box>
                            <Divider />
                            <Stack spacing={1} p={2}>
                                <Typography>Name: {item.name}</Typography>
                                <Typography>Parish: {item.chapel.parish._id}</Typography>
                                <Typography>Amount: 100.00</Typography>
                            </Stack>
                            <Divider />
                            <Box p={2}>
                                <Button variant='contained' fullWidth color='warning'>Request</Button>
                            </Box>
                        </Stack>
                    </CustomCard>
                </Grid2>
            ))}
        </>
    )
}



export default UserRequest