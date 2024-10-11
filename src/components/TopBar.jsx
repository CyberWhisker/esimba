import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Menu, MenuItem, Button, Box, Stack, Tooltip, IconButton, Avatar } from '@mui/material';
import Logo from '/appImg/Logo.png'
import { AddAlertOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { LandingNav, UserNav } from './NavList';
import { AuthContext } from '../context/AuthContext';



const TopBar = () => {
    const {auth, logout} = useContext(AuthContext)
    return (
        <AppBar 
        position='relative' 
        sx={{
            backgroundColor: 'rgba(128, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)'
        }}
        >
            <Toolbar sx={{justifyContent: 'space-between'}}>
                <Box>
                    {auth?.user.role == 3 && (
                        <img alt='Logo' src={Logo} style={{height: '8vh'}}/>
                    )}
                </Box>
                {auth?.user.role == 3 && (
                    <Stack direction={'row'} spacing={2}>
                        <UserNav/>
                    </Stack>
                )}
                {!auth && (
                    <Stack direction={'row'} spacing={2}>
                        <LandingNav/>
                    </Stack>
                )}
                {auth && (
                    <IsLogged auth={auth} logout={logout}/>
                )}
                {!auth && (
                    <NotLogged />
                )}
            </Toolbar>
        </AppBar>
    );
};

function IsLogged ({logout, auth}) {

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    return (
        <Stack direction={'row'} spacing={2}>
            <MenuItem>
                <AddAlertOutlined/>
            </MenuItem>
            <Stack direction={'row'} spacing={2}>
                <Stack>
                    <Typography>{auth.user.firstName} {auth.user.lastName}</Typography>
                    <Typography>
                        {auth.user.role === 1 && 'Super Admin'}
                        {auth.user.role === 2 && 'Admin'}
                        {auth.user.role === 3 && 'User'}
                    </Typography>
                </Stack>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt={auth.user.firstName} src={auth.user.profile} />
                    </IconButton>
                </Tooltip>
            </Stack>
            <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center' }}>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center' }} onClick={logout}>Logout</Typography>
                </MenuItem>
            </Menu>
        </Stack>
    )
}

function NotLogged () {
    return (
        <Stack direction={'row'} spacing={2}>
            <Button variant='outlined' color='warning' component={Link} to='/register'>Register</Button>
            <Button variant='contained' color='warning' component={Link} to='/login'>Log In</Button>
        </Stack>
    )
}

export default TopBar;
