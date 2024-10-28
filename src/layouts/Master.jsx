import React from 'react';
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import CustomToast from '../components/CustomToast';
import backgroundImg from '/appImg/Background.jpg';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 15,
                },
            },
        },
    },
});

function Master({ children }) {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box
                sx={{
                  minHeight: '100vh',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                }}
            >
                {/* Background Image Layer */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${backgroundImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.3,
                        zIndex: -1,
                    }}
                />

                {/* Content Layer */}
                <Box sx={{ zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', }}>
                    <TopBar />
                    <Container sx={{ mt: 8, flex: 1 }}>
                        {children}
                    </Container>
                    <Footer />
                </Box>
            </Box>
            <CustomToast />
        </ThemeProvider>
    );
}

export default Master;
