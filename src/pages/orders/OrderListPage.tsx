import { useState, useMemo } from 'react';
import {
  Box, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, Chip, TablePagination, TextField, InputAdornment, FormControl,
  InputLabel, Select, MenuItem, Button, Avatar, IconButton, Menu,
} from '@mui/material';
import { Search, Visibility, LocalShipping, MoreVert } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { PageHeader, StatusChip } from '../../components/common';
import { orders as allOrders } from '../../data';
import type { Order, OrderStatus } from '../../data';
import { format } from 'date-fns';

const statusColors: Record<OrderStatus, 'success' | 'warning' | 'error' | 'info' | 'primary' | 'default'> = {
  pending: 'warning', processing: 'info', shipped: 'primary', delivered: 'success', cancelled: 'error', refunded: 'default',
};

export const OrderListPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  const filtered = useMemo(() => {
    return allOrders.filter((order) => {
      const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase()) || order.customerName.toLowerCase().includes(search.toLowerCase()) || order.customerEmail.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <PageHeader title="Orders" subtitle="Manage and track customer orders" />

      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField size="small" placeholder="Search orders..." value={search} onChange={(e) => setSearch(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: 'text.disabled' }} /></InputAdornment> }} sx={{ minWidth: 250 }} />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body2" color="text.secondary">{filtered.length} orders</Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Items</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Payment</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map((order) => (
                <TableRow key={order.id} hover onClick={() => navigate(`/orders/${order.id}`)} sx={{ cursor: 'pointer' }}>
                  <TableCell><Typography variant="body2" fontWeight={600} sx={{ fontFamily: 'monospace' }}>{order.id}</Typography></TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light' }}>{order.customerName.charAt(0)}</Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>{order.customerName}</Typography>
                        <Typography variant="caption" color="text.secondary">{order.customerEmail}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell><Typography variant="body2">{order.items.length} items</Typography></TableCell>
                  <TableCell align="right"><Typography variant="body2" fontWeight={600}>${order.total.toFixed(2)}</Typography></TableCell>
                  <TableCell align="center"><StatusChip status={order.status} /></TableCell>
                  <TableCell align="center"><Chip label={order.paymentStatus} size="small" color={order.paymentStatus === 'paid' ? 'success' : order.paymentStatus === 'pending' ? 'warning' : 'error'} /></TableCell>
                  <TableCell><Typography variant="body2" color="text.secondary">{format(new Date(order.createdAt), 'MMM dd, yyyy')}</Typography></TableCell>
                  <TableCell align="right">
                    <IconButton onClick={(e) => { e.stopPropagation(); navigate(`/orders/${order.id}`); }}><Visibility fontSize="small" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination component="div" count={filtered.length} page={page} onPageChange={(_, p) => setPage(p)} rowsPerPage={rowsPerPage} onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value)); setPage(0); }} />
      </Card>
    </Box>
  );
};
