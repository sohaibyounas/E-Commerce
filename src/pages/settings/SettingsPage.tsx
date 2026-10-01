import { useState } from 'react';
import {
  Box, Card, Typography, Grid, Switch, Divider, Button, FormControl,
  InputLabel, Select, MenuItem, List, ListItem, ListItemText, ListItemSecondaryAction,
  Tab, Tabs, Alert, useTheme,
} from '@mui/material';
import { Check } from 'lucide-react';
import { PageHeader } from '../../components/common';
import { useThemeMode } from '../../theme';

export const SettingsPage = () => {
  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { mode, setMode } = useThemeMode();

  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderAlerts: true,
    stockAlerts: true,
    marketingEmails: false,
    weeklyReport: true,
    twoFactor: false,
    sessionTimeout: '30',
    language: 'en',
    timezone: 'America/Los_Angeles',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
  });

  return (
    <Box>
      <PageHeader title="Settings" subtitle="Manage store preferences, security protocols, and visual themes" />

      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}>
        <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', px: 2 }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': { fontWeight: 600, minHeight: 48 },
              '& .Mui-selected': { color: 'primary.main' },
            }}
          >
            <Tab label="General" />
            <Tab label="Notifications" />
            <Tab label="Security" />
            <Tab label="Appearance & Theme" />
          </Tabs>
        </Box>

        <Box sx={{ p: { xs: 2, sm: 3.5 } }}>
          {tab === 0 && (
            <Box sx={{ maxWidth: 640 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>General Preferences</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Configure localized store currency, timezone and calendar formats
              </Typography>
              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Language</InputLabel>
                    <Select value={settings.language} label="Language" onChange={(e) => setSettings({ ...settings, language: e.target.value })}>
                      <MenuItem value="en">English (US)</MenuItem>
                      <MenuItem value="es">Spanish</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                      <MenuItem value="de">German</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Timezone</InputLabel>
                    <Select value={settings.timezone} label="Timezone" onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}>
                      <MenuItem value="America/New_York">Eastern Time (ET)</MenuItem>
                      <MenuItem value="America/Chicago">Central Time (CT)</MenuItem>
                      <MenuItem value="America/Denver">Mountain Time (MT)</MenuItem>
                      <MenuItem value="America/Los_Angeles">Pacific Time (PT)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Currency</InputLabel>
                    <Select value={settings.currency} label="Currency" onChange={(e) => setSettings({ ...settings, currency: e.target.value })}>
                      <MenuItem value="USD">USD ($)</MenuItem>
                      <MenuItem value="EUR">EUR (€)</MenuItem>
                      <MenuItem value="GBP">GBP (£)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Date Format</InputLabel>
                    <Select value={settings.dateFormat} label="Date Format" onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value })}>
                      <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                      <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                      <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Divider sx={{ my: 3 }} />
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                <Button variant="contained">Save Changes</Button>
                <Button variant="outlined">Reset to Defaults</Button>
              </Box>
            </Box>
          )}

          {tab === 1 && (
            <Box sx={{ maxWidth: 640 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>Notification Preferences</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Control which email alerts and instant browser messages are dispatched
              </Typography>
              <List disablePadding>
                <ListItem divider sx={{ py: 1.5, px: 0 }}>
                  <ListItemText primary={<Typography sx={{ fontWeight: 600 }}>Email Notifications</Typography>} secondary="Receive transactional email summaries" />
                  <ListItemSecondaryAction>
                    <Switch color="primary" checked={settings.emailNotifications} onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })} />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem divider sx={{ py: 1.5, px: 0 }}>
                  <ListItemText primary={<Typography sx={{ fontWeight: 600 }}>Order Alerts</Typography>} secondary="Get real-time push notice when new orders are placed" />
                  <ListItemSecondaryAction>
                    <Switch color="primary" checked={settings.orderAlerts} onChange={(e) => setSettings({ ...settings, orderAlerts: e.target.checked })} />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem divider sx={{ py: 1.5, px: 0 }}>
                  <ListItemText primary={<Typography sx={{ fontWeight: 600 }}>Stock Depletion Alerts</Typography>} secondary="Urgent alerts when items hit reorder thresholds" />
                  <ListItemSecondaryAction>
                    <Switch color="primary" checked={settings.stockAlerts} onChange={(e) => setSettings({ ...settings, stockAlerts: e.target.checked })} />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem divider sx={{ py: 1.5, px: 0 }}>
                  <ListItemText primary={<Typography sx={{ fontWeight: 600 }}>Weekly Digest Report</Typography>} secondary="Weekly performance revenue breakdown PDF" />
                  <ListItemSecondaryAction>
                    <Switch color="primary" checked={settings.weeklyReport} onChange={(e) => setSettings({ ...settings, weeklyReport: e.target.checked })} />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem sx={{ py: 1.5, px: 0 }}>
                  <ListItemText primary={<Typography sx={{ fontWeight: 600 }}>Marketing & Growth Tips</Typography>} secondary="Feature updates and store growth best practices" />
                  <ListItemSecondaryAction>
                    <Switch color="primary" checked={settings.marketingEmails} onChange={(e) => setSettings({ ...settings, marketingEmails: e.target.checked })} />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
              <Divider sx={{ my: 3 }} />
              <Button variant="contained">Save Preferences</Button>
            </Box>
          )}

          {tab === 2 && (
            <Box sx={{ maxWidth: 640 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>Security Controls</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Configure session lifetimes and multi-factor authentication
              </Typography>
              <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                Your account password was last rotated 30 days ago.
              </Alert>
              <List disablePadding>
                <ListItem divider sx={{ flexDirection: 'column', alignItems: 'flex-start', py: 2, px: 0 }}>
                  <ListItemText primary={<Typography sx={{ fontWeight: 600 }}>Two-Factor Authentication</Typography>} secondary="Mandate authenticator code for administrative login" sx={{ mb: 1.5 }} />
                  <Button variant="outlined" size="small" sx={{ color: 'primary.main', borderColor: 'primary.main' }}>
                    {settings.twoFactor ? 'Disable 2FA' : 'Enable 2FA'}
                  </Button>
                </ListItem>
                <ListItem divider sx={{ flexDirection: 'column', alignItems: 'flex-start', py: 2, px: 0 }}>
                  <ListItemText primary={<Typography sx={{ fontWeight: 600 }}>Inactivity Session Timeout</Typography>} secondary="Automatically lock dashboard after idle period" sx={{ mb: 1.5 }} />
                  <FormControl size="small" sx={{ minWidth: 160 }}>
                    <Select value={settings.sessionTimeout} onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}>
                      <MenuItem value="15">15 minutes</MenuItem>
                      <MenuItem value="30">30 minutes</MenuItem>
                      <MenuItem value="60">1 hour</MenuItem>
                      <MenuItem value="0">Never</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
                <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start', py: 2, px: 0 }}>
                  <ListItemText primary={<Typography sx={{ fontWeight: 600 }}>Active Remote Sessions</Typography>} secondary="Invalidate tokens on all other mobile/desktop devices" sx={{ mb: 1.5 }} />
                  <Button variant="outlined" color="error" size="small">
                    Sign out all other sessions
                  </Button>
                </ListItem>
              </List>
            </Box>
          )}

          {tab === 3 && (
            <Box sx={{ maxWidth: 640 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>Appearance & Theme</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Customize your color scheme according to the Amber & Espresso luxury palette
              </Typography>

              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
                Display Theme
              </Typography>
              <Grid container spacing={2.5} sx={{ mb: 3 }}>
                {[
                  {
                    modeKey: 'light' as const,
                    name: 'Golden Light',
                    bg: '#FAF7F0',
                    cardBg: '#FFFFFF',
                    accent: '#CC6F00',
                    border: '#EEDCBD',
                  },
                  {
                    modeKey: 'dark' as const,
                    name: 'Espresso Dark',
                    bg: '#1E1205',
                    cardBg: '#2C1B0A',
                    accent: '#F2A900',
                    border: '#4D2A00',
                  },
                ].map((item) => {
                  const isSelected = mode === item.modeKey;
                  return (
                    <Grid key={item.modeKey} size={{ xs: 12, sm: 6 }}>
                      <Card
                        elevation={0}
                        onClick={() => setMode(item.modeKey)}
                        sx={{
                          border: isSelected ? '2px solid #F2A900' : '1px solid',
                          borderColor: isSelected ? '#F2A900' : 'divider',
                          cursor: 'pointer',
                          p: 2,
                          borderRadius: 3,
                          transition: 'all 0.2s ease',
                          bgcolor: isDark ? 'rgba(77, 42, 0, 0.2)' : '#FAF7F0',
                          '&:hover': { borderColor: '#F2A900', transform: 'translateY(-2px)' },
                        }}
                      >
                        <Box
                          sx={{
                            height: 70,
                            borderRadius: 2,
                            p: 1.5,
                            mb: 1.5,
                            bgcolor: item.bg,
                            border: `1px solid ${item.border}`,
                            display: 'flex',
                            gap: 1,
                            alignItems: 'center',
                          }}
                        >
                          <Box sx={{ width: 24, height: '100%', borderRadius: 1, bgcolor: item.accent }} />
                          <Box sx={{ flex: 1, height: '100%', borderRadius: 1, bgcolor: item.cardBg, p: 0.8, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <Box sx={{ width: '60%', height: 4, borderRadius: 1, bgcolor: item.accent }} />
                            <Box sx={{ width: '40%', height: 4, borderRadius: 1, bgcolor: item.border }} />
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {item.name}
                          </Typography>
                          {isSelected && <Check size={18} color="#F2A900" />}
                        </Box>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  );
};
