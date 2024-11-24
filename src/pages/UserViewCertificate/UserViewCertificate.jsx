import React, { useContext, useEffect, useRef, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import CustomCard from '../../components/CustomCard'
import { fetchBaptism, fetchBaptismByUserId } from '../../api/baptismApi'
import moment from 'moment'
import { useReactToPrint } from 'react-to-print'
import BaptismLayout from '../../layouts/Pdf/BaptismLayout'
import Master from '../../layouts/Master'
import { useTheme } from '@emotion/react'
import { AuthContext } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import { fetchConfirmationByUserId } from '../../api/confirmationApi'
import { fetchDeathByUserId } from '../../api/deathApi'
import { fetchMarriageByUserId } from '../../api/marriageApi'
import DeathLayout from '../../layouts/Pdf/DeathLayout'
import ConfirmationLayout from '../../layouts/Pdf/ConfirmationLayout'
import MarriageLayout from '../../layouts/Pdf/MarriageLayout'

function UserViewCertificate() {
  const { auth } = useContext(AuthContext)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState({});

  const handleGetData = async () => {
    setLoading(true)
    const baptismData = await handleGetBaptism()
    const confirmationData = await handleGetConfirmation()
    const marriageData = await handleGetMarriage()
    const deathData = await handleGetDeath()
    // Add the 'type' field to each record
    const baptismWithTypes = baptismData.map((item) => ({ ...item, type: 'Baptism Certificate' }));
    const confirmationWithTypes = confirmationData.map((item) => ({ ...item, type: 'Confirmation Certificate' }));
    const deathWithTypes = deathData.map((item) => ({ ...item, type: 'Death Certificate' }));
    const marriageWithTypes = marriageData.map((item) => ({ ...item, type: 'Marriage Certificate' }));

    // Combine both arrays
    setData([...baptismWithTypes, ...confirmationWithTypes, ...deathWithTypes, ...marriageWithTypes]);
    setLoading(false)
  }

  const handleGetBaptism = async () => {
    const { data, error } = await fetchBaptismByUserId(auth.user._id)
    if (error) {
      toast.error("Server Error")
    } else {
      return data
    }
  }

  const handleGetConfirmation = async () => {
    const { data, error } = await fetchConfirmationByUserId(auth.user._id)
    if (error) {
      toast.error("Server Error")
    } else {
      return data
    }
  }

  const handleGetDeath = async () => {
    const { data, error } = await fetchDeathByUserId(auth.user._id)
    if (error) {
      toast.error("Server Error")
    } else {
      return data
    }
  }

  const handleGetMarriage = async () => {
    const { data, error } = await fetchMarriageByUserId(auth.user._id)
    if (error) {
      toast.error("Server Error")
    } else {
      return data
    }
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
    <Master>
      <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingY: 1 }}>
        <Typography variant='h2' fontWeight={'bold'}>Certificate List</Typography>
      </Box>
      <Box sx={{ pb: 2 }}>
        <DataTable data={data} handleGetData={handleGetData} loading={loading} handlePrintFile={handlePrintFile} setSelected={setSelected} selected={selected} />
        <Certificate contentRef={contentRef} selected={selected} />
      </Box>
    </Master>
  )
}

function DataTable({ data, loading, handlePrintFile, selected, setSelected }) {
  const theme = useTheme();


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
      field: 'type',
      headerName: 'Type',
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
  ]

  const rows = data.map((item) => ({
    ...item,
    id: item._id,
    requester: `${item.user.firstName} ${item.user.lastName}`,
    createdAt: moment(item.createdAt).format('MMMM DD YYYY'),
    updatedAt: moment(item.updatedAt).format('MMMM DD YYYY')
  }))

  return (
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
  )
}

function Certificate({ contentRef, selected }) {
  console.log(selected)
  return (
    <div>
      <div style={{ display: 'none' }}>
        <div ref={contentRef} style={{ color: 'black' }}>
          {selected.type == "Baptism Certificate" && (
            <BaptismLayout selected={selected} />
          )}
          {selected.type == "Death Certificate" && (
            <DeathLayout selected={selected} />
          )}
          {selected.type == "Confirmation Certificate" && (
            <ConfirmationLayout selected={selected} />
          )}
          {selected.type == "Marriage Certificate" && (
            <MarriageLayout selected={selected} />
          )}
        </div>
      </div>
    </div>
  )
}

export default UserViewCertificate