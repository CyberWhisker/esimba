import React, { useEffect, useState } from 'react'
import MasterAdmin from '../../layouts/MasterAdmin'
import { Box, Button, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material'
import { Add } from '@mui/icons-material'
import { DataGrid, GridMoreVertIcon, GridToolbar } from '@mui/x-data-grid'
import CustomCard from '../../components/CustomCard'
import { toast } from 'react-toastify'

function AdminAppointment() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState(null);
    const theme = useTheme();
    const handleMenuOpen = (event, item) => {
        setAnchorEl(event.currentTarget)
        setSelected(item)
    }

    const handleMenuClose = (event, item) => {
        setAnchorEl(null)
    }

    const handleGetUsers = async () => {
    }

    useEffect(() => {
        handleGetUsers()
    },[])

    const rows = data.map((item) => ({
        ...item,
        id: item._id,
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
            field: 'firstName',
            headerName: 'First Name',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        {
            field: 'middleName',
            headerName: 'Middle Name',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        {
            field: 'type',
            headerName: 'Type',
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
                <Box sx={{textAlign: 'center'}}>
                    <GridMoreVertIcon onClick={(e) => handleMenuOpen(e, params.row)} sx={{cursor: 'pointer'}}/>
                </Box>
            )
        }
    ]
    return (
        <MasterAdmin>
            <Stack spacing={2}>
                <Stack direction={'row'} spacing={2}>
                    <Typography variant='h4' fontWeight={'bold'}>Appointment List: </Typography>
                    <Button variant='contained' endIcon={<Add/>}>Appointment</Button>
                </Stack>
                <CustomCard>
                    <Box
                    sx={{
                        '& .headerStyle': {
                        backgroundColor: theme.palette.primary.main,
                        },
                        height: '60vh'
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
                    <MenuItem onClick={() => console.log('Update')}>
                        <Typography color="warning.main">Edit</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => console.log('Delete')}>
                        <Typography color="error.main">Delete</Typography>
                    </MenuItem>
                </Menu>
            </Stack>
        </MasterAdmin>
    )
}

export default AdminAppointment