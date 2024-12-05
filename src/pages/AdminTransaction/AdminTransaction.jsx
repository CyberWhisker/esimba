import React, { useContext, useEffect, useState } from 'react'
import { Box, Chip, Drawer, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material'
import { DataGrid, GridActionsCellItem, GridMoreVertIcon, GridToolbar } from '@mui/x-data-grid'
import CustomCard from '../../components/CustomCard'
import AlertModal from '../../components/AlertModal'
import Delete from './Form/Delete'
import MasterAdmin from '../../layouts/MasterAdmin'
import { AuthContext } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import moment from 'moment'
import { fetchTransactionByChapelId } from '../../api/transactionApi'
import Update from './Form/Update'
import { ApprovalRounded, CancelOutlined, DeleteOutline, EditOutlined } from '@mui/icons-material'

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
    const { auth } = useContext(AuthContext)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);

    const [selected, setSelected] = useState(false);

    const handleEdit = async (params) => {
        setSelected(params)
        setUpdateModal(true)
    }
    const handleDelete = async (params) => {
        setSelected(params)
        setDeleteModal(true)
    }


    const handleCloseModal = () => {
        setDeleteModal(false)
        setUpdateModal(false)
    }

    const handleGetData = async () => {
        setLoading(true)
        const { data, error } = await fetchTransactionByChapelId(auth.user.parish._id)
        if (error) {
            toast.error("Server Error")
        } else {
            console.log(data)
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
            field: 'category',
            headerName: 'Category',
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
            field: 'date',
            headerName: 'Date',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
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

    const rows = data.map((item) => ({
        ...item,
        id: item._id,
        name: item.user.name,
        category: item.reserved ? "Request Category" : "Appointment Category",
        date: moment(item.createdAt).format('MMMM DD YYYY')
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