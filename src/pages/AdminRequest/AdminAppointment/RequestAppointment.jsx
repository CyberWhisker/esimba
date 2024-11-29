import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Chip, Divider, Drawer, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material'
import { Add, ApprovalRounded, Cancel, DeleteOutline } from '@mui/icons-material'
import { DataGrid, GridActionsCellItem, GridMoreVertIcon, GridToolbar } from '@mui/x-data-grid'
import CustomCard from '../../../components/CustomCard'
import AlertModal from '../../../components/AlertModal'
import Store from './Form/Store'
import Delete from './Form/Delete'
import MasterAdmin from '../../../layouts/MasterAdmin'
import { fetchRequestAppointmentByParishId, updateRequest } from '../../../api/requestApi'
import { toast } from 'react-toastify'
import moment from 'moment'
import StoreSchedule from './Form/StoreSchedule'
import { fetchTransactionByRequestId } from '../../../api/transactionApi'
import View from './Form/View'
import AlertModalLarge from '../../../components/AlertModalLarge'
import { AuthContext } from '../../../context/AuthContext'

function RequestAppointment() {
  const {auth} = useContext(AuthContext)
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
    const { data, error } = await fetchRequestAppointmentByParishId(auth.user.parish._id)
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
  const [scheduleModal, setScheduleModal] = useState(false);

  const handleApprove = async (params) => {
    setSelected(params)
    setScheduleModal(true)
  }

  const handleCancel = async (params) => {
    const newData = {
      ...params,
      status: 'Pending'
    }
    const { data, error } = await updateRequest(newData)
    if (error) {
      toast.error(error)
    } else {
      toast.error("Request Cancel")
      handleGetData()
    }
  }

  const handleDeleteModal = (params) => {
    setSelected(params)
    setDeleteModal(true)
  }


  const handleCloseModal = () => {
    setDeleteModal(false)
    setScheduleModal(false)
  }

  const rows = data.map((item) => ({
    ...item,
    id: item._id,
    name: `${item.user.firstName} ${item.user.lastName}`,
    scheduleView: moment(item.schedule).format('MMMM DD YYYY')
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
      field: 'certificateView',
      headerName: 'Event',
      flex: 1,
      headerAlign: 'center',
      headerClassName: 'headerStyle',
      renderCell: ({ row }) => (
        <>
          {row.certificate == "Baptism Certificate" && "Baptism"}
          {row.certificate == "Death Certificate" && "Burial"}
          {row.certificate == "Marriage Certificate" && "Marriage"}
          {row.certificate == "Confirmation Certificate" && "Confirmation"}
        </>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      headerAlign: 'center',
      headerClassName: 'headerStyle',
      renderCell: (params) => (
        <Box sx={{ textAlign: 'center' }}>
          {params.row.status != "Pending" && (
            <Chip label="Approve" color='success' />
          )}
          {params.row.status == "Pending" && (
            <Chip label="Pending" color='warning' />
          )}
        </Box>
      )
    },
    {
      field: 'scheduleView',
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
            icon={<Cancel />}
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

      <AlertModalLarge open={scheduleModal} onClose={handleCloseModal}>
        <StoreSchedule onClose={handleCloseModal} selected={selected} handleGetData={handleGetData} />
      </AlertModalLarge>
    </>
  )
}

function ViewButton({ params, handleGetData }) {
  const [transactionData, setTransactionData] = useState([])
  const [viewModal, setViewModal] = useState(false)

  const handleGetTransaction = async () => {
    const { data, error } = await fetchTransactionByRequestId(params._id)
    if (!error) {
      setTransactionData({
        ...params,
        transaction: data[0]
      })
    }
  }

  useEffect(() => {
    handleGetTransaction()
  }, [])

  return (
    <>
      {transactionData.transaction ?
        <Button variant='contained' onClick={() => setViewModal(true)}>Transaction</Button> :
        <Button variant='contained' disabled color='error'>Unavilable</Button>
      }

      <Drawer open={viewModal} anchor='right' onClose={() => setViewModal(false)}>
        <View selected={transactionData} onClose={() => setViewModal(false)} handleGetData={handleGetData} />
      </Drawer>
    </>
  )
}

export default RequestAppointment