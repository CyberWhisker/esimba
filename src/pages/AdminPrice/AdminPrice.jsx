import React, { useEffect, useState } from 'react'
import { Box, Button, Chip, Stack, Typography, useTheme } from '@mui/material'
import { Add, ApprovalRounded, Cancel as CancelIcon, DeleteOutline, EditOutlined } from '@mui/icons-material'
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid'
import CustomCard from '../../components/CustomCard'
import AlertModal from '../../components/AlertModal'
import Delete from './Form/Delete'
import MasterAdmin from '../../layouts/MasterAdmin'
import moment from 'moment'
import Store from './Form/Store'

function AdminPrice() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [storeModal, setStoreModal] = useState(false);

    const handleGetData = async () => {
        setLoading(true)
        setLoading(false)
    }

    useEffect(() => {
        handleGetData()
    }, [])

    return (
        <MasterAdmin>
            <Stack spacing={1}>
                <Stack spacing={1} direction={'row'}>
                    <Typography variant='h4' fontWeight={'bold'}>Price Maintenance</Typography>
                    <Button variant='contained' color='warning' endIcon={<Add />} onClick={() => setStoreModal(true)}>Add Price</Button>
                </Stack>
                <CustomCard>
                    <DataTable data={data} loading={loading} handleGetData={handleGetData} />
                </CustomCard>
            </Stack>
            <AlertModal open={storeModal} onClose={() => setStoreModal(false)}>
                <Store onClose={() => setStoreModal(false)} />
            </AlertModal>
        </MasterAdmin>
    )
}

function DataTable({ data, loading, handleGetData }) {
    const theme = useTheme();
    const [selected, setSelected] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const handleEdit = (params) => {
        setSelected(params)
        setEditModal(true)
    }

    const handleDelete = (params) => {
        setSelected(params)
        setDeleteModal(true)
    }


    const handleCloseModal = () => {
        setDeleteModal(false)
    }

    const rows = data.map((item) => ({
        ...item,
        id: item._id,
        name: item.user.name,
        event: item.event.event,
        date: moment(item.date).format('MMMM DD YYYY')
    }))

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        {
            field: 'event',
            headerName: 'Event',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle'
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
            renderCell: (params) => (
                <Box sx={{ textAlign: 'center' }}>
                    {params.row.status == "Approve" && (
                        <Chip label="Approve" color='success' />
                    )}
                    {params.row.status == "Cancelled" && (
                        <Chip label="Cancelled" color='error' />
                    )}
                    {params.row.status == "Pending" && (
                        <Chip label="Pending" color='warning' />
                    )}
                </Box>
            )
        },
        {
            field: 'date',
            headerName: 'Date',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        {
            field: 'view',
            headerName: 'View',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
            renderCell: (params) => (
                <Box sx={{ textAlign: 'center' }}>
                    <ViewButton params={params.row} handleGetData={handleGetData} />
                </Box>
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            cellClassName: 'actions',
            headerAlign: 'center',
            flex: 1,
            headerClassName: 'headerStyle',
            getActions: (params) => {
                return [
                    <GridActionsCellItem
                        icon={<EditOutlined />}
                        label="Approve"
                        onClick={() => handleEdit(params.row)}
                        color="warning"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteOutline />}
                        label="Delete"
                        onClick={() => handleDelete(params.row)}
                        color="error"
                    />,
                ];
            },
        }
    ]
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

            <AlertModal open={deleteModal} onClose={handleCloseModal}>
                <Delete onClose={handleCloseModal} selected={selected} handleGetData={handleGetData} />
            </AlertModal>
        </>
    )
}

export default AdminPrice