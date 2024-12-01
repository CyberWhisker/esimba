import React, { useEffect, useState } from 'react'
import { Box, Button, Chip, Drawer, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material'
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid'
import CustomCard from '../../components/CustomCard'
import AlertModal from '../../components/AlertModal'
import MasterAdmin from '../../layouts/MasterAdmin'
import { toast } from 'react-toastify'
import moment from 'moment'
import { fetchSubscriptions } from '../../api/subscription'
import { Cancel, Loop, Visibility } from '@mui/icons-material'
import Renew from './Form/Renew'
import Terminate from './Form/Terminate'
import View from './Form/View'

function AdminSubscription() {
    return (
        <MasterAdmin>
            <Stack spacing={2}>
                <Stack direction={'row'} spacing={2}>
                    <Typography variant='h4' fontWeight={'bold'}>Subscription List: </Typography>
                </Stack>
                <DataTable />
            </Stack>
        </MasterAdmin>
    )
}

function DataTable() {
    const theme = useTheme();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState(null);
    const [renewModel, setRenewModel] = useState(false);
    const [terminateModel, setTerminateModel] = useState(false);
    const [viewModel, setViewModel] = useState(false);

    const handleCloseModal = () => {
        setTerminateModel(false)
        setRenewModel(false)
        setViewModel(false)
    }

    const handleGetData = async () => {
        setLoading(true)
        const { data, error } = await fetchSubscriptions()
        if (error) {
            toast.error("Server Error")
        } else {
            setData(data)
        }
        setLoading(false)
    }

    const handleRenewModel = (params) => {
        const formData = {
            _id: params.id,
            status: true,
            endDate: moment(params.row.endDate).add(1, 'year')
        }
        setSelected(formData)
        setRenewModel(true)
    }

    const handleTerminateModel = (id) => {
        const formData = {
            _id: id,
            status: false
        }
        setSelected(formData)
        setTerminateModel(true)
    }
    
    const handleViewModel = (params) => {
        const formData = {
            _id: params.id,
            status: false,
            image: params?.row?.image || ''
        }
        setSelected(formData)
        setViewModel(true)
    }

    useEffect(() => {
        handleGetData()
    }, [])

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        {
            field: 'chapelName',
            headerName: 'Chapel Name',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        {
            field: 'plan',
            headerName: 'Subscription Plan',
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
            renderCell: (params) =>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 1 }}>
                    {params.row.status ?
                        <Chip label="Active" color='success' /> :
                        <Chip label="Terminated" color='error' />
                    }
                </Box>

        },
        {
            field: 'startDate',
            headerName: 'Start Date',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        {
            field: 'endDate',
            headerName: 'End Date',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        {
            field: 'actions',
            headerName: 'Action',
            type: 'actions',
            flex: 1,
            headerClassName: 'headerStyle',
            getActions: (params) => {
                return [
                    <GridActionsCellItem
                        icon={<Loop />}
                        label="Save"
                        color="success"
                        onClick={() => handleRenewModel(params)}
                    />,
                    <GridActionsCellItem
                        icon={<Visibility />}
                        label="Save"
                        color="warning"
                        onClick={() => handleViewModel(params)}
                    />,
                    <GridActionsCellItem
                        icon={<Cancel />}
                        label="Save"
                        color="error"
                        onClick={() => handleTerminateModel(params.id)}
                    />,
                ]

            }
        },
    ]

    const rows = data.map((item) => ({
        ...item,
        id: item._id,
        chapelName: item?.chapel?.chapel || "Removed",
        plan: item.subscriptionPlan == 2 ? "Free Trial" : "Subscribe",
        startDate: moment(item.startDate).format('MMMM DD YYYY'),
        endDate: moment(item.endDate).format('MMMM DD YYYY')
    }))
    return (
        <>
            <CustomCard>
                <Box
                    sx={{
                        '& .headerStyle': {
                            backgroundColor: theme.palette.warning.main,
                        },
                        height: '70vh',
                    }}
                >
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        slots={{ toolbar: GridToolbar }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                            },
                            loadingOverlay: {
                                variant: 'linear-progress',
                                noRowsVariant: 'linear-progress',
                            },
                        }}
                        loading={loading}
                    />
                </Box>
            </CustomCard>

            <Drawer open={viewModel} onClose={handleCloseModal} anchor='right'>
                <View selected={selected} onClose={handleCloseModal} handleGetData={handleGetData} />
            </Drawer>

            <AlertModal open={renewModel} onClose={handleCloseModal} >
                <Renew selected={selected} onClose={handleCloseModal} handleGetData={handleGetData} />
            </AlertModal>

            <AlertModal open={terminateModel} onClose={handleCloseModal} >
                <Terminate selected={selected} onClose={handleCloseModal} handleGetData={handleGetData} />
            </AlertModal>
        </>
    )
}

export default AdminSubscription