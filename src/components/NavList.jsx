import { MenuItem, Stack } from "@mui/material"
import { Link } from "react-router-dom"

export const LandingNav = () => {
    return (
        <>
        </>
    )
}

export const UserNav = () => {
    return (
        <>
            <MenuItem component={Link} to='/user/dashboard'>Home</MenuItem>
            <MenuItem component={Link} to='/user/certificate'>Certificates</MenuItem>
            <MenuItem component={Link} to='/user/viewSchedule'>Schedule</MenuItem>
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