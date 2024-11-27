import React, { useContext, useEffect, useState } from 'react'
import { Box, Chip, Drawer, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material'
import { DataGrid, GridMoreVertIcon, GridToolbar } from '@mui/x-data-grid'
import CustomCard from '../../components/CustomCard'
import AlertModal from '../../components/AlertModal'
import Delete from './Form/Delete'
import MasterAdmin from '../../layouts/MasterAdmin'
import { AuthContext } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import moment from 'moment'
import { fetchTransactionByChapelId } from '../../api/transactionApi'
import Update from './Form/Update'

function AdminTransaction() {
    return (
        <MasterAdmin>
            <Stack spacing={2}>
                <Stack direction={'row'} spacing={2}>
                    <Typography variant='h4' fontWeight={'bold'}>Transaction List: </Typography>
                </Stack>
                <DataTable />
            </Stack>
        </MasterAdmin>
    )
}

function DataTable() {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState(null);
    const { auth } = useContext(AuthContext)
    const [deleteModal, setDeleteModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);


    const handleDeleteModal = () => {
        setDeleteModal(true)
        handleMenuClose()
    }

    const handleUpdateModal = () => {
        setUpdateModal(true)
        handleMenuClose()
    }


    const handleCloseModal = () => {
        setDeleteModal(false)
        setUpdateModal(false)
    }

    const handleMenuOpen = (event, item) => {
        setAnchorEl(event.currentTarget)
        setSelected(item)
    }

    const handleMenuClose = (event, item) => {
        setAnchorEl(null)
    }

    const handleGetData = async () => {
        setLoading(true)
        const { data, error } = await fetchTransactionByChapelId(auth.user.parish._id)
        if (error) {
            toast.error("Server Error")
        } else {
            setData(data)
        }
        setLoading(false)
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
            field: 'name',
            headerName: 'Name',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        {
            field: 'request',
            headerName: 'Request',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        {
            field: 'amount',
            headerName: 'Amount',
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
                    {params.row.status}
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
            field: 'setting',
            headerName: 'Setting',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
            renderCell: (params) => (
                <Box sx={{ textAlign: 'center' }}>
                    <GridMoreVertIcon onClick={(e) => handleMenuOpen(e, params.row)} sx={{ cursor: 'pointer' }} />
                </Box>
            )
        }
    ]

    const rows = data.map((item) => ({
        ...item,
        id: item._id,
        name: `${item?.user?.lastName}, ${item?.user?.firstName} ${item?.user?.middleName[0]}.`,
        request: item?.request?.certificate,
        user: item.user._id,
        status:
            item?.request?.status == "Approve" && <Chip label="Approve" color='success' /> ||
            item?.request?.status == "Pending" && <Chip label="Pending" color='warning' />,
        date: moment(item.createdAt).format("DD - MMMM - YYYY"),
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
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleUpdateModal}>
                        <Typography color="warning.main">Edit</Typography>
                    </MenuItem>
                    {/* <MenuItem onClick={handleDeleteModal}>
                        <Typography color="error.main">Remove</Typography>
                    </MenuItem> */}
                </Menu>
            </CustomCard>
            <AlertModal open={deleteModal} onClose={handleCloseModal}>
                <Delete onClose={handleCloseModal} selected={selected} handleGetData={handleGetData} />
            </AlertModal>
            <Drawer open={updateModal} onClose={handleCloseModal} anchor='right'>
                <Update selected={selected} handleGetData={handleGetData} onClose={handleCloseModal} />
            </Drawer>
        </>
    )
}

export default AdminTransaction