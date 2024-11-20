import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Divider, Drawer, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material'
import { Add } from '@mui/icons-material'
import { DataGrid, GridMoreVertIcon, GridToolbar } from '@mui/x-data-grid'
import CustomCard from '../../../components/CustomCard'
import AlertModal from '../../../components/AlertModal'
import Store from './Form/Store'
import Update from './Form/Update'
import Delete from './Form/Delete'
import MasterAdmin from '../../../layouts/MasterAdmin'
import { fetchBaptism } from '../../../api/baptismApi'
import moment from 'moment'
import { useReactToPrint } from 'react-to-print'
import BaptismLayout from '../../../layouts/Pdf/BaptismLayout'
import DeathLayout from '../../../layouts/Pdf/DeathLayout'

function AdminBaptism() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [storeModal, setStoreModal] = useState(false);

  const handleStoreModal = () => {
    setStoreModal(true)
  }


  const handleCloseModal = () => {
    setStoreModal(false)
  }

  const handleGetData = async () => {
    setLoading(true)
    const { data, error } = await fetchBaptism()
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
      <Stack spacing={2}>
        <Stack direction={'row'} spacing={2}>
          <Typography variant='h4' fontWeight={'bold'}>Baptism Certificate: </Typography>
          <Button variant='contained' endIcon={<Add />} color='warning' onClick={handleStoreModal}>Add Certificate</Button>
        </Stack>
        {/* <DataTable data={data} handleGetData={handleGetData} loading={loading} /> */}
        <Certificate />
      </Stack>

      <Drawer open={storeModal} anchor='right' onClose={handleCloseModal}>
        <Store onClose={handleCloseModal} handleGetData={handleGetData} />
      </Drawer>
    </MasterAdmin>
  )
}

function DataTable({ data, handleGetData, loading }) {

  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(null);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleUpdateModal = () => {
    handleMenuClose()
    setUpdateModal(true)
  }

  const handleDeleteModal = () => {
    handleMenuClose()
    setDeleteModal(true)
  }


  const handleCloseModal = () => {
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
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
      headerAlign: 'center',
      headerClassName: 'headerStyle',
    },
    {
      field: 'updatedAt',
      headerName: 'Updated AT',
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
          <Button variant='contained'>Certificate</Button>
        </Box>
      )
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
    name: `${item.user.firstName} ${item.user.lastName}`,
    createdAt: moment(item.createdAt).format('MMMM DD YYYY'),
    updatedAt: moment(item.updatedAt).format('MMMM DD YYYY')
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
      <Drawer open={updateModal} anchor='right' onClose={handleCloseModal}>
        <Update selected={selected} onClose={handleCloseModal} handleGetData={handleGetData} />
      </Drawer>
      <AlertModal open={deleteModal} onClose={handleCloseModal}>
        <Delete onClose={handleCloseModal} selected={selected} handleGetData={handleGetData} />
      </AlertModal>
    </>
  )
}

function Certificate() {

  const contentRef = useRef(null)
  const printFile = useReactToPrint({ contentRef })
  return (
    <div>
      <Button variant='contained' onClick={printFile}>Print</Button>
      <div ref={contentRef} style={{ color: 'black' }}>
        <DeathLayout/>
      </div>
    </div>
  )
}

export default AdminBaptism