import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { routes } from './drawerRoutes'
import ListItemLink from '../components/ListItemLink';
import { useAdmin } from '../context/AdminContext'
import AccountMenu from './AccountMenu'
import LogoutButton from '../components/LogoutButton';
import GoBackButton from './GoBackButton'
import { useNavigate } from 'react-router-dom'
import { alpha } from '@mui/material';

const drawerWidth = 240;

function ResponsiveDrawer() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { state: AdminState } = useAdmin()
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Box onClick={() => navigate('/')} sx={{
                padding: '1rem 0',
                display: 'flex',
                fontWeight: 600,
                justifyContent: 'center',
                fontSize: '1.75rem',
                color: theme => theme.palette.primary.main,
                cursor: 'pointer',
                transition: '0.3s',
                overflowX: 'hidden',
                '&:hover': {
                    backgroundColor: theme => alpha(theme.palette.text.primary, 0.05)
                }
            }}>
                {process.env.REACT_APP_NAME}
            </Box>
            <List>
                {routes.map((route, index) => (
                    <ListItemLink
                        primary={route.name}
                        to={route.route}
                        icon={route.icon}
                        key={index}
                    />
                ))}
                <Divider />
                <LogoutButton />
            </List>
        </div>
    );

    return (
        <>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <GoBackButton />
                    <Typography variant="h6" noWrap component="div">
                        {AdminState.title}
                    </Typography>
                    <Box flex='1' justifyContent='flex-end' display='flex'>
                        <AccountMenu />
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, overflowX: 'hidden' }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, overflowX: 'hidden' },
                        overflowX: 'hidden'
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            overflowX: 'hidden',
                            scrollbarColor: '#6D6D6D',
                            "&::-webkit-scrollbar": {
                                width: 10
                            },
                            "&::-webkit-scrollbar-track": {
                                backgroundColor: "#D9D9D9",
                                borderRadius: 5
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "#6D6D6D",
                                borderRadius: 5
                            }
                        },
                        overflowX: 'hidden'
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    );
}

export default ResponsiveDrawer;
