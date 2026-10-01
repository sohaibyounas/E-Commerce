import { useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar, DRAWER_WIDTH, DRAWER_COLLAPSED_WIDTH } from './Sidebar';
import { Navbar } from './Navbar';

export const AppLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const currentSidebarWidth = isMobile ? 0 : (isCollapsed ? DRAWER_COLLAPSED_WIDTH : DRAWER_WIDTH);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%', bgcolor: 'background.default' }}>
      {/* Sidebar: permanent on desktop, drawer on mobile */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Main Content Area: sits right next to permanent drawer with 0px extra gap */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        {/* Fixed Header: dynamically attached to sidebar (left: sidebarWidth, width: calc(100% - sidebarWidth)) */}
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
          sidebarWidth={currentSidebarWidth}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />

        {/* Page Content: clearance for fixed header and matching horizontal padding */}
        <Box
          sx={{
            flexGrow: 1,
            px: { xs: 2, sm: 3, md: 3.5 },
            py: { xs: 2.5, sm: 3 },
            mt: { xs: '60px', sm: '68px' },
            minWidth: 0,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
