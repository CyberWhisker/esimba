import React from 'react';
import { Box, Container, createTheme, ThemeProvider, Typography } from '@mui/material';
import Background from '/appImg/Background.jpg';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';

const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 15,
        },
      },
    },
  });
  
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
            <Box sx={{
                zIndex: 100, 
                height: '100vh', 
                display: 'flex', 
                justifyContent: 'space-between', 
                flexDirection: 'column'
            }}>
                <TopBar/>
                <Container sx={{mt: 8}}>
                    {children}
                </Container>
                <Footer/>
            </Box>
        </ThemeProvider>
    );
}

export default Master;
