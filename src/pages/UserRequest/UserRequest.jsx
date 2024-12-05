import React, { useContext, useEffect, useState } from 'react'
import Master from '../../layouts/Master'
import { Box, Button, Chip, Divider, Grid2, Stack, Typography } from '@mui/material'
import CustomCard from '../../components/CustomCard'
import { fetchBaptism, fetchBaptismByUserId } from '../../api/baptismApi'
import { AuthContext } from '../../context/AuthContext'
import AlertModal from '../../components/AlertModal'
import StoreRequest from './Form/StoreRequest'
import { fetchConfirmationByUserId } from '../../api/confirmationApi'
import { fetchMarriageByUserId } from '../../api/marriageApi'

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
    const [openRequestModal, setRequestModal] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [formData, setFormData] = useState({})

    const handleRequestModal = (item) => {
        const data = {
            user: item.user._id,
            transaction: '',
            parish: item.chapel._id,
            certificate: item.certificate,
            certificateId: item._id,
            amount: item.amount
        }
        setFormData(data)
        setRequestModal(true)
    }

    const handleToggle = () => {
        setToggle(!toggle)
        console.log(toggle)
    }

    return (
        <Grid2 container spacing={2}>
            <BaptismList handleRequestModal={handleRequestModal} toggle={toggle} />
            <ConfirmationList handleRequestModal={handleRequestModal} toggle={toggle} />
            <MarriageList handleRequestModal={handleRequestModal} toggle={toggle} />

            <AlertModal open={openRequestModal} onClose={() => setRequestModal(false)}>
                <StoreRequest formData={formData} setFormData={setFormData} onClose={() => setRequestModal(false)} handleToggle={handleToggle} />
            </AlertModal>
        </Grid2>
    )
}

function BaptismList({ handleRequestModal, toggle }) {
    const { auth } = useContext(AuthContext)
    const [data, setData] = useState([])

    const handleGetData = async () => {
        const { data, error } = await fetchBaptismByUserId(auth.user._id)
        if (!error) {
            setData(data)
        }
    }

    useEffect(() => {
        handleGetData()
    }, [toggle])

    return (
        <>
            {data.map((item, index) => (
                <Grid2 key={index} size={4}>
                    <CustomCard>
                        <Stack>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', p: 1 }} >
                                <Typography fontWeight={'bold'} variant='h5'>Baptism Certificate</Typography>
                                <Chip label={item.status} color='warning' />
                            </Box>
                            <Divider />
                            <Stack spacing={1} p={2}>
                                <Typography>Name: {item.name}</Typography>
                                <Typography>Parish: {item.chapel.chapel}</Typography>
                                <Typography>Amount: 100.00</Typography>
                            </Stack>
                            <Divider />
                            <Box p={2}>
                                <Button variant='contained' fullWidth color='warning' onClick={() => handleRequestModal({ ...item, certificate: 'Baptism', amount: 200 })} disabled={item.status != 'Hold'}>Request</Button>
                            </Box>
                        </Stack>
                    </CustomCard>
                </Grid2>
            ))}
        </>
    )
}

function ConfirmationList({ handleRequestModal, toggle }) {
    const { auth } = useContext(AuthContext)
    const [data, setData] = useState([])

    const handleGetData = async () => {
        const { data, error } = await fetchConfirmationByUserId(auth.user._id)
        if (!error) {
            setData(data)
        }
    }

    useEffect(() => {
        handleGetData()
    }, [toggle])

    return (
        <>
            {data.map((item, index) => (
                <Grid2 key={index} size={4}>
                    <CustomCard>
                        <Stack>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', p: 1 }} >
                                <Typography fontWeight={'bold'} variant='h5'>Confirmation Certificate</Typography>
                                <Chip label={item.status} color='warning' />
                            </Box>
                            <Divider />
                            <Stack spacing={1} p={2}>
                                <Typography>Name: {item.name}</Typography>
                                <Typography>Parish: {item.chapel.chapel}</Typography>
                                <Typography>Amount: 100.00</Typography>
                            </Stack>
                            <Divider />
                            <Box p={2}>
                                <Button variant='contained' fullWidth color='warning' onClick={() => handleRequestModal({ ...item, certificate: 'Confirmation', amount: 200 })} disabled={item.status != 'Hold'}>Request</Button>
                            </Box>
                        </Stack>
                    </CustomCard>
                </Grid2>
            ))}
        </>
    )
}

function MarriageList({ handleRequestModal, toggle }) {
    const { auth } = useContext(AuthContext)
    const [data, setData] = useState([])

    const handleGetData = async () => {
        const { data, error } = await fetchMarriageByUserId(auth.user._id)
        if (!error) {
            setData(data)
        }
    }

    useEffect(() => {
        handleGetData()
    }, [toggle])

    return (
        <>
            {data.map((item, index) => (
                <Grid2 key={index} size={4}>
                    <CustomCard>
                        <Stack>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', p: 1 }} >
                                <Typography fontWeight={'bold'} variant='h5'>Marriage Certificate</Typography>
                                <Chip label={item.status} color='warning' />
                            </Box>
                            <Divider />
                            <Stack spacing={1} p={2}>
                                <Typography>Name: {item.name}</Typography>
                                <Typography>Parish: {item.chapel.chapel}</Typography>
                                <Typography>Amount: 100.00</Typography>
                            </Stack>
                            <Divider />
                            <Box p={2}>
                                <Button variant='contained' fullWidth color='warning' onClick={() => handleRequestModal({ ...item, certificate: 'Marriage', amount: 200 })} disabled={item.status != 'Hold'}>Request</Button>
                            </Box>
                        </Stack>
                    </CustomCard>
                </Grid2>
            ))}
        </>
    )
}



export default UserRequest