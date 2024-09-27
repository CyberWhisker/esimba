import React from 'react';
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import CustomToast from '../components/CustomToast';
  
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 15
        },
      },
    },
  });

function Master({ children }) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box sx={{
            minHeight: '100vh',
            zIndex: 100,  
            display: 'flex', 
            justifyContent: 'space-between', 
            flexDirection: 'column',
        }}>
          <Container sx={{flex: 1}}>
            {children}
          </Container>
        </Box>
        <CustomToast/>
      </ThemeProvider>
    );
}

export default Master;
