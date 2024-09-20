import React from 'react';
import { Box, Container, createTheme, ThemeProvider } from '@mui/material';

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
        </ThemeProvider>
    );
}

export default Master;
