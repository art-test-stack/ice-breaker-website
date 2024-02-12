import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';
import TextField from '@mui/material/TextField'; 
import Typography from '@mui/material/Typography';
import Login from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
// import RegisterMenu; 

export default function LoginMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [email, setEmail] = React.useState(''); 
  const [password, setPassword] = React.useState('');
  const [showRegisterMenu, setShowRegisterMenu] = React.useState(false); 
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogin = () => {
    console.log('Email:', email); 
    console.log('Password: ', password); 
    setEmail(''); 
    setPassword(''); 
    handleClose(); 
  }
  const handleRegisterClick = () => {
    setShowRegisterMenu(true); 
    handleClose(); 
  }
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography> */}
        {/* <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
        <Tooltip title="Log in">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 80, height: 32, borderRadius: 2 }}>
              <Typography color="primary">
                Log in
              </Typography>
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            bgcolor: "primary", 
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            // '&::before': {
            //   content: '""',
            //   display: 'block',
            //   position: 'absolute',
            //   top: 0,
            //   right: 14,
            //   width: 10,
            //   height: 10,
            //   bgcolor: 'background.paper',
            //   transform: 'translateY(-50%) rotate(45deg)',
            //   zIndex: 0,
            // },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem> */}

        <MenuItem onClick={(event) => event.stopPropagation()}>
          <Typography color="primary">
            Log in
          </Typography>
        </MenuItem>

        {/* <MenuItem onClick={handleClose}> */}
        <MenuItem onClick={(event) => event.stopPropagation()}>
          <TextField
            id="standard-basic"
            label="E-mail"
            variant="standard"
            size="small"
            sx={{ input: {color:'primary'}}}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        </MenuItem>
        {/* <MenuItem onClick={handleClose}> */}
        <MenuItem onClick={(event) => event.stopPropagation()}>
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            size="small"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        </MenuItem>
        <MenuItem onClick={handleLogin}>
          <ListItemIcon>
            <Login fontSize="small" />
          </ListItemIcon>
          <Typography color="primary">
            Log in
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleRegisterClick}>
          <ListItemIcon>
            <AppRegistrationIcon fontSize="small" />
          </ListItemIcon>
          {/* <Typography color="primary" fontSize={15}> */}
          <Typography color="primary">

            No account? Register here.
          </Typography>
        </MenuItem>
      </Menu>
        {/* {showRegisterMenu && <RegisterMenu />} */}
    </React.Fragment>
  );
}