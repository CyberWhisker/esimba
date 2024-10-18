import { MenuItem, Stack } from "@mui/material"
import { Link } from "react-router-dom"

export const LandingNav = () => {
    return (
        <>
            <MenuItem component={Link} to='/'>About</MenuItem>
            <MenuItem component={Link} to='/membership'>Membership</MenuItem>
            <MenuItem>Contact Us</MenuItem>
        </>
    )
}

export const UserNav = () => {
    return (
        <>
            <MenuItem component={Link} to='/user/dashboard'>Home</MenuItem>
            <MenuItem>About</MenuItem>
            <MenuItem>Contact Us</MenuItem>
        </>
    )
}

export const AdminNav = () => {
    return (
        <>
            <MenuItem component={Link} to='/'>Home</MenuItem>
            <MenuItem>About</MenuItem>
            <MenuItem>Contact Us</MenuItem>
        </>
    )
}