import React, { useState } from 'react';
import MasterAdmin from '../../layouts/MasterAdmin';
import { Box, Button, Grid2, Stack, Typography, useTheme } from '@mui/material';
import { Add, KeyboardReturn } from '@mui/icons-material';
import CustomCard from '../../components/CustomCard';
import { useNavigate } from 'react-router-dom';
import { Baptism, Confirmation, Death, Marriage } from '../../layouts/Pdf'; // Your PDF component
import { PDFViewer } from '@react-pdf/renderer';

function AdminFile() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Function to download the PDF
  const downloadPdf = async () => {
    setLoading(true);
  };

  return (
    <MasterAdmin>
      <Stack spacing={1}>
        <Stack justifyContent={'space-between'} direction={'row'}>
          <Stack direction={'row'} spacing={2}>
            <Typography variant="h4" fontWeight={'bold'}>
              Record List:
            </Typography>
            <Button variant="contained" endIcon={<KeyboardReturn />} color="warning" onClick={() => navigate(-1)}>
              Record List
            </Button>
          </Stack>
          <Typography variant="h4" fontWeight={'bold'}>
            First Name Last Name
          </Typography>
        </Stack>

        <CustomCard>
          <Box
            sx={{
              '& .headerStyle': {
                backgroundColor: theme.palette.warning.main,
              },
              height: '70vh',
              p: 2,
            }}
          >
            <PDFViewer height={'100%'} width={'100%'}>
                {/* <Baptism /> */}
                {/* <Confirmation /> */}
                {/* <Marriage /> */}
                <Death />
            </PDFViewer>
          </Box>
        </CustomCard>
      </Stack>
    </MasterAdmin>
  );
}

export default AdminFile;
