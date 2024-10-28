import React from 'react';
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import CustomToast from '../components/CustomToast';
import backgroundImg from '/appImg/Background.jpg';
import SideBar from '../components/SideBar';

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

function MasterAdmin({ children }) {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
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
                <Box sx={{
                  minHeight: '100vh', 
                  display: 'flex', // Make the sidebar and content side by side
                }}>
                  <SideBar isOpen={isSidebarOpen} onToggle={handleToggleSidebar} />
                  <Box 
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <TopBar/>
                    <Container sx={{py: 2}}>
                      {children}
                    </Container>
                    <Footer/>
                  </Box>
                </Box>
            </Box>
            <CustomToast />
        </ThemeProvider>
    );
}

export default MasterAdmin;

