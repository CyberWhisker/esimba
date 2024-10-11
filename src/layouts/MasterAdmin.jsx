import React from 'react';
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import TopBar from '../components/TopBar';
import CustomToast from '../components/CustomToast';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 15,
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
      <Box sx={{
        zIndex: 100, 
        minHeight: '100vh', 
        display: 'flex', // Make the sidebar and content side by side
        flexDirection: 'row', 
      }}>
        {/* Pass toggle function and state to the sidebar */}
        <SideBar isOpen={isSidebarOpen} onToggle={handleToggleSidebar} />
        <Box 
          sx={{
            flexGrow: 1, // Take remaining space
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <TopBar/>
          <Container>
            {children}
          </Container>
          <Footer/>
        </Box>
      </Box>
      <CustomToast/>
    </ThemeProvider>
  );
}

export default MasterAdmin;
