import React, { useContext, useEffect, useState, useRef } from 'react'
import Master from '../../layouts/Master'
import { Box, Button, Card, Chip, Divider, Grid2, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import CustomCard from '../../components/CustomCard'
import { AuthContext } from '../../context/AuthContext'
import { fetchUserById, updateUser } from '../../api/userApi'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { toast } from 'react-toastify'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useTheme } from '@emotion/react'
import { fetchBaptismByUserId } from '../../api/baptismApi'
import moment from 'moment'
import { useReactToPrint } from 'react-to-print'
import BaptismLayout from '../../layouts/Pdf/BaptismLayout'
import { fetchConfirmationByUserId } from '../../api/confirmationApi'
import { fetchDeathByUserId } from '../../api/deathApi'
import { fetchMarriageByUserId } from '../../api/marriageApi'
import DeathLayout from '../../layouts/Pdf/DeathLayout'
import ConfirmationLayout from '../../layouts/Pdf/ConfirmationLayout'
import MarriageLayout from '../../layouts/Pdf/MarriageLayout'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { fetchScheduleByUserId } from '../../api/scheduleApi'
import { fetchRequestByUserId } from '../../api/requestApi'

function UserProfile() {
    return (
        <Master>
            <Stack mt={2} spacing={2}>
                <Grid2 container spacing={2}>
                    <Grid2 size="grow">
                        <Box sx={{height: '47vh'}}>
                            <Typography variant='h4' fontWeight={'bold'}>Profile</Typography>
                            <ProfileEdit />
                        </Box>
                    </Grid2>
                    <Grid2 size={4}>
                        <Box>
                            <Typography variant='h4' fontWeight={'bold'}>Request</Typography>
                            <RequestList />
                        </Box>
                    </Grid2>
                </Grid2>
                <Divider />
                <Grid2 container spacing={2} pb={2}>
                    <Grid2 size={5} >
                        <UserViewCertificate />
                    </Grid2>
                    <Grid2 size={'grow'} >
                        <UserViewSchedule />
                    </Grid2>
                </Grid2>
            </Stack>
        </Master>
    )
}

function ProfileEdit() {
    const { auth } = useContext(AuthContext)
    const [toggleEdit, setToggleEdit] = useState(true)
    const [userData, setUserData] = useState({})
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }

    const hanldeSubmit = async () => {
        const { resetPassword } = formData;
        const newErrors = {};
        if (!resetPassword || resetPassword.length < 6) newErrors.resetPassword
            = 'Password must be at least 6 characters';
        setErrors(newErrors)
        if (Object.keys(newErrors).length === 0) {
            const { data, error } = await updateUser(formData)
            if (error) {
                toast.error(error)
            } else {
                toast.success("Successfully Updated")
                setToggleEdit(true)
            }
        } else {
            toast.error("Submit Error")
        }
    }

    const hanldeGetUserData = async () => {
        const { data, error } = await fetchUserById(auth.user._id)
        if (!error) {
            setFormData(data)
            setUserData(data)
        }
    }

    useEffect(() => {
        hanldeGetUserData()
    }, [])

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };
    return (

        <CustomCard>
            <Stack spacing={1} p={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

                    <Typography display="flex" justifyContent={'center'} alignItems={'center'} fontWeight={'bold'}>User Information</Typography>
                    {!toggleEdit && <Button variant='contained' onClick={() => hanldeSubmit()}>Save Profile</Button>}
                    {toggleEdit && <Button variant='contained' color='warning' onClick={() => setToggleEdit(false)}>Edit Profile</Button>}

                </Box>
                <Stack direction={'row'} spacing={1}>
                    <TextField
                        fullWidth
                        name='firstName'
                        label="First Name"
                        value={userData?.firstName || ""}
                        disabled={toggleEdit}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        name='middleName'
                        label="Middle Name"
                        value={userData?.middleName || ""}
                        disabled={toggleEdit}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        name='lastName'
                        label="Last Name"
                        value={userData?.lastName || ""}
                        disabled={toggleEdit}
                        onChange={handleChange}
                        required
                    />
                </Stack>
                <Stack direction={'row'} spacing={1}>
                    <TextField
                        fullWidth
                        name='address'
                        label="Address"
                        value={userData?.address || ""}
                        disabled={toggleEdit}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        name='phone'
                        label="Phone Number"
                        value={userData?.phone || ""}
                        disabled={toggleEdit}
                        onChange={handleChange}
                        required
                    />
                </Stack>
                <Divider />
                <Typography fontWeight={'bold'}>Account Information</Typography>

                <Stack direction={'row'} spacing={1}>
                    <TextField
                        fullWidth
                        name='email'
                        label="Email"
                        value={userData?.email || ""}
                        disabled={toggleEdit}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        name='resetPassword'
                        type={showPassword ? 'password' : 'text'}
                        label="Change Password"
                        disabled={toggleEdit}
                        onChange={handleChange}
                        error={Boolean(errors.resetPassword)}
                        helperText={errors.resetPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={togglePasswordVisibility}
                                        edge="end"
                                        aria-label="toggle password visibility"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>
            </Stack>
        </CustomCard>
    )
}

function UserViewCertificate() {
    const { auth } = useContext(AuthContext)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState({});

    const handleGetData = async () => {
        setLoading(true)
        const baptismData = await handleGetBaptism()
        const confirmationData = await handleGetConfirmation()
        const marriageData = await handleGetMarriage()
        const deathData = await handleGetDeath()
        // Add the 'type' field to each record
        const baptismWithTypes = baptismData.map((item) => ({ ...item, type: 'Baptism Certificate' }));
        const confirmationWithTypes = confirmationData.map((item) => ({ ...item, type: 'Confirmation Certificate' }));
        const deathWithTypes = deathData.map((item) => ({ ...item, type: 'Death Certificate' }));
        const marriageWithTypes = marriageData.map((item) => ({ ...item, type: 'Marriage Certificate' }));

        // Combine both arrays
        setData([...baptismWithTypes, ...confirmationWithTypes, ...deathWithTypes, ...marriageWithTypes]);
        setLoading(false)
    }

    const handleGetBaptism = async () => {
        const { data, error } = await fetchBaptismByUserId(auth.user._id)
        if (error) {
            toast.error("Server Error")
        } else {
            return data
        }
    }

    const handleGetConfirmation = async () => {
        const { data, error } = await fetchConfirmationByUserId(auth.user._id)
        if (error) {
            toast.error("Server Error")
        } else {
            return data
        }
    }

    const handleGetDeath = async () => {
        const { data, error } = await fetchDeathByUserId(auth.user._id)
        if (error) {
            toast.error("Server Error")
        } else {
            return data
        }
    }

    const handleGetMarriage = async () => {
        const { data, error } = await fetchMarriageByUserId(auth.user._id)
        if (error) {
            toast.error("Server Error")
        } else {
            return data
        }
    }

    useEffect(() => {
        handleGetData()
    }, [])
    const contentRef = useRef(null)
    const printFile = useReactToPrint({ contentRef })
    const handlePrintFile = async (params) => {
        await setSelected(params)
        printFile()
    }
    return (
        <>
            <Typography variant='h4' fontWeight={'bold'}>Certificate List:</Typography>
            <Box sx={{ pb: 2 }}>
                <DataTable data={data} handleGetData={handleGetData} loading={loading} handlePrintFile={handlePrintFile} setSelected={setSelected} selected={selected} />
                <Certificate contentRef={contentRef} selected={selected} />
            </Box>
        </>
    )
}

function DataTable({ data, loading, handlePrintFile, selected, setSelected }) {
    const theme = useTheme();


    const columns = [
        {
            field: 'requester',
            headerName: 'Name',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        {
            field: 'type',
            headerName: 'Certificate',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        {
            field: 'pdf',
            headerName: 'Download',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
            renderCell: (params) => (
                <Box sx={{ textAlign: 'center' }}>
                    <Button variant='contained' onClick={() => handlePrintFile(params.row)}>Certificate</Button>
                </Box>
            )
        },
    ]

    const rows = data.map((item) => ({
        ...item,
        id: item._id,
        requester: `${item.user.firstName} ${item.user.lastName}`,
        createdAt: moment(item.createdAt).format('MMMM DD YYYY'),
        updatedAt: moment(item.updatedAt).format('MMMM DD YYYY')
    }))

    return (
        <CustomCard>
            <Box
                sx={{
                    '& .headerStyle': {
                        backgroundColor: theme.palette.warning.main,
                    },
                    height: '85vh'
                }}
            >
                <DataGrid
                    columns={columns}
                    rows={rows}
                    loading={loading}
                />
            </Box>
        </CustomCard>
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

function UserViewSchedule() {
    return (
        <>
            <Typography variant='h4' fontWeight={'bold'}>User Calendar</Typography>
            <Box sx={{ pb: 2 }}>
                <CustomCard>
                    <ScheduleList />
                </CustomCard>
            </Box>
        </>
    )
}

function ScheduleList() {
    const [events, setEvents] = useState([]);
    const { auth } = useContext(AuthContext)

    const handleDateClick = (arg) => {
        const clickedDate = moment(arg.date).startOf('day').toISOString();
        const filteredEvents = events.filter((event) =>
            moment(event.start).startOf('day').toISOString() === clickedDate
        );

        if (filteredEvents.length > 0) {
            alert(`Events on ${arg.dateStr}: \n${filteredEvents.map((event) => event.title).join('\n')}`);
        } else {
            alert(`No events on ${arg.dateStr}`);
        }
    };

    const handleGetSchedule = async () => {
        const { data, error } = await fetchScheduleByUserId(auth.user._id);
        if (!error) {
            const mappedEvents = data.map((item) => ({
                title:
                    item.request.certificate == "Baptism Certificate" && "Baptism Appointment" ||
                    item.request.certificate == "Death Certificate" && "Death Appointment" ||
                    item.request.certificate == "Marriage Certificate" && "Marriage Appointment" ||
                    item.request.certificate == "Confirmation Certificate" && "Confirmation Appointment",
                date: moment(item.date).format("YYYY-MM-DD")
            }));
            setEvents(mappedEvents);
        }
    };

    useEffect(() => {
        handleGetSchedule();
    }, []); // Empty dependency array ensures it runs only once on mount

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Stack>
                <Divider />
                <Box
                    sx={{
                        p: 2,
                    }}
                >
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        events={events}
                        dateClick={handleDateClick}
                        height={'80vh'}
                        displayEventTime={false} // Removes time from the event display
                    />
                </Box>
            </Stack>
        </LocalizationProvider>
    );
}

function RequestList() {
    const { auth } = useContext(AuthContext)
    const theme = useTheme();
    const [data, setData] = useState([])

    const hanldeGetData = async () => {
        const { data, error } = await fetchRequestByUserId(auth.user._id)
        if (!error) {
            setData(data)
        }
    }

    useEffect(() => {
        hanldeGetData()
    }, [])

    const columns = [
        {
            field: 'certificate',
            headerName: 'Request',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
            renderCell: (params) => (
                <Box sx={{ textAlign: 'center' }}>
                    {params.row.status != "Pending" && (
                        <Chip label="Approve" color='success' />
                    )}
                    {params.row.status == "Pending" && (
                        <Chip label="Pending" color='warning' />
                    )}
                </Box>
            )
        },
    ]

    const rows = data.map((item) => ({
        ...item,
        id: item._id,
    }))

    return (
        <CustomCard>
            <Box
                sx={{
                    '& .headerStyle': {
                        backgroundColor: theme.palette.warning.main,
                    },
                    height: '47vh'
                }}
            >
                <DataGrid
                    columns={columns}
                    rows={rows}
                />
            </Box>
        </CustomCard>
    )
}



export default UserProfile