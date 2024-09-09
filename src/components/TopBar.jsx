import React from 'react';
import { AppBar, Toolbar, Typography, useScrollTrigger, Slide, Menu, MenuItem, Button, Alert, Box, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import Logo from '/appImg/Logo.png'
import { AddAlertOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const TransparentAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'rgba(128, 0, 0, 0.5)', 
  backdropFilter: 'blur(10px)', 
  boxShadow: 'none', 
  transition: 'background-color 0.3s ease',
  position: 'fixed', 
  width: '100%', 
  top: 0, 
}));

const TopBar = () => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            <TransparentAppBar>
                <Toolbar sx={{justifyContent: 'space-between'}}>
                    <img alt='Logo' src={Logo} style={{height: 50}}/>
                    <Box sx={{display: 'flex', flexDirection: 'row', gap: 2}}>
                        <MenuItem component={Link} to='/'>Home</MenuItem>
                        <MenuItem>About</MenuItem>
                        <MenuItem>Contact Us</MenuItem>
                    </Box>
                    <MenuItem>
                        <ListItemIcon>
                            <AddAlertOutlined/>
                        </ListItemIcon>
                        <ListItemText>Alert</ListItemText>
                    </MenuItem>
                </Toolbar>
            </TransparentAppBar>
        </Slide>
    );
};

export default TopBar;
