import React, { useEffect, useState } from 'react'
import { Box, Button, Drawer, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material'
import { Add } from '@mui/icons-material'
import { DataGrid, GridMoreVertIcon, GridToolbar } from '@mui/x-data-grid'
import CustomCard from '../../components/CustomCard'
import AlertModal from '../../components/AlertModal'
import Store from './Form/Store'
import Update from './Form/Update'
import Delete from './Form/Delete'
import MasterAdmin from '../../layouts/MasterAdmin'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

function AdminSchedule() {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState(null);

    const [storeModal, setStoreModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    
    const handleDateClick = (arg) => {
      alert(arg.dateStr)
    }

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
        setLoading(false)
    }

    useEffect(() => {
        handleGetData()
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

  const events = [
    { title: 'Meeting', start: new Date() }
  ]
  return (
    <MasterAdmin>
      <Stack spacing={2}>
          <Stack direction={'row'} spacing={2}>
            <Typography variant='h4' fontWeight={'bold'}>Schedule </Typography>
          </Stack>
        <CustomCard>
          <Box sx={{p:2}}>
            <FullCalendar
              plugins={[ dayGridPlugin, interactionPlugin  ]}
              events={events}
              dateClick={handleDateClick}
              height={'70vh'}
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
        <Store onClose={handleCloseModal} handleGetData={handleGetData}/>
      </Drawer>
      <Drawer open={updateModal} anchor='right' onClose={handleCloseModal}>
        <Update selected={selected} onClose={handleCloseModal} handleGetData={handleGetData}/>
      </Drawer>
      <AlertModal open={deleteModal} onClose={handleCloseModal}>
        <Delete onClose={handleCloseModal} selected={selected} handleGetData={handleGetData}/>
      </AlertModal>
    </MasterAdmin>
  )
}

export default AdminSchedule