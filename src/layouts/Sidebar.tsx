import { useState } from 'react';
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Typography,
  Collapse, Divider, useTheme, useMediaQuery,
} from '@mui/material';
import {
  Dashboard, ShoppingBag, ReceiptLong, People, Category, Inventory,
  Notifications, Settings, Person, ExpandLess, ExpandMore,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { id: 'products', label: 'Products', icon: <ShoppingBag />, path: '/products' },
  { id: 'orders', label: 'Orders', icon: <ReceiptLong />, path: '/orders' },
  { id: 'customers', label: 'Customers', icon: <People />, path: '/customers' },
  { id: 'categories', label: 'Categories', icon: <Category />, path: '/categories' },
  { id: 'inventory', label: 'Inventory', icon: <Inventory />, path: '/inventory' },
  { id: 'notifications', label: 'Notifications', icon: <Notifications />, path: '/notifications', badge: 3 },
  { id: 'settings', label: 'Settings', icon: <Settings />, path: '/settings' },
  { id: 'profile', label: 'Profile', icon: <Person />, path: '/profile' },
];

const DRAWER_WIDTH = 260;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export const Sidebar = ({ open, onClose }: SidebarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleToggleExpand = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile) onClose();
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h5" fontWeight={700} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ShoppingBag color="primary" />
          EcomDash
        </Typography>
        <Typography variant="caption" color="text.secondary">Admin Dashboard</Typography>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', py: 2 }}>
        <List disablePadding>
          {NAV_ITEMS.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ px: 1.5 }}>
              <ListItemButton onClick={() => handleNavigate(item.path)} selected={location.pathname === item.path} sx={{ borderRadius: 1.5, mb: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
                {item.badge && (
                  <Box sx={{ bgcolor: 'error.main', color: 'white', borderRadius: 10, px: 1, py: 0.25, mr: 0.5 }}>
                    <Typography variant="caption" fontWeight={600}>{item.badge}</Typography>
                  </Box>
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="caption" color="text.secondary">Version 1.0.0</Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <Drawer anchor="left" open={open} onClose={onClose} ModalProps={{ keepMounted: true }} PaperProps={{ sx: { width: DRAWER_WIDTH } }}>{drawerContent}</Drawer>
      ) : (
        <Drawer variant="permanent" PaperProps={{ sx: { width: DRAWER_WIDTH, borderRight: '1px solid', borderColor: 'divider' } }}>{drawerContent}</Drawer>
      )}
    </>
  );
};

export { DRAWER_WIDTH };
