import { useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Box, Avatar, Badge, Menu, MenuItem,
  Divider, ListItemIcon, Tooltip, InputBase, useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon, Notifications, Search, DarkMode, LightMode, Person, Logout, Settings,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../theme';
import { DRAWER_WIDTH } from './Sidebar';

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeMode();
  const navigate = useNavigate();
  const [userAnchor, setUserAnchor] = useState<null | HTMLElement>(null);
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);

  const handleUserClick = (e: React.MouseEvent<HTMLElement>) => setUserAnchor(e.currentTarget);
  const handleUserClose = () => setUserAnchor(null);
  const handleNotifClick = (e: React.MouseEvent<HTMLElement>) => setNotifAnchor(e.currentTarget);
  const handleNotifClose = () => setNotifAnchor(null);

  const navigateTo = (path: string) => {
    navigate(path);
    handleUserClose();
  };

  const notifications = [
    { id: 1, title: 'New Order', message: 'Order #ORD-004 received', time: '2m ago', unread: true },
    { id: 2, title: 'Low Stock', message: 'Power Bank out of stock', time: '1h ago', unread: true },
    { id: 3, title: 'Review', message: 'New 5-star review', time: '3h ago', unread: true },
    { id: 4, title: 'Order Shipped', message: 'Order #ORD-002 shipped', time: '5h ago', unread: false },
  ];

  const unread = notifications.filter((n) => n.unread).length;

  return (
    <AppBar position="fixed" color="transparent" elevation={0} sx={{ ml: { md: `${DRAWER_WIDTH}px` }, width: { md: `calc(100% - ${DRAWER_WIDTH}px)` }, bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>
      <Toolbar sx={{ gap: 2 }}>
        <IconButton edge="start" color="inherit" onClick={onMenuClick} sx={{ display: { md: 'none' } }}><MenuIcon /></IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'grey.100', borderRadius: 2, px: 2, py: 0.5, flex: { xs: 1, sm: 0 }, maxWidth: { sm: 300 } }}>
          <Search sx={{ color: 'text.disabled', mr: 1 }} />
          <InputBase placeholder="Search..." sx={{ width: '100%' }} />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Tooltip title="Toggle theme">
          <IconButton onClick={toggleTheme}>{mode === 'dark' ? <LightMode /> : <DarkMode />}</IconButton>
        </Tooltip>

        <Tooltip title="Notifications">
          <IconButton onClick={handleNotifClick}>
            <Badge badgeContent={unread} color="error"><Notifications /></Badge>
          </IconButton>
        </Tooltip>

        <Menu anchorEl={notifAnchor} open={Boolean(notifAnchor)} onClose={handleNotifClose} PaperProps={{ sx: { width: 320, maxHeight: 400 } }} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1" fontWeight={600}>Notifications</Typography>
            <Typography variant="caption" color="text.secondary">{unread} unread</Typography>
          </Box>
          {notifications.map((n) => (
            <MenuItem key={n.id} onClick={() => { navigate('/notifications'); handleNotifClose(); }} sx={{ py: 1.5, whiteSpace: 'normal' }}>
              <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: n.unread ? 'primary.main' : 'transparent', mt: 1 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight={600}>{n.title}</Typography>
                  <Typography variant="caption" color="text.secondary">{n.message}</Typography>
                  <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 0.5 }}> {n.time}</Typography>
                </Box>
              </Box>
            </MenuItem>
          ))}
          <Divider />
          <MenuItem onClick={() => { navigate('/notifications'); handleNotifClose(); }} sx={{ justifyContent: 'center' }}><Typography variant="body2" color="primary">View all notifications</Typography></MenuItem>
        </Menu>

        <Tooltip title="Account">
          <IconButton onClick={handleUserClick}><Avatar sx={{ bgcolor: 'primary.main' }}>JD</Avatar></IconButton>
        </Tooltip>

        <Menu anchorEl={userAnchor} open={Boolean(userAnchor)} onClose={handleUserClose} PaperProps={{ sx: { minWidth: 200 } }} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle2" fontWeight={600}>John Doe</Typography>
            <Typography variant="caption" color="text.secondary">admin@ecomdash.com</Typography>
          </Box>
          <MenuItem onClick={() => navigateTo('/profile')}><ListItemIcon><Person fontSize="small" /></ListItemIcon>Profile</MenuItem>
          <MenuItem onClick={() => navigateTo('/settings')}><ListItemIcon><Settings fontSize="small" /></ListItemIcon>Settings</MenuItem>
          <Divider />
          <MenuItem onClick={() => navigate('/login')}><ListItemIcon><Logout fontSize="small" /></ListItemIcon>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
