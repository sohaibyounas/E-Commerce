import { useState, useMemo } from 'react';
import {
  Box, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, Chip, Avatar, TablePagination, TextField, InputAdornment, FormControl,
  InputLabel, Select, MenuItem, IconButton, Tooltip,
} from '@mui/material';
import { Search, Eye, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageHeader, StatusChip } from '../../components/common';
import { customers as allCustomers } from '../../data';
import { format } from 'date-fns';

export const CustomerListPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filtered = useMemo(() => {
    return allCustomers.filter((customer) => {
      const matchesSearch = customer.name.toLowerCase().includes(search.toLowerCase()) || customer.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <PageHeader title="Customers" subtitle="View and manage customer accounts" />

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
          <Box sx={{ p: { xs: 2, sm: 2.5 }, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
              size="small"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={18} color="rgba(77, 42, 0, 0.5)" />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ flex: { xs: '1 1 100%', sm: '1 1 240px' }, maxWidth: { sm: 300 } }}
            />
            <FormControl size="small" sx={{ flex: { xs: '1 1 calc(50% - 8px)', sm: '0 0 150px' } }}>
              <InputLabel>Status</InputLabel>
              <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="suspended">Suspended</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="body2" color="text.secondary" sx={{ width: { xs: '100%', sm: 'auto' }, textAlign: { xs: 'right', sm: 'inherit' } }}>
              {filtered.length} customers
            </Typography>
          </Box>

          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Customer</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell align="center">Orders</TableCell>
                  <TableCell align="right">Total Spent</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell>Last Order</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginated.map((customer) => (
                  <TableRow key={customer.id} hover onClick={() => navigate(`/customers/${customer.id}`)} sx={{ cursor: 'pointer' }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar src={customer.avatar} sx={{ width: 40, height: 40 }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{customer.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell><Typography variant="body2">{customer.email}</Typography></TableCell>
                    <TableCell><Typography variant="body2" color="text.secondary">{customer.phone}</Typography></TableCell>
                    <TableCell align="center"><Chip label={customer.totalOrders} size="small" variant="outlined" /></TableCell>
                    <TableCell align="right"><Typography variant="body2" sx={{ fontWeight: 600 }}>${customer.totalSpent.toLocaleString()}</Typography></TableCell>
                    <TableCell align="center"><StatusChip status={customer.status} /></TableCell>
                    <TableCell><Typography variant="body2" color="text.secondary">{format(new Date(customer.lastOrderDate), 'MMM dd, yyyy')}</Typography></TableCell>
                    <TableCell align="right">
                      <Tooltip title="View details">
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); navigate(`/customers/${customer.id}`); }}>
                          <Eye size={18} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Send email">
                        <IconButton size="small" onClick={(e) => e.stopPropagation()}>
                          <Mail size={18} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            onPageChange={(_, p) => setPage(p)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value)); setPage(0); }}
          />
        </Card>
      </motion.div>
    </Box>
  );
};

