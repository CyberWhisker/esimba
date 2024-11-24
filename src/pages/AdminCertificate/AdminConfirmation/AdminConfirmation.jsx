import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Drawer, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material'
import { Add } from '@mui/icons-material'
import { DataGrid, GridMoreVertIcon, GridToolbar } from '@mui/x-data-grid'
import CustomCard from '../../../components/CustomCard'
import AlertModal from '../../../components/AlertModal'
import Store from './Form/Store'
import Update from './Form/Update'
import Delete from './Form/Delete'
import MasterAdmin from '../../../layouts/MasterAdmin'
import moment from 'moment'
import { useReactToPrint } from 'react-to-print'
import { fetchConfirmation } from '../../../api/confirmationApi'
import ConfirmationLayout from '../../../layouts/Pdf/ConfirmationLayout'

function AdminConfirmation() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [storeModal, setStoreModal] = useState(false);
  const [selected, setSelected] = useState({});

  const handleStoreModal = () => {
    setStoreModal(true)
  }


  const handleCloseModal = () => {
    setStoreModal(false)
  }

  const handleGetData = async () => {
    setLoading(true)
    const { data, error } = await fetchConfirmation()
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


  const contentRef = useRef(null)
  const printFile = useReactToPrint({ contentRef })
  const handlePrintFile = async (params) => {
    await setSelected(params)
    printFile()
  }
  return (
    <MasterAdmin>
      <Stack spacing={2}>
        <Stack direction={'row'} spacing={2}>
          <Typography variant='h4' fontWeight={'bold'}>Death Certificate: </Typography>
          <Button variant='contained' endIcon={<Add />} color='warning' onClick={handleStoreModal}>Add Certificate</Button>
        </Stack>
        <DataTable data={data} handleGetData={handleGetData} loading={loading} handlePrintFile={handlePrintFile} selected={selected} setSelected={setSelected} />
        <Certificate contentRef={contentRef} selected={selected} />
      </Stack>

      <Drawer open={storeModal} anchor='right' onClose={handleCloseModal}>
        <Store onClose={handleCloseModal} handleGetData={handleGetData} />
      </Drawer>
    </MasterAdmin>
  )
}

function DataTable({ data, handleGetData, loading, handlePrintFile, selected, setSelected }) {

  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
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
      headerName: 'Owner',
      flex: 1,
      headerAlign: 'center',
      headerClassName: 'headerStyle',
    },
    {
      field: 'requester',
      headerName: 'Requester',
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
          <Button variant='contained' onClick={() => handlePrintFile(params.row)}>Certificate</Button>
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
    requester: `${item.user.firstName} ${item.user.lastName}`,
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

function Certificate({ contentRef, selected }) {
  return (
    <div>
      <div style={{ display: 'none' }}>
        <div ref={contentRef} style={{ color: 'black' }}>
          <ConfirmationLayout selected={selected} />
        </div>
      </div>
    </div>
  )
}

export default AdminConfirmation