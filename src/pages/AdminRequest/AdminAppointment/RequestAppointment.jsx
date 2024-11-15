import React, { useEffect, useState } from 'react'
import { Box, Button, Divider, Drawer, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material'
import { Add } from '@mui/icons-material'
import { DataGrid, GridMoreVertIcon, GridToolbar } from '@mui/x-data-grid'
import CustomCard from '../../../components/CustomCard'
import AlertModal from '../../../components/AlertModal'
import Store from './Form/Store'
import Delete from './Form/Delete'
import MasterAdmin from '../../../layouts/MasterAdmin'
import { fetchRequestAppointment, updateRequest } from '../../../api/requestApi'
import { toast } from 'react-toastify'
import moment from 'moment'

function RequestAppointment() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [storeModal, setStoreModal] = useState(false);

  const handleCloseModal = () => {
    setStoreModal(false)
  }

  const handleStoreModal = () => {
    setStoreModal(true)
  }

  const handleGetData = async () => {
    setLoading(true)
    const { data, error } = await fetchRequestAppointment()
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

  return (
    <MasterAdmin>
      <Stack spacing={1}>
        <Stack direction={'row'} spacing={2}>
          <Typography variant='h4' fontWeight={'bold'}>Appointment Request: </Typography>
          <Button onClick={handleStoreModal} variant='contained' endIcon={<Add />} color='warning'>Add Request</Button>
        </Stack>
        <Divider />
        <DataTable data={data} loading={loading} handleGetData={handleGetData}/>
      </Stack>
      <Drawer anchor='right' open={storeModal} onClose={handleCloseModal}>
        <Store onClose={handleCloseModal} handleGetData={handleGetData}/>
      </Drawer>
    </MasterAdmin>
  )
}

function DataTable({data, loading, handleGetData}) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(null);

  const [storeModal, setStoreModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleStoreModal = () => {
    setStoreModal(true)
  }

  const handleApprove = async () => {
    const newData = {
      ...selected,
      status: 'Approve'
    }
    const { data, error } = await updateRequest(newData)
    if (error) {
      toast.error(error)
    } else {
      toast.success("Request Approve")
      handleGetData()
      handleMenuClose()
    }
  }

  const handleCancel = async () => {
    toast.error("Request Cancel")
    const newData = {
      ...selected,
      status: 'Cancel'
    }
    const { data, error } = await updateRequest(newData)
    if (error) {
      toast.error(error)
    } else {
      toast.success("Request Approve")
      handleGetData()
      handleMenuClose()
    }
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

  const rows = data.map((item) => ({
    ...item,
    id: item._id,
    name: `${item.user.firstName} ${item.user.lastName}`,
    baptismDate: moment(item.data.baptismDate).format('MMMM DD YYYY')
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
      field: 'certificate',
      headerName: 'Certificate',
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
      field: 'baptismDate',
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
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleApprove}>
          <Typography color="success.main">Approve</Typography>
        </MenuItem>
        <MenuItem onClick={handleCancel}>
          <Typography color="warning.main">Cancel</Typography>
        </MenuItem>
        <MenuItem onClick={handleDeleteModal}>
          <Typography color="error.main">Remove</Typography>
        </MenuItem>
      </Menu>

      <AlertModal open={deleteModal} onClose={handleCloseModal}>
        <Delete onClose={handleCloseModal} selected={selected} handleGetData={handleGetData} />
      </AlertModal>
    </>
  )
}

export default RequestAppointment