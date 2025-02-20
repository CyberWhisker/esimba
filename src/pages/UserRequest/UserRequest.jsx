import React, { useContext, useEffect, useRef, useState } from 'react'
import Master from '../../layouts/Master'
import { Box, Button, Chip, Divider, Grid2, Stack, Typography } from '@mui/material'
import CustomCard from '../../components/CustomCard'
import { fetchBaptism, fetchBaptismByUserId } from '../../api/baptismApi'
import { AuthContext } from '../../context/AuthContext'
import AlertModal from '../../components/AlertModal'
import StoreRequest from './Form/StoreRequest'
import { fetchConfirmationByUserId } from '../../api/confirmationApi'
import { fetchMarriageByUserId } from '../../api/marriageApi'
import { useReactToPrint } from 'react-to-print'
import { fetchPrice } from '../../api/priceApi'

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
    const [pricesBaptism, setPriceBaptism] = useState('300')
    const [priceMarriage, setPriceMarriage] = useState('300')
    const [priceConfirmation, setPriceConfirmation] = useState('300')

    const handleGetPrices = async () => {
        const { data, error } = await fetchPrice()
        if (!error) {
            if (data.length > 0) {
                const baptism = data.find((item) => item.type == 'baptismal' && item.name == 'Certificate')
                const confirmation = data.find((item) => item.type == 'confirmation' && item.name == 'Certificate')
                const marriage = data.find((item) => item.type == 'marriage' && item.name == 'Certificate')
                setPriceBaptism(baptism.price)
                setPriceConfirmation(confirmation.price)
                setPriceMarriage(marriage.price)
            }
        }
    }


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


    const [selected, setSelected] = useState({});
    const contentRef = useRef(null)
    const printFile = useReactToPrint({ contentRef })
    const handlePrintFile = async (params) => {
        await setSelected(params)
        printFile()
    }

    useEffect(() => {
        handleGetPrices()
    }, [])

    return (
        <Grid2 container spacing={2}>
            <BaptismList handleRequestModal={handleRequestModal} toggle={toggle} handlePrintFile={handlePrintFile} prices={pricesBaptism} />
            <ConfirmationList handleRequestModal={handleRequestModal} toggle={toggle} handlePrintFile={handlePrintFile} prices={priceConfirmation} />
            <MarriageList handleRequestModal={handleRequestModal} toggle={toggle} handlePrintFile={handlePrintFile} prices={priceMarriage} />

            <AlertModal open={openRequestModal} onClose={() => setRequestModal(false)}>
                <StoreRequest formData={formData} setFormData={setFormData} onClose={() => setRequestModal(false)} handleToggle={handleToggle} />
            </AlertModal>
            <Certificate contentRef={contentRef} selected={selected} />
        </Grid2>
    )
}

function BaptismList({ handleRequestModal, toggle, prices }) {
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
                                <Typography>Amount: {prices}</Typography>
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

function ConfirmationList({ handleRequestModal, toggle, prices }) {
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
                                <Typography>Amount: {prices}</Typography>
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

function MarriageList({ handleRequestModal, toggle, handlePrintFile, prices }) {
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
                                <Typography>Amount: {prices}</Typography>
                            </Stack>
                            <Divider />
                            <Box p={2}>
                                <Button variant='contained' fullWidth color='warning' onClick={() => handleRequestModal({ ...item, certificate: 'Marriage', amount: 200 })} disabled={item.status != 'Hold'}>Request</Button>
                                {/* <Button variant='contained' fullWidth color='warning' onClick={() => handlePrintFile({ ...item, certificate: 'Marriage', amount: 200 })} disabled={item.status != 'Hold'}>Request</Button> */}
                            </Box>
                        </Stack>
                    </CustomCard>
                </Grid2>
            ))}
        </>
    )
}

function Certificate({ contentRef, selected }) {
    return (
        <div>
            <div style={{ display: 'none' }}>
                <div ref={contentRef} style={{ color: 'black' }}>
                    {selected.type == "Baptism Certificate" && (
                        <BaptismLayout selected={selected} />
                    )}
                    {selected.type == "Death Certificate" && (
                        <DeathLayout selected={selected} />
                    )}
                    {selected.type == "Confirmation Certificate" && (
                        <ConfirmationLayout selected={selected} />
                    )}
                    {selected.type == "Marriage Certificate" && (
                        <MarriageLayout selected={selected} />
                    )}
                </div>
            </div>
        </div>
    )
}


export default UserRequest