import { useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, Switch, FormControlLabel, Divider, Button, TextField, FormControl, InputLabel, Select, MenuItem, Avatar, List, ListItem, ListItemText, ListItemSecondaryAction, Tab, Tabs, Alert } from '@mui/material';
import { PageHeader } from '../../components/common';
import { useThemeMode } from '../../theme';

export const SettingsPage = () => {
  const [tab, setTab] = useState(0);
  const { mode, setMode } = useThemeMode();
  const [settings, setSettings] = useState({
    emailNotifications: true, orderAlerts: true, stockAlerts: true, marketingEmails: false, weeklyReport: true, twoFactor: false, sessionTimeout: '30', language: 'en', timezone: 'America/Los_Angeles', currency: 'USD', dateFormat: 'MM/DD/YYYY',
  });

  return (
    <Box>
      <PageHeader title="Settings" subtitle="Manage your application preferences" />

      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="General" />
          <Tab label="Notifications" />
          <Tab label="Security" />
          <Tab label="Appearance" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {tab === 0 && (
            <Box sx={{ maxWidth: 600 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>General Settings</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Configure your regional and display preferences</Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}><FormControl fullWidth><InputLabel>Language</InputLabel><Select value={settings.language} label="Language" onChange={(e) => setSettings({ ...settings, language: e.target.value })}><MenuItem value="en">English</MenuItem><MenuItem value="es">Spanish</MenuItem><MenuItem value="fr">French</MenuItem><MenuItem value="de">German</MenuItem></Select></FormControl></Grid>
                <Grid size={{ xs: 12, sm: 6 }}><FormControl fullWidth><InputLabel>Timezone</InputLabel><Select value={settings.timezone} label="Timezone" onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}><MenuItem value="America/New_York">Eastern Time</MenuItem><MenuItem value="America/Chicago">Central Time</MenuItem><MenuItem value="America/Denver">Mountain Time</MenuItem><MenuItem value="America/Los_Angeles">Pacific Time</MenuItem></Select></FormControl></Grid>
                <Grid size={{ xs: 12, sm: 6 }}><FormControl fullWidth><InputLabel>Currency</InputLabel><Select value={settings.currency} label="Currency" onChange={(e) => setSettings({ ...settings, currency: e.target.value })}><MenuItem value="USD">USD ($)</MenuItem><MenuItem value="EUR">EUR</MenuItem><MenuItem value="GBP">GBP</MenuItem></Select></FormControl></Grid>
                <Grid size={{ xs: 12, sm: 6 }}><FormControl fullWidth><InputLabel>Date Format</InputLabel><Select value={settings.dateFormat} label="Date Format" onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value })}><MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem><MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem><MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem></Select></FormControl></Grid>
              </Grid>
              <Divider sx={{ my: 3 }} />
              <Button variant="contained" sx={{ mr: 1 }}>Save Changes</Button><Button variant="outlined">Reset to Defaults</Button>
            </Box>
          )}

          {tab === 1 && (
            <Box sx={{ maxWidth: 600 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>Notification Preferences</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Choose how you want to be notified</Typography>
              <List>
                <ListItem divider><ListItemText primary="Email Notifications" secondary="Receive email notifications for important updates" /><ListItemSecondaryAction><Switch checked={settings.emailNotifications} onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })} /></ListItemSecondaryAction></ListItem>
                <ListItem divider><ListItemText primary="Order Alerts" secondary="Get notified when new orders are placed" /><ListItemSecondaryAction><Switch checked={settings.orderAlerts} onChange={(e) => setSettings({ ...settings, orderAlerts: e.target.checked })} /></ListItemSecondaryAction></ListItem>
                <ListItem divider><ListItemText primary="Stock Alerts" secondary="Receive alerts when stock is low" /><ListItemSecondaryAction><Switch checked={settings.stockAlerts} onChange={(e) => setSettings({ ...settings, stockAlerts: e.target.checked })} /></ListItemSecondaryAction></ListItem>
                <ListItem divider><ListItemText primary="Weekly Report" secondary="Receive a weekly summary of your store performance" /><ListItemSecondaryAction><Switch checked={settings.weeklyReport} onChange={(e) => setSettings({ ...settings, weeklyReport: e.target.checked })} /></ListItemSecondaryAction></ListItem>
                <ListItem><ListItemText primary="Marketing Emails" secondary="Receive marketing tips and product updates" /><ListItemSecondaryAction><Switch checked={settings.marketingEmails} onChange={(e) => setSettings({ ...settings, marketingEmails: e.target.checked })} /></ListItemSecondaryAction></ListItem>
              </List>
              <Divider sx={{ my: 3 }} />
              <Button variant="contained">Save Preferences</Button>
            </Box>
          )}

          {tab === 2 && (
            <Box sx={{ maxWidth: 600 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>Security Settings</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Manage your account security</Typography>
              <Alert severity="info" sx={{ mb: 3 }}>Your password was last changed 30 days ago.</Alert>
              <List>
                <ListItem divider sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <ListItemText primary="Two-Factor Authentication" secondary="Add an extra layer of security to your account" sx={{ mb: 1 }} />
                  <Button variant="outlined" size="small">{settings.twoFactor ? 'Disable 2FA' : 'Enable 2FA'}</Button>
                </ListItem>
                <ListItem divider sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <ListItemText primary="Session Timeout" secondary="Automatically log out after inactivity" sx={{ mb: 1 }} />
                  <FormControl size="small" sx={{ minWidth: 150 }}><Select value={settings.sessionTimeout} onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}><MenuItem value="15">15 minutes</MenuItem><MenuItem value="30">30 minutes</MenuItem><MenuItem value="60">1 hour</MenuItem><MenuItem value="0">Never</MenuItem></Select></FormControl>
                </ListItem>
                <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <ListItemText primary="Active Sessions" secondary="Manage your active login sessions" sx={{ mb: 1 }} />
                  <Button variant="outlined" color="error" size="small">Sign out all other sessions</Button>
                </ListItem>
              </List>
              <Divider sx={{ my: 3 }} />
              <Button variant="contained">Save Settings</Button>
            </Box>
          )}

          {tab === 3 && (
            <Box sx={{ maxWidth: 600 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>Appearance</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Customize the look and feel</Typography>
              <Typography variant="subtitle2" gutterBottom>Theme</Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {(['light', 'dark'] as const).map((themeMode) => (
                  <Grid key={themeMode} size={{ xs: 6, sm: 4 }}>
                    <Card elevation={0} sx={{ border: '2px solid', borderColor: mode === themeMode ? 'primary.main' : 'divider', cursor: 'pointer', p: 2, textAlign: 'center', borderRadius: 2, '&:hover': { borderColor: 'primary.light' } }} onClick={() => setMode(themeMode)}>
                      <Box sx={{ width: '100%', height: 60, borderRadius: 1, mb: 1, bgcolor: themeMode === 'light' ? '#f8fafc' : '#0f172a', border: '1px solid', borderColor: 'divider' }} />
                      <Typography variant="body2" textTransform="capitalize">{themeMode}</Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Divider sx={{ my: 3 }} />
              <Button variant="contained">Save Appearance</Button>
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  );
};
