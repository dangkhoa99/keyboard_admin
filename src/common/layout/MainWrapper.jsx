import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import DashboardIcon from '@mui/icons-material/Dashboard'
import KeyboardIcon from '@mui/icons-material/Keyboard'
import MenuIcon from '@mui/icons-material/Menu'
import PersonIcon from '@mui/icons-material/Person'
import ReceiptIcon from '@mui/icons-material/Receipt'
import CategoryIcon from '@mui/icons-material/Category'
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
  Skeleton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  styled,
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { Fragment, useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL, RestEndpoints } from '../constants'
import { loadLS } from '@/utils'
import LogoutBtn from '../components/LogoutBtn'

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
    width: '100%',
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

const MiniDrawer = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(true)
  const [userInfo, setUserInfo] = useState({
    data: {
      id: '',
      role: '',
      username: '',
      name: '',
    },
    isLoading: false,
  })

  const toggleDrawer = useCallback(() => {
    setOpen(!open)
  }, [open])

  useEffect(() => {
    const token = loadLS('token')

    if (!token) {
      return
    }

    setUserInfo((prev) => ({ ...prev, isLoading: true }))

    axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token?.type} ${token?.value}`,
      },
      url: `${BASE_URL}/${RestEndpoints.WHO_AM_I}`,
    })
      .then((res) => {
        if (res.data) {
          setUserInfo({ data: res.data, isLoading: false })
        }
      })
      .catch((err) => {
        console.error('Login: ', err)
      })

    return () => {}
  }, [])

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
            gap={4}
            sx={{ width: '100%' }}>
            <Tooltip
              placement='right'
              title={open ? 'Close Menu' : 'Open Menu'}>
              <IconButton
                color='inherit'
                aria-label={open ? 'open menu' : 'close menu'}
                onClick={toggleDrawer}
                edge='start'
                sx={{ marginRight: 5 }}>
                {!open ? <MenuIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </Tooltip>

            <Typography
              variant='h6'
              textAlign='start'
              fontWeight='900'
              sx={{ flex: 1 }}>
              {`Khoa's Store`}
            </Typography>

            <Stack direction='row' alignItems='center' gap={2}>
              {userInfo.isLoading ? (
                <Skeleton width='100px' />
              ) : (
                <Fragment>
                  <Avatar
                    sx={{
                      backgroundColor: 'secondary.main',
                      border: '4px solid #fff',
                      fontWeight: '900',
                    }}>
                    {userInfo.data.name.charAt(0).toUpperCase()}
                  </Avatar>

                  <Typography variant='h6' fontWeight='600'>
                    {userInfo.data.name}
                  </Typography>
                </Fragment>
              )}
            </Stack>

            <LogoutBtn />
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer variant='permanent' open={open}>
        <DrawerHeader />

        <List>
          {MENU.map((item, index) => (
            <ListItem
              key={item.id}
              disablePadding
              sx={{
                display: 'block',
                backgroundColor:
                  location.pathname === item.link ||
                  `/${location.pathname.split('/')[1]}` === item.link
                    ? 'grey.300'
                    : 'unset',
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
          p: 2,
        }}>
        {children}
      </Box>
    </Box>
  )
}

export default MiniDrawer
