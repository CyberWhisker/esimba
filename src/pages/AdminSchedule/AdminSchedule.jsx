import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Chip, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material'
import { DataGrid, GridMoreVertIcon, GridToolbar } from '@mui/x-data-grid'
import CustomCard from '../../components/CustomCard'
import AlertModal from '../../components/AlertModal'
import Delete from './Form/Delete'
import MasterAdmin from '../../layouts/MasterAdmin'
import { fetchScheduleByParishId } from '../../api/scheduleApi'
import { AuthContext } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import moment from 'moment'
import StoreCertificate from './Form/StoreCertificate'

function AdminSchedule() {
  return (
    <MasterAdmin>
      <Stack spacing={2}>
        <Stack direction={'row'} spacing={2}>
          <Typography variant='h4' fontWeight={'bold'}>Schedule List: </Typography>
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
  const [certificateModal, setCertificateModal] = useState(false);


  const handleDeleteModal = () => {
    setDeleteModal(true)
  }


  const handleCloseModal = () => {
    setDeleteModal(false)
    setCertificateModal(false)
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
    const { data, error } = await fetchScheduleByParishId(auth.user.parish._id)
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
      field: 'event',
      headerName: 'Event',
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
      field: 'release',
      headerName: 'Release',
      flex: 1,
      headerAlign: 'center',
      headerClassName: 'headerStyle',
      renderCell: (params) => (
        <Box sx={{ textAlign: 'center' }}>
          <ReleaseCertificateButton params={params.row} setSelected={setSelected} setCertificateModal={setCertificateModal}/>
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
    name: `${item?.request?.user?.lastName}, ${item?.request?.user?.firstName} ${item?.request?.user?.middleName[0]}.`,
    event: item?.request?.certificate,
    date: moment(item?.request?.schedule).format("DD - MMMM - YYYY"),
    status:
      moment(item?.request?.schedule).isSame(moment(), 'day') && <Chip label="Active" color="success" /> ||
      moment(item?.request?.schedule).isAfter(moment(), 'day') && <Chip label="Pending" color="warning" /> ||
      moment(item?.request?.schedule).isBefore(moment(), 'day') && <Chip label="Expired" color="error" />
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
          <MenuItem onClick={handleDeleteModal}>
            <Typography color="error.main">Remove</Typography>
          </MenuItem>
        </Menu>
      </CustomCard>
      <AlertModal open={deleteModal} onClose={handleCloseModal}>
        <Delete onClose={handleCloseModal} selected={selected} handleGetData={handleGetData} />
      </AlertModal>
      <AlertModal open={certificateModal} onClose={handleCloseModal}>
        <StoreCertificate onClose={handleCloseModal} selected={selected} handleGetData={handleGetData} />
      </AlertModal>
    </>
  )
}

function ReleaseCertificateButton({ params, setSelected, setCertificateModal }) {

  const handleSubmit = async () => {
    setSelected(params)
    setCertificateModal(true)
  }
  console.log(params)
  return (
    <>
      {params.release && (
        <Button variant='contained' color='success'>Released</Button>
      )}
      {!params.release && (
        <Button variant='contained' color='warning' onClick={() => handleSubmit()}>Release</Button>
      )}
    </>
  )
}

export default AdminSchedule