import React from 'react';
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
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
                zIndex: 100, 
                height: '100vh', 
                display: 'flex', 
                justifyContent: 'space-between', 
                flexDirection: 'column',
            }}>
                <TopBar/>
                <Container sx={{mt: 8, flex: 1}}>
                    {children}
                </Container>
                <Footer/>
            </Box>
            <CustomToast/>
        </ThemeProvider>
    );
}

export default Master;
