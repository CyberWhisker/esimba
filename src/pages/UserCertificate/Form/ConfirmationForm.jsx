import { Box, Button, Card, Stack, Typography } from '@mui/material'
import React from 'react'
import Master from '../../../layouts/Master'
import { ArrowBackRounded } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useDemoData } from '@mui/x-data-grid-generator';

function ConfirmationForm() {
  const navigate = useNavigate();
  return (
    <Master>
      <Stack sx={{py: 4}} spacing={2}>
        <Stack direction={'row'} spacing={2}>
          <Button startIcon={<ArrowBackRounded/>} variant='contained' onClick={() => navigate(-1)}>Go Back</Button>
          <Typography variant='h4' fontWeight={'bold'}>Confirmation List:</Typography>
        </Stack>
        <Card elevation={5} sx={{
          padding: 2,
          backgroundColor: 'rgba(128, 0, 0, 0.5)', 
          backdropFilter: 'blur(10px)', 
          boxShadow: 'none', 
          transition: 'background-color 0.3s ease',
        }}>
          <FormSection/>
        </Card>
      </Stack>
    </Master>
  )
}

function FormSection () {
    const { data } = useDemoData({
      dataSet: 'Commodity',
      rowLength: 5,
      maxColumns: 6,
    });
    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1
        },
        {
            field: 'certificate',
            headerName: 'Certificate',
            flex: 1
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1
        },
        {
            field: 'date',
            headerName: 'Date',
            flex: 1
        },
        {
            field: 'setting',
            headerName: 'Setting',
            flex: 1
        },
    ]
    const rows = []
    return (
        <Box sx={{ width: '100%', height: 340 }}>
            <DataGrid
                {...data}
                initialState={{
                    ...data.initialState,
                    filter: {
                        filterModel: {
                        items: [],
                        quickFilterValues: [],
                        },
                    },
                }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
            />
        </Box>
    )
}

export default ConfirmationForm