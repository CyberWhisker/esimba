import { Box, Divider, Stack, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import Logo from '/appImg/Logo.png';
import { CalendarMonth, ChevronLeft, Dashboard, Note, Pending, Person, PinDrop } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

function SideBar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleToggleOpen = () => {
    setOpen(!open);
  };

  return (
    <Sidebar collapsed={open} onBackdropClick={() => setOpen(false)}>
      <Box
        sx={{
          backgroundColor: 'rgba(128, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          height: '100vh',
        }}
      >
        <Stack direction={'row'} justifyContent={open ? 'center' : 'space-between'} p={1} alignItems={'center'}>
          {!open && <img src={Logo} alt='Logo' style={{ height: '6vh' }} />}
          <ChevronLeft
            sx={{
              height: '6vh',
              cursor: 'pointer',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: '.3s',
            }}
            onClick={handleToggleOpen}
          />
        </Stack>
        <Divider />
        <Menu
          menuItemStyles={{
            button: ({ level, active }) => {
              if (level === 0) {
                return {
                  backgroundColor: active ? theme.palette.warning.main : undefined, // Active color
                  '&:hover': {
                    backgroundColor: theme.palette.warning.main, // Hover color
                  },
                  color: '#fff', // Text color for better contrast
                };
              } else if (level === 1) { // Custom styles for SubMenu items
                return {
                  backgroundColor: active ? theme.palette.warning.main : 'rgba(128, 0, 0, 0.6)', // SubMenu background color
                  '&:hover': {
                    backgroundColor: theme.palette.warning.main, // Hover color
                  },
                  color: '#fff', // Text color for better contrast
                };
              }
            },
          }}
        >
          <AdminNavList />
        </Menu>
      </Box>
    </Sidebar>
  );
}

function AdminNavList() {
  const location = useLocation();
  const [openCertificate, setOpenCertificate] = useState(location.pathname.startsWith('/certificate'))
  const [openRequest, setOpenRequest] = useState(location.pathname.startsWith('/request'))

  const handleOpenCertificate = () => {
    setOpenCertificate(!openCertificate)
  }

  const handleOpenRequest = () => {
    setOpenRequest(!openRequest)
  }

  useEffect(() => {
    if (location.pathname.startsWith('/certificate')) {
      setOpenCertificate(true)
    }

    if (location.pathname.startsWith('/request')) {
      setOpenRequest(true)
    }
  }, [])
  return (
    <>
      {/* MenuItem with Link component */}
      <MenuItem icon={<Dashboard />} component={<Link to='/admin/dashboard' />} active={location.pathname === '/'}>
        Dashboard
      </MenuItem>
      <MenuItem icon={<Person />} component={<Link to='/user' />} active={location.pathname.startsWith('/user')}>
        User
      </MenuItem>

      <SubMenu label='Request' icon={<Pending />} open={openRequest} onClick={handleOpenRequest}>
        <MenuItem icon={<PinDrop />} component={<Link to='/request/appointment' />} active={location.pathname == '/request/appointment'}>
          Appointment
        </MenuItem>
        <MenuItem icon={<Note />} component={<Link to='/request/certificate' />} active={location.pathname == '/request/certificate'}>
          Certificate
        </MenuItem>
      </SubMenu>

      <SubMenu label='Certificate' icon={<Pending />} open={openCertificate} onClick={handleOpenCertificate}>
        <MenuItem icon={<Note />} component={<Link to='/certificate/baptism' />} active={location.pathname == '/certificate/baptism'}>
          Baptism 
        </MenuItem>
        <MenuItem icon={<Note />} component={<Link to='/certificate/death' />} active={location.pathname == '/certificate/death'}>
          Death 
        </MenuItem>
        <MenuItem icon={<Note />} component={<Link to='/certificate/marriage' />} active={location.pathname == '/certificate/marriage'}>
          Marriage 
        </MenuItem>
        <MenuItem icon={<Note />} component={<Link to='/certificate/confirmation' />} active={location.pathname == '/certificate/confirmation'}>
          Confirmation 
        </MenuItem>
      </SubMenu>

      <MenuItem icon={<CalendarMonth />} component={<Link to='/schedule' />} active={location.pathname == '/schedule'}>
        Schedules
      </MenuItem>
    </>
  );
}

export default SideBar;
