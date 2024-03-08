import * as React from 'react';
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
import {currentUserData, loginUser, registerUser, signOutUser} from '../../firebase/auth'
import { useContext } from 'react';
import { register } from 'module';
import Box from '@mui/material/Box';

export default function LoginMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [email, setEmail] = React.useState(''); 
  const [password, setPassword] = React.useState('');

  let [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const userData = useContext(currentUserData);

  // const [showRegisterMenu, setShowRegisterMenu] = React.useState(false); 
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogin = () => {
    loginUser(email, password, (err: string | null) => {
        if (err) {
            console.log('error: ', err)
            setErrorMessage(err);
        } else {
            setEmail(''); 
            setPassword(''); 
            handleClose(); 
        }
    })
  }
  // const handleRegisterClick = () => {
  //   setShowRegisterMenu(true); 
  //   handleClose(); 
  // }

  const handleRegister = () => {
    registerUser(email, password, (err: string | null) => {
        if (err) {
            setErrorMessage(err);
        } else {
            console.log('error: ', err)
            setEmail(''); 
            setPassword(''); 
            handleClose(); 
        }
    })
  }
  if (userData) {
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', flexDirection: 'row' }}>
                <Box sx={{ 
                    backgroundColor: 'black', 
                    display: 'flex', 
                    flexDirection: 'row', 
                    padding: '10px', 
                    alignItems: 'center', 
                    textAlign: 'center',
                    borderRadius: '10px',
                }} >
                    <Avatar sx={{ width: 32, height: 32, borderRadius: 2, marginRight: '5px' }} />
                    <Typography sx={{ color: 'primary', opacity: 0.6 }}>Logged in as </Typography>
                    <Typography sx={{ color: 'primary', fontWeight: 'bold', marginLeft: '5px' }}>{userData.data?.username}</Typography>
                </Box>

                <Tooltip title="Log out">
                <IconButton
                    onClick={() => {
                        setErrorMessage(null)
                        setAnchorEl(null)
                        signOutUser()
                    }}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 80, height: 32, borderRadius: 2 }}>
                    <Typography color="primary">
                        Log out
                    </Typography>
                    </Avatar>
                </IconButton>
                </Tooltip>
            </Box>
        </React.Fragment>
    )
  } else {
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
                aria-controls={open ? 'login-menu' : undefined}
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
            id="login-menu"
            open={open}
            onClose={handleClose}
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
                id="email-textfield"
                label="E-mail"
                variant="standard"
                size="small"
                sx={{ input: {color:'primary'}}}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault(); 
                    document.getElementById('password-textfield')?.focus(); 
                  }
                  e.stopPropagation()
                }}
            />
            </MenuItem>
            {/* <MenuItem onClick={handleClose}> */}
            <MenuItem onClick={(event) => event.stopPropagation()}>
            <TextField
                id="password-textfield"
                label="Password"
                variant="standard"
                size="small"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault(); 
                    handleLogin(); 
                  }
                  e.stopPropagation()
                }}
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
            <MenuItem onClick={handleRegister}>
            <ListItemIcon>
                <AppRegistrationIcon fontSize="small" />
            </ListItemIcon>
            {/* <Typography color="primary" fontSize={15}> */}
            <Typography color="primary">
                Register
            </Typography>
            </MenuItem>
            <MenuItem onClick={(event) => event.stopPropagation()}>
            <Typography color="error">
                {errorMessage}
            </Typography>
            </MenuItem>
        </Menu>
            {/* {showRegisterMenu && <RegisterMenu />} */}
        </React.Fragment>
    );
  }
}