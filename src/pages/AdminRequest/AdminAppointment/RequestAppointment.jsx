import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Chip, Divider, Drawer, Stack, Typography, useTheme } from '@mui/material'
import { Add, ApprovalRounded, Cancel as CancelIcon, DeleteOutline } from '@mui/icons-material'
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid'
import CustomCard from '../../../components/CustomCard'
import AlertModal from '../../../components/AlertModal'
import Store from './Form/Store'
import Delete from './Form/Delete'
import MasterAdmin from '../../../layouts/MasterAdmin'
import { toast } from 'react-toastify'
import moment from 'moment'
import View from './Form/View'
import { AuthContext } from '../../../context/AuthContext'
import { fetchReservedByParishId } from '../../../api/reservedApi'
import Approve from './Form/Approve'
import Cancel from './Form/Cancel'

function RequestAppointment() {
  const { auth } = useContext(AuthContext)
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
    const { data, error } = await fetchReservedByParishId(auth.user.parish._id)
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
          <Typography variant='h4' fontWeight={'bold'}>Scheduled Appointment: </Typography>
          {/* <Button onClick={handleStoreModal} variant='contained' endIcon={<Add />} color='warning'>Add Request</Button> */}
        </Stack>
        <Divider />
        <DataTable data={data} loading={loading} handleGetData={handleGetData} />
      </Stack>
      <Drawer anchor='right' open={storeModal} onClose={handleCloseModal}>
        <Store onClose={handleCloseModal} handleGetData={handleGetData} />
      </Drawer>
    </MasterAdmin>
  )
}

function DataTable({ data, loading, handleGetData }) {
  const theme = useTheme();
  const [selected, setSelected] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);

  const handleApprove = async (params) => {
    setSelected(params)
    setApproveModal(true)
  }

  const handleCancel = async (params) => {
    setSelected(params)
    setCancelModal(true)
  }

  const handleDeleteModal = (params) => {
    setSelected(params)
    setDeleteModal(true)
  }


  const handleCloseModal = () => {
    setCancelModal(false)
    setDeleteModal(false)
    setApproveModal(false)
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
            icon={<ApprovalRounded />}
            label="Approve"
            onClick={() => handleApprove(params.row)}
            color="success"
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Approve"
            onClick={() => handleCancel(params.row)}
            color="warning"
          />,
          <GridActionsCellItem
            icon={<DeleteOutline />}
            label="Delete"
            onClick={() => handleDeleteModal(params.row)}
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

      <AlertModal open={approveModal} onClose={handleCloseModal}>
        <Approve onClose={handleCloseModal} selected={selected} handleGetData={handleGetData} />
      </AlertModal>

      <AlertModal open={cancelModal} onClose={handleCloseModal}>
        <Cancel onClose={handleCloseModal} selected={selected} handleGetData={handleGetData} />
      </AlertModal>
    </>
  )
}

function ViewButton({ params, handleGetData }) {
  const [viewModal, setViewModal] = useState(false)

  return (
    <>
      <Button variant='contained' onClick={() => setViewModal(true)}>Requirements</Button>

      <Drawer open={viewModal} anchor='right' onClose={() => setViewModal(false)}>
        <View selected={params} onClose={() => setViewModal(false)} handleGetData={handleGetData} />
      </Drawer>
    </>
  )
}

export default RequestAppointment