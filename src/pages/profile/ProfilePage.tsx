import { useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, Avatar, Button, TextField, Divider, Tab, Tabs, Chip, List, ListItem, ListItemText, ListItemIcon, Alert } from '@mui/material';
import { Edit, PhotoCamera, Email, Phone, LocationOn, Lock, Link, Google, Microsoft } from '@mui/icons-material';
import { PageHeader } from '../../components/common';

export const ProfilePage = () => {
  const [tab, setTab] = useState(0);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: 'John Doe', email: 'admin@ecomdash.com', phone: '+1 (555) 123-4567', bio: '' });

  const connectedAccounts = [
    { id: 'google', name: 'Google', icon: <Google />, connected: true, email: 'john.doe@gmail.com' },
    { id: 'microsoft', name: 'Microsoft', icon: <Microsoft />, connected: false, email: '' },
  ];

  return (
    <Box>
      <PageHeader title="Profile" subtitle="Manage your account information" />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', mb: 3 }}>
            <CardContent sx={{ pt: 4 }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                <Avatar sx={{ width: 120, height: 120, bgcolor: 'primary.main', fontSize: 48 }}>JD</Avatar>
                <Button variant="contained" size="small" sx={{ position: 'absolute', bottom: 0, right: 0, borderRadius: '50%', minWidth: 32, height: 32, p: 0 }}><PhotoCamera sx={{ fontSize: 18 }} /></Button>
              </Box>
              <Typography variant="h5" fontWeight={600}>{form.name}</Typography>
              <Typography variant="body2" color="text.secondary">Administrator</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
                <Chip label="Admin" color="primary" size="small" />
                <Chip label="Verified" color="success" size="small" />
              </Box>
            </CardContent>
          </Card>

          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Quick Info</Typography>
              <List disablePadding>
                <ListItem disablePadding sx={{ py: 1 }}><ListItemIcon><Email fontSize="small" /></ListItemIcon><ListItemText primary={form.email} /></ListItem>
                <ListItem disablePadding sx={{ py: 1 }}><ListItemIcon><Phone fontSize="small" /></ListItemIcon><ListItemText primary={form.phone} /></ListItem>
                <ListItem disablePadding sx={{ py: 1 }}><ListItemIcon><LocationOn fontSize="small" /></ListItemIcon><ListItemText primary="San Francisco, CA" /></ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
            <Tabs value={tab} onChange={(_, v) => setTab(v)}>
              <Tab label="Personal Info" />
              <Tab label="Security" />
              <Tab label="Connected Accounts" />
            </Tabs>

            <Box sx={{ p: 3 }}>
              {tab === 0 && (
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  {!editing && <Alert severity="info">Click Edit to update your profile information</Alert>}
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}><TextField label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth disabled={!editing} /></Grid>
                    <Grid size={{ xs: 12, sm: 6 }}><TextField label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} fullWidth disabled={!editing} /></Grid>
                    <Grid size={{ xs: 12, sm: 6 }}><TextField label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} fullWidth disabled={!editing} /></Grid>
                    <Grid size={{ xs: 12, sm: 6 }}><TextField label="Location" value="San Francisco, CA" fullWidth disabled={!editing} /></Grid>
                    <Grid size={{ xs: 12 }}><TextField label="Bio" multiline rows={3} placeholder="Tell us about yourself..." value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} fullWidth disabled={!editing} /></Grid>
                  </Grid>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    {editing ? (
                      <>
                        <Button variant="outlined" onClick={() => setEditing(false)}>Cancel</Button>
                        <Button variant="contained" onClick={() => setEditing(false)}>Save Changes</Button>
                      </>
                    ) : (
                      <Button variant="contained" startIcon={<Edit />} onClick={() => setEditing(true)}>Edit Profile</Button>
                    )}
                  </Box>
                </Box>
              )}

              {tab === 1 && (
                <Box>
                  <Typography variant="h6" fontWeight={600} gutterBottom>Change Password</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Update your password to keep your account secure</Typography>
                  <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, maxWidth: 400 }}>
                    <TextField label="Current Password" type="password" fullWidth />
                    <TextField label="New Password" type="password" fullWidth />
                    <TextField label="Confirm New Password" type="password" fullWidth />
                    <Button variant="contained" sx={{ alignSelf: 'flex-start' }}>Update Password</Button>
                  </Box>

                  <Divider sx={{ my: 4 }} />

                  <Typography variant="h6" fontWeight={600} gutterBottom>Two-Factor Authentication</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Add an extra layer of security to your account</Typography>
                  <Button variant="outlined" startIcon={<Lock />}>Enable 2FA</Button>
                </Box>
              )}

              {tab === 2 && (
                <Box>
                  <Typography variant="h6" fontWeight={600} gutterBottom>Connected Accounts</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Link your social accounts for easier login</Typography>
                  {connectedAccounts.map((account) => (
                    <Box key={account.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1, mb: 2 }}>
                      <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{account.icon}</Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" fontWeight={500}>{account.name}</Typography>
                        {account.connected && <Typography variant="body2" color="text.secondary">{account.email}</Typography>}
                      </Box>
                      {account.connected ? (
                        <Button variant="outlined" color="error" size="small">Disconnect</Button>
                      ) : (
                        <Button variant="contained" size="small">Connect</Button>
                      )}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
