import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Typography,
  IconButton, useTheme, useMediaQuery, Chip, Tooltip,
} from '@mui/material';
import {
  LayoutDashboard, ShoppingBag, Receipt, Users, FolderTree, Boxes,
  Bell, Settings, User, X, ChevronRight, ChevronLeft,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'products', label: 'Products', icon: ShoppingBag, path: '/products' },
  { id: 'orders', label: 'Orders', icon: Receipt, path: '/orders', badge: 8 },
  { id: 'customers', label: 'Customers', icon: Users, path: '/customers' },
  { id: 'categories', label: 'Categories', icon: FolderTree, path: '/categories' },
  { id: 'inventory', label: 'Inventory', icon: Boxes, path: '/inventory' },
  { id: 'notifications', label: 'Notifications', icon: Bell, path: '/notifications', badge: 3 },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
];

export const DRAWER_WIDTH = 220;
export const DRAWER_COLLAPSED_WIDTH = 68;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar = ({ open, onClose, isCollapsed = false, onToggleCollapse }: SidebarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isDark = theme.palette.mode === 'dark';
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile) onClose();
  };

  const currentWidth = isMobile ? DRAWER_WIDTH : (isCollapsed ? DRAWER_COLLAPSED_WIDTH : DRAWER_WIDTH);

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: isDark ? '#1C1004' : '#4D2A00',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient gold gradient glow */}
      <Box
        sx={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 140,
          height: 140,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(242, 169, 0, 0.2) 0%, rgba(204, 111, 0, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Brand Header */}
      <Box
        sx={{
          py: 2,
          px: isCollapsed && !isMobile ? 1 : 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed && !isMobile ? 'center' : 'space-between',
          borderBottom: '1px solid rgba(249, 230, 168, 0.12)',
          minHeight: 64,
          zIndex: 1,
        }}
      >
        <Box
          component={motion.div}
          whileHover={{ scale: 1.02 }}
          onClick={() => handleNavigate('/dashboard')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.2,
            cursor: 'pointer',
            justifyContent: isCollapsed && !isMobile ? 'center' : 'flex-start',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #F9E6A8 0%, #F2A900 50%, #CC6F00 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 3px 10px rgba(242, 169, 0, 0.35)',
              flexShrink: 0,
            }}
          >
            <ShoppingBag size={19} color="#4D2A00" strokeWidth={2.4} />
          </Box>

          {(!isCollapsed || isMobile) && (
            <Box sx={{ overflow: 'hidden' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: '0.01em',
                    color: '#FFFFFF',
                    lineHeight: 1.2,
                    fontSize: '1rem',
                  }}
                >
                  Ecom<span style={{ color: '#F2A900' }}>Dash</span>
                </Typography>
                <Chip
                  label="PRO"
                  size="small"
                  sx={{
                    height: 16,
                    fontSize: '0.58rem',
                    fontWeight: 800,
                    bgcolor: '#F2A900',
                    color: '#4D2A00',
                    px: 0.2,
                  }}
                />
              </Box>
              <Typography variant="caption" sx={{ color: 'rgba(249, 230, 168, 0.7)', fontSize: '0.68rem', display: 'block', lineHeight: 1 }}>
                Commerce Suite
              </Typography>
            </Box>
          )}
        </Box>

        {isMobile && (
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: 'rgba(249, 230, 168, 0.8)',
              bgcolor: 'rgba(255, 255, 255, 0.08)',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.15)' },
            }}
          >
            <X size={18} />
          </IconButton>
        )}
      </Box>

      {/* Nav Items List */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          px: isCollapsed && !isMobile ? 1 : 1.5,
          py: 1.5,
          zIndex: 1,
          '&::-webkit-scrollbar': { width: 4 },
          '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(249, 230, 168, 0.2)', borderRadius: 2 },
        }}
      >
        {(!isCollapsed || isMobile) && (
          <Typography
            variant="caption"
            sx={{
              px: 1.2,
              mb: 1,
              display: 'block',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(249, 230, 168, 0.45)',
              fontSize: '0.64rem',
            }}
          >
            Navigation
          </Typography>
        )}

        <List disablePadding>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isSelected = location.pathname === item.path ||
              (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

            const buttonContent = (
              <ListItemButton
                onClick={() => handleNavigate(item.path)}
                sx={{
                  position: 'relative',
                  borderRadius: '10px',
                  py: 1,
                  px: isCollapsed && !isMobile ? 1 : 1.4,
                  justifyContent: isCollapsed && !isMobile ? 'center' : 'flex-start',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                  bgcolor: isSelected ? 'rgba(242, 169, 0, 0.18)' : 'transparent',
                  border: isSelected ? '1px solid rgba(242, 169, 0, 0.35)' : '1px solid transparent',
                  '&:hover': {
                    bgcolor: isSelected ? 'rgba(242, 169, 0, 0.24)' : 'rgba(255, 255, 255, 0.06)',
                  },
                }}
              >
                {/* Active Indicator Bar */}
                {isSelected && (
                  <Box
                    component={motion.div}
                    layoutId="activeNavIndicator"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    sx={{
                      position: 'absolute',
                      left: 0,
                      top: '20%',
                      height: '60%',
                      width: 3.5,
                      borderRadius: '0 4px 4px 0',
                      bgcolor: '#F2A900',
                      boxShadow: '0 0 8px #F2A900',
                    }}
                  />
                )}

                <ListItemIcon
                  sx={{
                    minWidth: isCollapsed && !isMobile ? 'auto' : 32,
                    color: isSelected ? '#F2A900' : 'rgba(249, 230, 168, 0.75)',
                    justifyContent: 'center',
                    transition: 'color 0.2s ease',
                  }}
                >
                  <Icon size={19} strokeWidth={isSelected ? 2.3 : 1.8} />
                </ListItemIcon>

                {(!isCollapsed || isMobile) && (
                  <>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontSize: '0.84rem',
                            fontWeight: isSelected ? 700 : 500,
                            color: isSelected ? '#FFFFFF' : 'rgba(249, 230, 168, 0.85)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.label}
                        </Typography>
                      }
                    />

                    {item.badge ? (
                      <Box
                        sx={{
                          bgcolor: '#CC6F00',
                          color: '#FFFFFF',
                          borderRadius: '10px',
                          px: 0.8,
                          py: 0.1,
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          border: '1px solid rgba(249, 230, 168, 0.3)',
                          boxShadow: '0 2px 6px rgba(204, 111, 0, 0.35)',
                        }}
                      >
                        {item.badge}
                      </Box>
                    ) : isSelected ? (
                      <ChevronRight size={14} color="#F2A900" />
                    ) : null}
                  </>
                )}
              </ListItemButton>
            );

            return (
              <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
                {isCollapsed && !isMobile ? (
                  <Tooltip title={item.label} placement="right" arrow>
                    <Box sx={{ width: '100%' }}>{buttonContent}</Box>
                  </Tooltip>
                ) : (
                  buttonContent
                )}
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Collapse Desktop Toggle Button (Only on Desktop) */}
      {!isMobile && onToggleCollapse && (
        <Box
          sx={{
            px: isCollapsed ? 1 : 1.5,
            py: 1,
            borderTop: '1px solid rgba(249, 230, 168, 0.08)',
            display: 'flex',
            justifyContent: isCollapsed ? 'center' : 'flex-end',
            zIndex: 1,
          }}
        >
          <Tooltip title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'} placement="right" arrow>
            <IconButton
              onClick={onToggleCollapse}
              size="small"
              sx={{
                color: 'rgba(249, 230, 168, 0.7)',
                bgcolor: 'rgba(255, 255, 255, 0.04)',
                '&:hover': {
                  color: '#F2A900',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {/* User profile bottom footer */}
      <Box
        sx={{
          p: isCollapsed && !isMobile ? 1.2 : 1.5,
          borderTop: '1px solid rgba(249, 230, 168, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed && !isMobile ? 'center' : 'space-between',
          zIndex: 1,
          bgcolor: 'rgba(0, 0, 0, 0.12)',
        }}
      >
        <Box
          onClick={() => handleNavigate('/profile')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.2,
            cursor: 'pointer',
            flex: 1,
            minWidth: 0,
            justifyContent: isCollapsed && !isMobile ? 'center' : 'flex-start',
          }}
        >
          <Tooltip title={isCollapsed && !isMobile ? 'John Doe (Store Admin)' : ''} placement="right" arrow>
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                bgcolor: '#F2A900',
                color: '#4D2A00',
                fontWeight: 800,
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #F9E6A8',
                flexShrink: 0,
              }}
            >
              JD
            </Box>
          </Tooltip>

          {(!isCollapsed || isMobile) && (
            <Box sx={{ minWidth: 0, overflow: 'hidden' }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                John Doe
              </Typography>
              <Typography variant="caption" sx={{ color: '#F9E6A8', opacity: 0.75, fontSize: '0.68rem', display: 'block', lineHeight: 1 }}>
                Store Admin
              </Typography>
            </Box>
          )}
        </Box>

        {(!isCollapsed || isMobile) && (
          <IconButton
            onClick={() => handleNavigate('/settings')}
            size="small"
            sx={{
              color: 'rgba(249, 230, 168, 0.8)',
              '&:hover': { color: '#F2A900', bgcolor: 'rgba(255, 255, 255, 0.08)' },
            }}
          >
            <Settings size={16} />
          </IconButton>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          anchor="left"
          open={open}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          slotProps={{
            backdrop: {
              sx: {
                backdropFilter: 'blur(4px)',
                bgcolor: 'rgba(77, 42, 0, 0.45)',
              },
            },
            paper: {
              sx: {
                width: DRAWER_WIDTH,
                border: 'none',
                boxShadow: '8px 0 32px rgba(77, 42, 0, 0.5)',
              },
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: currentWidth,
            flexShrink: 0,
            transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            '& .MuiDrawer-paper': {
              width: currentWidth,
              boxSizing: 'border-box',
              borderRight: '1px solid',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(77, 42, 0, 0.1)',
              boxShadow: '2px 0 16px rgba(77, 42, 0, 0.04)',
              transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              overflowX: 'hidden',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};
