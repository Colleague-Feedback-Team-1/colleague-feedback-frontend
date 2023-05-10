import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';
import { IconButton } from '@mui/material';
import Finland from '../assets/Flag_of_Finland.png';
import England from '../assets/Flag-United-Kingdom.png';

const  LanguageSelector = () => {
  // const [language, setLanguage] = React.useState('');
  // const handleChange = (event: SelectChangeEvent) => {
  //   setLanguage(event.target.value);
  // };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }



  return (
    <div>
      <IconButton color='inherit' onClick={handleOpen}>

<LanguageIcon/>
      </IconButton>
    <Menu
    anchorEl={anchorEl}
    id="account-menu"
    open={open}
    onClose={handleClose}
    onClick={handleClose}
  >
    <MenuItem onClick={handleClose}>
      <Avatar /> English
    </MenuItem>
    <MenuItem onClick={handleClose}>
      <Avatar /> Finnish
    </MenuItem>
    <MenuItem onClick={handleClose}>
    <Avatar
    alt="England"
    src={ England }
    sx={{ width: 24, height: 24 }}
/>  English
    </MenuItem>
    <MenuItem onClick={handleClose}>
    <Avatar
   alt="Finland"
    src={ Finland }
    sx={{ width: 24, height: 24 }}
/>  Finnish
    </MenuItem>
  </Menu>
    </div>
  );
}

export default LanguageSelector;