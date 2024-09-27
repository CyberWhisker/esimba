import { Box, Divider, Stack, useTheme } from '@mui/material';
import React, { useState } from 'react';
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
                  backgroundColor: active ? theme.palette.primary.main : undefined, // Active color
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main, // Hover color
                  },
                  color: '#fff', // Text color for better contrast
                };
              } else if (level === 1) { // Custom styles for SubMenu items
                return {
                  backgroundColor: 'rgba(128, 0, 0, 0.6)', // SubMenu background color
                  '&:hover': {
                    backgroundColor: 'rgba(128, 0, 0, 0.7)', // SubMenu hover color
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
  return (
    <>
      {/* MenuItem with Link component */}
      <MenuItem icon={<Dashboard />} component={<Link to='/' />} active={location.pathname === '/'}>
        Dashboard
      </MenuItem>
      <MenuItem icon={<Person />} component={<Link to='/user' />} active={location.pathname.startsWith('/user')}>
        User
      </MenuItem>
      <SubMenu label='Request' icon={<Pending />} active={location.pathname.startsWith('/appointment') || location.pathname.startsWith('/certificate')}>
        <MenuItem icon={<PinDrop />} component={<Link to='/appointment' />} active={true}>
          Appointment
        </MenuItem>
        <MenuItem icon={<Note />} component={<Link to='/certificate' />}>
          Certificate
        </MenuItem>
      </SubMenu>
      <MenuItem icon={<Note />} component={<Link to='/record' />}>
        Records
      </MenuItem>
      <MenuItem icon={<CalendarMonth />} component={<Link to='/schedule' />}>
        Schedules
      </MenuItem>
    </>
  );
}

export default SideBar;
