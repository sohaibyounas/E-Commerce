import { useState } from 'react';
import { Box, Toolbar, useTheme, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar, DRAWER_WIDTH } from './Sidebar';
import { Navbar } from './Navbar';

export const AppLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', ml: { md: `${DRAWER_WIDTH}px` }, minHeight: '100vh' }}>
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <Box sx={{ p: { xs: 2, sm: 3 }, minHeight: 'calc(100vh - 64px)', mt: '64px' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
