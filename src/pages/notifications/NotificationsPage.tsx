import { useState, useMemo } from 'react';
import {
  Box, Card, CardContent, Typography, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Chip, Button, Tab, Tabs, Badge, IconButton, Checkbox, Menu, MenuItem,
} from '@mui/material';
import { Notifications, Check, Delete, MoreVert, FiberManualRecord, Receipt, Inventory, Person, Info } from '@mui/icons-material';
import { PageHeader } from '../../components/common';
import { notifications as allNotifications } from '../../data';
import { format, formatDistanceToNow } from 'date-fns';
import type { Notification } from '../../data';

const iconMap: Record<string, React.ReactNode> = { order: <Receipt color="primary" />, product: <Inventory color="warning" />, customer: <Person color="success" />, system: <Info color="info" />, alert: <Notifications color="error" /> };

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(allNotifications);
  const [tab, setTab] = useState('all');
  const [selected, setSelected] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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

      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)}>
            <Tab label="All" value="all" />
            <Tab label={<Badge badgeContent={unreadCount} color="error">Unread</Badge>} value="unread" />
            <Tab label="Orders" value="order" />
            <Tab label="Products" value="product" />
            <Tab label="Alerts" value="alert" />
          </Tabs>
        </Box>

        {selected.length > 0 && (
          <Box sx={{ px: 2, py: 1, bgcolor: 'primary.lighter', display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body2">{selected.length} selected</Typography>
            <Button size="small" onClick={() => { selected.forEach(handleMarkRead); setSelected([]); }}>Mark as read</Button>
            <Button size="small" color="error" onClick={() => { selected.forEach(handleDelete); setSelected([]); }}>Delete</Button>
            <Button size="small" onClick={() => setSelected([])}>Clear</Button>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Checkbox indeterminate={selected.length > 0 && selected.length < filtered.length} checked={filtered.length > 0 && selected.length === filtered.length} onChange={handleSelectAll} />
            <Typography variant="body2">{filtered.length} notifications</Typography>
          </Box>
          <Button size="small" onClick={handleMarkAllRead} disabled={unreadCount === 0}>Mark all as read</Button>
        </Box>

        <List disablePadding>
          {filtered.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}><Notifications sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} /><Typography color="text.secondary">No notifications</Typography></Box>
          ) : (
            filtered.map((notif) => (
              <ListItem key={notif.id} disablePadding secondaryAction={<IconButton onClick={(e) => { setAnchorEl(e.currentTarget); }}><MoreVert /></IconButton>}>
                <ListItemButton onClick={() => handleMarkRead(notif.id)} selected={!notif.read} sx={{ borderLeft: notif.priority === 'high' && !notif.read ? '3px solid' : 'none', borderColor: 'error.main' }}>
                  <ListItemIcon><Checkbox checked={selected.includes(notif.id)} onClick={(e) => { e.stopPropagation(); handleSelect(notif.id); }} /></ListItemIcon>
                  <ListItemIcon>{iconMap[notif.type]}</ListItemIcon>
                  <ListItemText
                    primary={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Typography variant="body2" fontWeight={notif.read ? 400 : 600}>{notif.title}</Typography>{!notif.read && <FiberManualRecord color="primary" sx={{ fontSize: 8 }} />}</Box>}
                    secondary={<Box><Typography variant="body2" color="text.secondary">{notif.message}</Typography><Typography variant="caption" color="text.disabled">{formatDistanceToNow(new Date(notif.createdAt))} ago</Typography></Box>}
                  />
                </ListItemButton>
              </ListItem>
            ))
          )}
        </List>
      </Card>
    </Box>
  );
};
