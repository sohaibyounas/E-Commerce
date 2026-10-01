import { useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Box, Avatar, Badge, Menu, MenuItem,
  Divider, Tooltip, InputBase, useTheme, Chip, useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon, Bell, Search, Sun, Moon, User, LogOut, Settings, X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../theme';

interface NavbarProps {
  onMenuClick: () => void;
  sidebarWidth?: number;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Navbar = ({ onMenuClick, sidebarWidth = 0, isCollapsed = false, onToggleCollapse }: NavbarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isDark = theme.palette.mode === 'dark';
  const { mode, toggleTheme } = useThemeMode();
  const navigate = useNavigate();
  const [userAnchor, setUserAnchor] = useState<null | HTMLElement>(null);
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

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
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        top: 0,
        right: 0,
        left: { xs: 0, md: `${sidebarWidth}px` },
        width: { xs: '100%', md: `calc(100% - ${sidebarWidth}px)` },
        transition: 'left 0.25s cubic-bezier(0.4, 0, 0.2, 1), width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        bgcolor: isDark ? 'rgba(28, 16, 4, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: isDark ? 'rgba(77, 42, 0, 0.4)' : 'rgba(238, 220, 189, 0.6)',
        color: 'text.primary',
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          px: { xs: 2, sm: 3, md: 3.5 },
          minHeight: { xs: 60, sm: 68 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left Section: Mobile Menu Toggle + Search */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.25, sm: 2 }, flex: { xs: 1, sm: 'auto' } }}>
          {/* Mobile hamburger menu toggle */}
          {isMobile ? (
            <Tooltip title="Open Menu">
              <IconButton
                onClick={onMenuClick}
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '10px',
                  color: '#F2A900',
                  bgcolor: isDark ? 'rgba(242, 169, 0, 0.12)' : 'rgba(204, 111, 0, 0.08)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: isDark ? 'rgba(242, 169, 0, 0.22)' : 'rgba(204, 111, 0, 0.15)',
                    transform: 'scale(1.03)',
                  },
                }}
              >
                <MenuIcon size={20} />
              </IconButton>
            </Tooltip>
          ) : onToggleCollapse ? (
            <Tooltip title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
              <IconButton
                onClick={onToggleCollapse}
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '10px',
                  color: isDark ? '#F2A900' : '#CC6F00',
                  bgcolor: isDark ? 'rgba(242, 169, 0, 0.1)' : 'rgba(204, 111, 0, 0.08)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: isDark ? 'rgba(242, 169, 0, 0.18)' : 'rgba(204, 111, 0, 0.14)',
                    transform: 'scale(1.03)',
                  },
                }}
              >
                <MenuIcon size={20} />
              </IconButton>
            </Tooltip>
          ) : null}

          {/* Search input field */}
          <Box
            sx={{
              display: { xs: mobileSearchOpen ? 'flex' : 'none', sm: 'flex' },
              alignItems: 'center',
              bgcolor: isDark ? 'rgba(77, 42, 0, 0.25)' : '#FAF7F0',
              border: '1px solid',
              borderColor: isDark ? 'rgba(242, 169, 0, 0.2)' : '#EBDCBF',
              borderRadius: '10px',
              px: 1.8,
              py: 0.5,
              minWidth: { sm: 240, md: 320 },
              transition: 'all 0.2s ease',
              '&:focus-within': {
                borderColor: 'primary.main',
                boxShadow: '0 0 0 3px rgba(242, 169, 0, 0.18)',
              },
            }}
          >
            <Search size={17} color={isDark ? '#F2A900' : '#CC6F00'} style={{ marginRight: 8, flexShrink: 0 }} />
            <InputBase
              placeholder="Search products, orders, customers..."
              sx={{
                width: '100%',
                fontSize: '0.84rem',
                color: 'text.primary',
                '& input::placeholder': { color: 'text.disabled', opacity: 1 },
              }}
            />
            {mobileSearchOpen && (
              <IconButton size="small" onClick={() => setMobileSearchOpen(false)} sx={{ p: 0.5, ml: 0.5 }}>
                <X size={15} />
              </IconButton>
            )}
          </Box>

          {/* Mobile search toggle icon */}
          {!mobileSearchOpen && (
            <IconButton
              onClick={() => setMobileSearchOpen(true)}
              sx={{
                display: { xs: 'flex', sm: 'none' },
                width: 38,
                height: 38,
                borderRadius: '10px',
                color: 'text.secondary',
                bgcolor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
                '&:hover': { color: 'primary.main' },
              }}
            >
              <Search size={18} />
            </IconButton>
          )}
        </Box>

        {/* Center Flex Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Right Section: Theme Toggle + Notifications + User Avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.25, sm: 1.75 } }}>
          {/* Theme mode toggle */}
          <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            <IconButton
              onClick={toggleTheme}
              sx={{
                width: { xs: 38, sm: 40 },
                height: { xs: 38, sm: 40 },
                borderRadius: '10px',
                color: isDark ? '#F2A900' : '#CC6F00',
                bgcolor: isDark ? 'rgba(242, 169, 0, 0.1)' : 'rgba(204, 111, 0, 0.08)',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: isDark ? 'rgba(242, 169, 0, 0.18)' : 'rgba(204, 111, 0, 0.14)',
                  transform: 'rotate(15deg)',
                },
              }}
            >
              {mode === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
            </IconButton>
          </Tooltip>

          {/* Notifications Icon with Badge */}
          <Tooltip title="Notifications">
            <IconButton
              onClick={handleNotifClick}
              sx={{
                width: { xs: 38, sm: 40 },
                height: { xs: 38, sm: 40 },
                borderRadius: '10px',
                color: isDark ? '#F9E6A8' : '#4D2A00',
                bgcolor: isDark ? 'rgba(77, 42, 0, 0.35)' : 'rgba(204, 111, 0, 0.08)',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: isDark ? 'rgba(77, 42, 0, 0.5)' : 'rgba(204, 111, 0, 0.15)',
                  transform: 'scale(1.03)',
                },
              }}
            >
              <Badge
                badgeContent={unread}
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: '#CC6F00',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '0.68rem',
                    height: 18,
                    minWidth: 18,
                    border: '2px solid',
                    borderColor: isDark ? '#1C1004' : '#FFFFFF',
                  },
                }}
              >
                <Bell size={19} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* User avatar button */}
          <Tooltip title="Account profile">
            <IconButton
              onClick={handleUserClick}
              sx={{
                p: 0,
                width: { xs: 38, sm: 40 },
                height: { xs: 38, sm: 40 },
                borderRadius: '50%',
                border: '2px solid #F2A900',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <Avatar
                sx={{
                  width: '100%',
                  height: '100%',
                  bgcolor: '#4D2A00',
                  color: '#F9E6A8',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                }}
              >
                JD
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        {/* Notifications Dropdown */}
        <Menu
          anchorEl={notifAnchor}
          open={Boolean(notifAnchor)}
          onClose={handleNotifClose}
          slotProps={{
            paper: {
              sx: {
                width: { xs: 290, sm: 340 },
                maxHeight: 420,
                mt: 1.5,
                borderRadius: '14px',
                boxShadow: '0 10px 30px rgba(77, 42, 0, 0.15)',
                border: '1px solid',
                borderColor: 'divider',
              },
            },
          }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                Notifications
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                You have {unread} unread updates
              </Typography>
            </Box>
            <Chip
              label={`${unread} new`}
              size="small"
              sx={{ bgcolor: '#F2A900', color: '#4D2A00', fontWeight: 700, height: 20 }}
            />
          </Box>

          {notifications.map((n) => (
            <MenuItem
              key={n.id}
              onClick={() => { navigate('/notifications'); handleNotifClose(); }}
              sx={{
                py: 1.4,
                px: 2,
                whiteSpace: 'normal',
                borderBottom: '1px solid',
                borderColor: 'divider',
                bgcolor: n.unread ? (isDark ? 'rgba(242, 169, 0, 0.05)' : 'rgba(249, 230, 168, 0.25)') : 'transparent',
                '&:hover': { bgcolor: isDark ? 'rgba(242, 169, 0, 0.1)' : 'rgba(249, 230, 168, 0.4)' },
              }}
            >
              <Box sx={{ display: 'flex', gap: 1.5, width: '100%', alignItems: 'flex-start' }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: n.unread ? '#F2A900' : 'transparent',
                    boxShadow: n.unread ? '0 0 6px #F2A900' : 'none',
                    mt: 0.8,
                    flexShrink: 0,
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: n.unread ? 700 : 500, color: 'text.primary', fontSize: '0.85rem' }}>
                    {n.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.3 }}>
                    {n.message}
                  </Typography>
                  <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 0.4, fontSize: '0.7rem' }}>
                    {n.time}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
          ))}

          <MenuItem
            onClick={() => { navigate('/notifications'); handleNotifClose(); }}
            sx={{
              justifyContent: 'center',
              py: 1.5,
              color: 'primary.main',
              fontWeight: 700,
              fontSize: '0.84rem',
              '&:hover': { bgcolor: isDark ? 'rgba(242, 169, 0, 0.08)' : 'rgba(204, 111, 0, 0.06)' },
            }}
          >
            View all notifications
          </MenuItem>
        </Menu>

        {/* User menu */}
        <Menu
          anchorEl={userAnchor}
          open={Boolean(userAnchor)}
          onClose={handleUserClose}
          slotProps={{
            paper: {
              sx: {
                minWidth: 220,
                mt: 1.5,
                borderRadius: '14px',
                boxShadow: '0 10px 30px rgba(77, 42, 0, 0.15)',
                border: '1px solid',
                borderColor: 'divider',
              },
            },
          }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Box sx={{ px: 2, py: 1.8, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
              John Doe
            </Typography>
            <Typography variant="caption" color="text.secondary">
              john.doe@example.com
            </Typography>
            <Chip
              label="Admin"
              size="small"
              sx={{
                display: 'block',
                width: 'fit-content',
                mt: 0.8,
                bgcolor: 'primary.light',
                color: 'primary.contrastText',
                fontWeight: 700,
                fontSize: '0.68rem',
                height: 20,
              }}
            />
          </Box>

          <MenuItem onClick={() => navigateTo('/profile')} sx={{ py: 1.2, gap: 1.5 }}>
            <User size={18} color="#CC6F00" />
            <Typography variant="body2">My Profile</Typography>
          </MenuItem>

          <MenuItem onClick={() => navigateTo('/settings')} sx={{ py: 1.2, gap: 1.5 }}>
            <Settings size={18} color="#CC6F00" />
            <Typography variant="body2">Account Settings</Typography>
          </MenuItem>

          <Divider sx={{ my: 0.5 }} />

          <MenuItem onClick={() => navigateTo('/login')} sx={{ py: 1.2, gap: 1.5, color: 'error.main' }}>
            <LogOut size={18} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>Sign Out</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
