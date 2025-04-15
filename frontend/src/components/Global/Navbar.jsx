

// -------------- CSS -----------------------------
import './Navbar.css'

// --------------------------------------------------

// MUI Components
import { Dropdown } from '@mui/joy';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import { Avatar } from '@mui/joy';
import { useState } from 'react';

function Navbar()
{

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return <div id="navbar">

    <p id='webtitle'>DashBoard</p>

    <div id='subnav'>
        <p>Home</p>
        <p>About Us</p>
            <Avatar onClick = { handleClick }></Avatar>
            <Menu open = {open} style={ { position: "absolute", left: "93%", top: "8%"}}>
                <MenuItem onClick={ handleClose }>Profile</MenuItem>
                <MenuItem onClick={ handleClose }>Logout</MenuItem>
            </Menu>
    </div>
        


    </div>
}

export default Navbar;