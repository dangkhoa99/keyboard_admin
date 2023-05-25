import { useAuth } from '@/hooks/useAuth'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import DashboardIcon from '@mui/icons-material/Dashboard'
import KeyboardIcon from '@mui/icons-material/Keyboard'
import MenuIcon from '@mui/icons-material/Menu'
import PersonIcon from '@mui/icons-material/Person'
import ReceiptIcon from '@mui/icons-material/Receipt'
import CategoryIcon from '@mui/icons-material/Category'
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import * as React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const MENU = [
  { id: '1', name: 'Dashboard', icon: <DashboardIcon />, link: '/' },
  { id: '2', name: 'Category', icon: <CategoryIcon />, link: '/categories' },
  { id: '3', name: 'Product', icon: <KeyboardIcon />, link: '/products' },
  { id: '4', name: 'User', icon: <PersonIcon />, link: '/users' },
  { id: '5', name: 'Order', icon: <ReceiptIcon />, link: '/orders' },
]

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
  // @ts-ignore
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
  // @ts-ignore
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

export default function MiniDrawer({ children }) {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = React.useState(true)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
      <AppBar
        position='fixed'
        // @ts-ignore
        open={open}>
        <Toolbar>
          <Stack
            flexDirection='row'
            alignItems='center'
            gap={2}
            sx={{ width: '100%' }}>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}>
              <MenuIcon />
            </IconButton>

            <Typography
              variant='h6'
              textAlign='start'
              fontWeight='900'
              sx={{ flex: 1 }}>
              {`Khoa's Store`}
            </Typography>

            <Button
              disableElevation
              variant='text'
              onClick={logout}
              color='inherit'
              size='large'
              sx={{ fontWeight: 900 }}>
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer variant='permanent' open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List>
          {MENU.map((item, index) => (
            <ListItem
              key={item.id}
              disablePadding
              sx={{
                display: 'block',
                backgroundColor:
                  location.pathname === item.link ? 'grey.300' : 'unset',
              }}>
              <ListItemButton
                onClick={() => navigate(item.link)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}>
                <Tooltip title={open ? '' : item.name} placement='right'>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}>
                    {item.icon}
                  </ListItemIcon>
                </Tooltip>

                <ListItemText
                  primary={item.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component='main'
        sx={{
          // flexGrow: 1,
          mt: '64px',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}>
        {children}
      </Box>
    </Box>
  )
}
