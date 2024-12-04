import React, { useContext, useEffect, useState } from 'react'
import MasterAdmin from '../../layouts/MasterAdmin'
import { Box, Button, Drawer, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material'
import { Add } from '@mui/icons-material'
import { DataGrid, GridMoreVertIcon, GridToolbar } from '@mui/x-data-grid'
import CustomCard from '../../components/CustomCard'
import { fetchUserByChapelId } from '../../api/userApi'
import { toast } from 'react-toastify'
import Store from './Form/Store'
import Update from './Form/Update'
import AlertModal from '../../components/AlertModal'
import Delete from './Form/Delete'
import { AuthContext } from '../../context/AuthContext'

function AdminUser() {
    const theme = useTheme();
    const { auth } = useContext(AuthContext)
    const [anchorEl, setAnchorEl] = useState(null);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState(null);

    const [storeModal, setStoreModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const handleStoreModal = () => {
        setStoreModal(true)
    }

    const handleUpdateModal = () => {
        handleMenuClose()
        setUpdateModal(true)
    }

    const handleDeleteModal = () => {
        handleMenuClose()
        setDeleteModal(true)
    }


    const handleCloseModal = () => {
        setStoreModal(false)
        setUpdateModal(false)
        setDeleteModal(false)
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
        const { data, error } = await fetchUserByChapelId(auth.user.parish._id)
        if (error) {
            toast.error(error)
        } else {
            setData(data)
        }
        setLoading(false)
    }

    useEffect(() => {
        handleGetData()
    }, [])

    const rows = data.map((item) => ({
        ...item,
        id: item._id,
        roleName: item.role == 1 && 'Super Admin' || item.role == 2 && 'Admin' || item.role == 3 && 'User'
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
            field: 'email',
            headerName: 'Email',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        {
            field: 'address',
            headerName: 'Address',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        {
            field: 'phone',
            headerName: 'Phone',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        {
            field: 'roleName',
            headerName: 'Role',
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
    return (
        <MasterAdmin>
            <Stack spacing={2}>
                <Stack direction={'row'} spacing={2}>
                    <Typography variant='h4' fontWeight={'bold'}>User List: </Typography>
                    <Button variant='contained' endIcon={<Add />} onClick={handleStoreModal} color='warning'>Add Admin</Button>
                </Stack>
                <CustomCard>
                    <Box
                        sx={{
                            '& .headerStyle': {
                                backgroundColor: theme.palette.warning.main,
                            },
                            height: '70vh'
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
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleUpdateModal}>
                        <Typography color="warning.main">Edit</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleDeleteModal}>
                        <Typography color="error.main">Delete</Typography>
                    </MenuItem>
                </Menu>
            </Stack>
            <Drawer open={storeModal} anchor='right' onClose={handleCloseModal}>
                <Store onClose={handleCloseModal} handleGetData={handleGetData} />
            </Drawer>
            <Drawer open={updateModal} anchor='right' onClose={handleCloseModal}>
                <Update selected={selected} onClose={handleCloseModal} handleGetData={handleGetData} />
            </Drawer>
            <AlertModal open={deleteModal} onClose={handleCloseModal}>
                <Delete onClose={handleCloseModal} selected={selected} handleGetData={handleGetData} />
            </AlertModal>
        </MasterAdmin>
    )
}

export default AdminUser