import { useState } from 'react';
import {
  Box, Card, CardContent, Typography, Grid, Avatar, Button, TextField,
  Divider, Tab, Tabs, Chip, List, ListItem, ListItemText, Alert, useTheme,
} from '@mui/material';
import { Edit2, Camera, Mail, Phone, MapPin, Lock, Shield } from 'lucide-react';
import { PageHeader } from '../../components/common';

export const ProfilePage = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [tab, setTab] = useState(0);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: 'John Doe',
    email: 'admin@ecomdash.com',
    phone: '+1 (555) 123-4567',
    bio: 'E-commerce platform administrator and store curator.',
  });

  return (
    <Box>
      <PageHeader title="Profile" subtitle="Manage your personal information, credentials and security settings" />

      <Grid container spacing={{ xs: 2.5, md: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          {/* Avatar and Role */}
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, textAlign: 'center', mb: 3 }}>
            <CardContent sx={{ pt: 4, pb: 3 }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                <Avatar
                  sx={{
                    width: 110,
                    height: 110,
                    bgcolor: '#4D2A00',
                    color: '#F9E6A8',
                    fontSize: 42,
                    fontWeight: 800,
                    border: '4px solid #F2A900',
                    boxShadow: '0 8px 24px rgba(242, 169, 0, 0.25)',
                  }}
                >
                  JD
                </Avatar>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    position: 'absolute',
                    bottom: 4,
                    right: 4,
                    borderRadius: '50%',
                    minWidth: 32,
                    height: 32,
                    p: 0,
                    bgcolor: '#CC6F00',
                    '&:hover': { bgcolor: '#b86200' },
                  }}
                >
                  <Camera size={16} />
                </Button>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{form.name}</Typography>
              <Typography variant="body2" color="text.secondary">Store Administrator</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
                <Chip label="Super Admin" size="small" sx={{ bgcolor: '#F2A900', color: '#4D2A00', fontWeight: 700 }} />
                <Chip label="Verified" size="small" sx={{ bgcolor: 'rgba(22, 163, 74, 0.15)', color: 'success.main', fontWeight: 700 }} />
              </Box>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
            <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>Quick Info</Typography>
              <List disablePadding>
                <ListItem disablePadding sx={{ py: 1.2, gap: 1.5 }}>
                  <Mail size={18} color="#CC6F00" style={{ flexShrink: 0 }} />
                  <ListItemText
                    primary={<Typography variant="body2" sx={{ fontWeight: 500, wordBreak: 'break-all' }}>{form.email}</Typography>}
                  />
                </ListItem>
                <ListItem disablePadding sx={{ py: 1.2, gap: 1.5 }}>
                  <Phone size={18} color="#CC6F00" style={{ flexShrink: 0 }} />
                  <ListItemText
                    primary={<Typography variant="body2" sx={{ fontWeight: 500 }}>{form.phone}</Typography>}
                  />
                </ListItem>
                <ListItem disablePadding sx={{ py: 1.2, gap: 1.5 }}>
                  <MapPin size={18} color="#CC6F00" style={{ flexShrink: 0 }} />
                  <ListItemText
                    primary={<Typography variant="body2">San Francisco, CA</Typography>}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
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
                <Tab label="Personal Info" />
                <Tab label="Security & Passwords" />
                <Tab label="Connected Accounts" />
              </Tabs>
            </Box>

            <Box sx={{ p: { xs: 2, sm: 3 } }}>
              {tab === 0 && (
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  {!editing && (
                    <Alert severity="info" sx={{ borderRadius: 2 }}>
                      Click "Edit Profile" below to modify your profile details.
                    </Alert>
                  )}
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth disabled={!editing} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} fullWidth disabled={!editing} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} fullWidth disabled={!editing} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField label="Location" value="San Francisco, CA" fullWidth disabled={!editing} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField label="Bio" multiline rows={3} placeholder="Tell us about yourself..." value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} fullWidth disabled={!editing} />
                    </Grid>
                  </Grid>

                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 1 }}>
                    {editing ? (
                      <>
                        <Button variant="outlined" onClick={() => setEditing(false)}>Cancel</Button>
                        <Button variant="contained" onClick={() => setEditing(false)}>Save Changes</Button>
                      </>
                    ) : (
                      <Button variant="contained" startIcon={<Edit2 size={16} />} onClick={() => setEditing(true)}>
                        Edit Profile
                      </Button>
                    )}
                  </Box>
                </Box>
              )}

              {tab === 1 && (
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Change Password</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Update your account password to maintain maximum store protection
                  </Typography>
                  <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 440 }}>
                    <TextField label="Current Password" type="password" fullWidth size="small" />
                    <TextField label="New Password" type="password" fullWidth size="small" />
                    <TextField label="Confirm New Password" type="password" fullWidth size="small" />
                    <Button variant="contained" sx={{ alignSelf: { xs: 'stretch', sm: 'flex-start' }, mt: 1 }}>
                      Update Password
                    </Button>
                  </Box>

                  <Divider sx={{ my: 4 }} />

                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Two-Factor Authentication</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Add an extra hardware or authenticator layer of security to your account.
                  </Typography>
                  <Button variant="outlined" startIcon={<Lock size={16} />} sx={{ borderColor: 'primary.main', color: 'primary.main' }}>
                    Enable 2FA Authentication
                  </Button>
                </Box>
              )}

              {tab === 2 && (
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Connected Accounts</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Link external OAuth services for frictionless single sign-on access
                  </Typography>
                  {[
                    { id: 'google', name: 'Google Cloud Identity', connected: true, email: 'john.doe@gmail.com' },
                    { id: 'microsoft', name: 'Microsoft 365 Enterprise', connected: false, email: '' },
                  ].map((account) => (
                    <Box
                      key={account.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2,
                        p: 2,
                        bgcolor: isDark ? 'rgba(77, 42, 0, 0.3)' : '#FAF7F0',
                        borderRadius: 2.5,
                        mb: 2,
                        flexWrap: { xs: 'wrap', sm: 'nowrap' },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Shield size={22} color="#CC6F00" />
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>{account.name}</Typography>
                          {account.connected && <Typography variant="caption" color="text.secondary">{account.email}</Typography>}
                        </Box>
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
