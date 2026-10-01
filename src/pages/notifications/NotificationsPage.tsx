import { useState, useMemo } from 'react';
import {
  Box, Card, Typography, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Button, Tab, Tabs, Badge, IconButton, Checkbox,
} from '@mui/material';
import { Bell, Receipt, Boxes, User, Info, AlertCircle, MoreVertical, Circle } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader } from '../../components/common';
import { notifications as allNotifications } from '../../data';
import { formatDistanceToNow } from 'date-fns';

const iconMap: Record<string, React.ReactNode> = {
  order: <Receipt size={20} color="#F2A900" />,
  product: <Boxes size={20} color="#CC6F00" />,
  customer: <User size={20} color="#2e7d32" />,
  system: <Info size={20} color="#0288d1" />,
  alert: <AlertCircle size={20} color="#d32f2f" />,
};

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(allNotifications);
  const [tab, setTab] = useState('all');
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(() => {
    if (tab === 'all') return notifications;
    if (tab === 'unread') return notifications.filter((n) => !n.read);
    return notifications.filter((n) => n.type === tab);
  }, [notifications, tab]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSelect = (id: string) => setSelected(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);
  const handleSelectAll = () => setSelected(selected.length === filtered.length ? [] : filtered.map((n) => n.id));
  const handleMarkRead = (id: string) => setNotifications(notifications.map((n) => n.id === id ? { ...n, read: true } : n));
  const handleDelete = (id: string) => setNotifications(notifications.filter((n) => n.id !== id));
  const handleMarkAllRead = () => setNotifications(notifications.map((n) => ({ ...n, read: true })));

  return (
    <Box>
      <PageHeader title="Notifications" subtitle={`${unreadCount} unread notifications`} />

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
          <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'action.hover' }}>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ minHeight: 48 }}
            >
              <Tab label="All" value="all" />
              <Tab label={<Badge badgeContent={unreadCount} color="error" sx={{ pr: 1 }}>Unread</Badge>} value="unread" />
              <Tab label="Orders" value="order" />
              <Tab label="Products" value="product" />
              <Tab label="Alerts" value="alert" />
            </Tabs>
          </Box>

          {selected.length > 0 && (
            <Box sx={{ px: 2, py: 1, bgcolor: 'primary.lighter', display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid', borderColor: 'divider', flexWrap: 'wrap' }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{selected.length} selected</Typography>
              <Button size="small" onClick={() => { selected.forEach(handleMarkRead); setSelected([]); }}>Mark as read</Button>
              <Button size="small" color="error" onClick={() => { selected.forEach(handleDelete); setSelected([]); }}>Delete</Button>
              <Button size="small" onClick={() => setSelected([])}>Clear</Button>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: { xs: 1.5, sm: 2 }, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Checkbox
                indeterminate={selected.length > 0 && selected.length < filtered.length}
                checked={filtered.length > 0 && selected.length === filtered.length}
                onChange={handleSelectAll}
              />
              <Typography variant="body2" color="text.secondary">{filtered.length} notifications</Typography>
            </Box>
            <Button size="small" onClick={handleMarkAllRead} disabled={unreadCount === 0}>
              Mark all as read
            </Button>
          </Box>

          <List disablePadding>
            {filtered.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Bell size={44} color="rgba(77, 42, 0, 0.25)" style={{ marginBottom: 12 }} />
                <Typography color="text.secondary">No notifications found</Typography>
              </Box>
            ) : (
              filtered.map((notif) => (
                <ListItem
                  key={notif.id}
                  disablePadding
                  secondaryAction={
                    <IconButton size="small" onClick={() => handleDelete(notif.id)}>
                      <MoreVertical size={16} />
                    </IconButton>
                  }
                  sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                >
                  <ListItemButton
                    onClick={() => handleMarkRead(notif.id)}
                    selected={!notif.read}
                    sx={{
                      py: 1.5,
                      px: { xs: 1.5, sm: 2 },
                      borderLeft: notif.priority === 'high' && !notif.read ? '3px solid #CC6F00' : 'none',
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Checkbox
                        checked={selected.includes(notif.id)}
                        onClick={(e) => { e.stopPropagation(); handleSelect(notif.id); }}
                      />
                    </ListItemIcon>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {iconMap[notif.type] || <Bell size={18} />}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: notif.read ? 400 : 700 }}>
                            {notif.title}
                          </Typography>
                          {!notif.read && <Circle size={8} fill="#F2A900" color="#F2A900" />}
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 0.5 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.82rem' }}>
                            {notif.message}
                          </Typography>
                          <Typography variant="caption" color="text.disabled">
                            {formatDistanceToNow(new Date(notif.createdAt))} ago
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))
            )}
          </List>
        </Card>
      </motion.div>
    </Box>
  );
};

